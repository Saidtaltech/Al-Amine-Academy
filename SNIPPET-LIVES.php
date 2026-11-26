/**
 * RevelaWorld — Lives (rendez-vous en direct)
 *
 * - Type de contenu « Lives » (rw_live) : date (heure de Dakar), durée, accès, lien de visio, replay.
 * - Le lien de visio n'est JAMAIS dans le HTML de la page : il est demandé en AJAX (non mis en cache)
 *   et renvoyé seulement aux membres autorisées, de 15 min avant le début à 30 min après la fin.
 * - Accès par défaut : Pionnières (plans PMS dont le nom contient « pionni » ou « premi »).
 *   Les admins / éditrices voient toujours le lien (Hawa, équipe).
 * - Replay réservé aux mêmes membres (YouTube intégré en youtube-nocookie, sinon oEmbed / lien).
 * - Fichier .ics « Ajouter à mon agenda » (pointe vers la page, pas vers la salle).
 * - E-mails automatiques : J-7 (annonce), J-1, H-1. Case « ne pas envoyer » pour les tests.
 * - Shortcodes : [rw_lives] (agenda + replays), [rw_prochain_live] (espace membre).
 */

/* ---------- Type de contenu ---------- */
add_action( 'init', function () {
	register_post_type( 'rw_live', array(
		'labels'        => array(
			'name'          => 'Lives',
			'singular_name' => 'Live',
			'add_new'       => 'Programmer un live',
			'add_new_item'  => 'Programmer un live',
			'edit_item'     => 'Modifier le live',
			'all_items'     => 'Tous les lives',
			'menu_name'     => 'Lives',
		),
		'public'        => true,
		'has_archive'   => false,
		'rewrite'       => array( 'slug' => 'live', 'with_front' => false ),
		'menu_icon'     => 'dashicons-video-alt2',
		'menu_position' => 6,
		'supports'      => array( 'title', 'editor', 'thumbnail' ),
		'show_in_rest'  => true,
	) );
	if ( get_option( 'rw_lives_rewrite_v1' ) !== '1' ) {
		flush_rewrite_rules( false );
		update_option( 'rw_lives_rewrite_v1', '1' );
	}
}, 20 );

/* ---------- Helpers ---------- */
function rw_live_times( $post_id ) {
	$start = (int) get_post_meta( $post_id, '_rw_live_start', true );
	$duree = (int) get_post_meta( $post_id, '_rw_live_duree', true );
	if ( $duree < 15 ) $duree = 60;
	return array( $start, $start + $duree * 60 );
}

function rw_live_etat( $post_id, $now = null ) {
	$now = $now ?: time();
	list( $s, $e ) = rw_live_times( $post_id );
	if ( ! $s ) return 'sans_date';
	if ( $now < $s - 15 * MINUTE_IN_SECONDS ) return 'a_venir';
	if ( $now <= $e + 30 * MINUTE_IN_SECONDS ) return 'ouvert';
	return 'termine';
}

function rw_live_date( $ts, $format, $tz ) {
	return wp_date( $format, $ts, new DateTimeZone( $tz ) );
}

function rw_live_horaire( $post_id ) {
	list( $s ) = rw_live_times( $post_id );
	if ( ! $s ) return 'Date à venir';
	$jour  = rw_live_date( $s, 'l j F Y', 'Africa/Dakar' );
	$dakar = rw_live_date( $s, 'H\hi', 'Africa/Dakar' );
	$paris = rw_live_date( $s, 'H\hi', 'Europe/Paris' );
	return ucfirst( $jour ) . ' · ' . $dakar . ' à Dakar · ' . $paris . ' à Paris';
}

function rw_live_acces_label( $post_id ) {
	return ( get_post_meta( $post_id, '_rw_live_acces', true ) === 'membres' ) ? 'Tous les membres' : 'Pionnières';
}

function rw_live_types() {
	return array(
		'auteure' => 'Rencontre avec l’auteur·rice',
		'salon'   => 'Salon des Pionnières',
		'autre'   => 'Live du Salon',
	);
}

function rw_live_type_label( $post_id ) {
	$t = rw_live_types();
	$k = get_post_meta( $post_id, '_rw_live_type', true );
	return $t[ $k ] ?? $t['auteure'];
}

function rw_live_plan_ids_pionniere() {
	static $ids = null;
	if ( null !== $ids ) return $ids;
	$ids = array();
	if ( function_exists( 'pms_get_subscription_plans' ) ) {
		foreach ( (array) pms_get_subscription_plans( false ) as $plan ) {
			$n = is_object( $plan ) ? (string) ( $plan->name ?? '' ) : '';
			if ( stripos( $n, 'pionni' ) !== false || stripos( $n, 'premi' ) !== false ) {
				$ids[] = (int) $plan->id;
			}
		}
	}
	return $ids;
}

function rw_live_user_plans( $user_id ) {
	global $wpdb;
	$t = $wpdb->prefix . 'pms_member_subscriptions';
	return array_map( 'intval', (array) $wpdb->get_col( $wpdb->prepare(
		"SELECT subscription_plan_id FROM {$t} WHERE user_id = %d AND status = %s",
		$user_id, 'active'
	) ) );
}

function rw_live_user_can_join( $post_id, $user_id = 0 ) {
	$user_id = $user_id ?: get_current_user_id();
	if ( ! $user_id ) return false;
	if ( user_can( $user_id, 'edit_others_posts' ) ) return true;
	$plans = rw_live_user_plans( $user_id );
	if ( ! $plans ) return false;
	if ( get_post_meta( $post_id, '_rw_live_acces', true ) === 'membres' ) return true;
	return (bool) array_intersect( $plans, rw_live_plan_ids_pionniere() );
}

function rw_live_replay_html( $url ) {
	if ( preg_match( '~(?:youtu\.be/|[?&]v=|/embed/|/live/|/shorts/)([A-Za-z0-9_-]{11})~', $url, $m ) ) {
		return '<div class="rw-live-replay"><iframe src="https://www.youtube-nocookie.com/embed/' . esc_attr( $m[1] ) . '?rel=0" title="Replay du live" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
	}
	$o = wp_oembed_get( $url );
	if ( $o ) return '<div class="rw-live-replay">' . $o . '</div>';
	return '<p><a class="rw-live-btn" href="' . esc_url( $url ) . '" target="_blank" rel="noopener noreferrer">Voir le replay</a></p>';
}

/* ---------- Admin : champs du live ---------- */
add_action( 'add_meta_boxes', function () {
	add_meta_box( 'rw_live_details', 'Détails du live', 'rw_live_metabox', 'rw_live', 'normal', 'high' );
} );

function rw_live_metabox( $post ) {
	wp_nonce_field( 'rw_live_save', 'rw_live_nonce' );
	$id     = $post->ID;
	$start  = (int) get_post_meta( $id, '_rw_live_start', true );
	$vstart = $start ? rw_live_date( $start, 'Y-m-d\TH:i', 'Africa/Dakar' ) : '';
	$duree  = (int) get_post_meta( $id, '_rw_live_duree', true ) ?: 60;
	$acces  = get_post_meta( $id, '_rw_live_acces', true ) ?: 'pionnieres';
	$type   = get_post_meta( $id, '_rw_live_type', true ) ?: 'auteure';
	$lien   = get_post_meta( $id, '_rw_live_lien', true );
	$replay = get_post_meta( $id, '_rw_live_replay', true );
	$oeuvre = (int) get_post_meta( $id, '_rw_live_oeuvre', true );
	$aut    = (int) get_post_meta( $id, '_rw_live_auteure', true );
	$nomail = get_post_meta( $id, '_rw_live_no_mail', true );
	$oeuvres  = get_posts( array( 'post_type' => 'oeuvre', 'posts_per_page' => 100, 'post_status' => array( 'publish', 'future', 'draft' ), 'orderby' => 'date', 'order' => 'DESC' ) );
	$auteures = get_posts( array( 'post_type' => 'auteure', 'posts_per_page' => 100, 'post_status' => 'publish', 'orderby' => 'title', 'order' => 'ASC' ) );
	?>
	<table class="form-table" role="presentation">
		<tr><th><label for="rw_live_start">Date et heure (heure de Dakar)</label></th>
			<td><input type="datetime-local" id="rw_live_start" name="rw_live_start" value="<?php echo esc_attr( $vstart ); ?>">
			<p class="description">Heure de Dakar (= GMT). Paris = +1 h en hiver, +2 h en été. Elle est affichée automatiquement.</p></td></tr>
		<tr><th><label for="rw_live_duree">Durée (minutes)</label></th>
			<td><input type="number" min="15" max="600" step="5" id="rw_live_duree" name="rw_live_duree" value="<?php echo esc_attr( $duree ); ?>"></td></tr>
		<tr><th><label for="rw_live_type">Type</label></th>
			<td><select id="rw_live_type" name="rw_live_type"><?php foreach ( rw_live_types() as $k => $l ) : ?>
				<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $type, $k ); ?>><?php echo esc_html( $l ); ?></option>
			<?php endforeach; ?></select></td></tr>
		<tr><th><label for="rw_live_acces">Accès</label></th>
			<td><select id="rw_live_acces" name="rw_live_acces">
				<option value="pionnieres" <?php selected( $acces, 'pionnieres' ); ?>>Pionnières uniquement</option>
				<option value="membres" <?php selected( $acces, 'membres' ); ?>>Tous les membres</option>
			</select></td></tr>
		<tr><th><label for="rw_live_lien">Lien de la visio</label></th>
			<td><input type="url" class="large-text" id="rw_live_lien" name="rw_live_lien" value="<?php echo esc_attr( $lien ); ?>" placeholder="https://meet.google.com/... ou https://zoom.us/j/... ou lien YouTube">
			<p class="description">Jamais affiché publiquement : montré seulement aux membres autorisées, 15 min avant le début.</p></td></tr>
		<tr><th><label for="rw_live_oeuvre">Œuvre liée</label></th>
			<td><select id="rw_live_oeuvre" name="rw_live_oeuvre"><option value="0">—</option><?php foreach ( $oeuvres as $o ) : ?>
				<option value="<?php echo (int) $o->ID; ?>" <?php selected( $oeuvre, $o->ID ); ?>><?php echo esc_html( get_the_title( $o ) ); ?></option>
			<?php endforeach; ?></select></td></tr>
		<tr><th><label for="rw_live_auteure">Intervenant·e</label></th>
			<td><select id="rw_live_auteure" name="rw_live_auteure"><option value="0">—</option><?php foreach ( $auteures as $a ) : ?>
				<option value="<?php echo (int) $a->ID; ?>" <?php selected( $aut, $a->ID ); ?>><?php echo esc_html( get_the_title( $a ) ); ?></option>
			<?php endforeach; ?></select></td></tr>
		<tr><th><label for="rw_live_replay">Lien du replay</label></th>
			<td><input type="url" class="large-text" id="rw_live_replay" name="rw_live_replay" value="<?php echo esc_attr( $replay ); ?>" placeholder="Lien YouTube (non répertorié) ou Vimeo, après le live">
			<p class="description">Visible seulement par les membres autorisées, une fois le live terminé.</p></td></tr>
		<tr><th>E-mails de rappel</th>
			<td><label><input type="checkbox" name="rw_live_no_mail" value="1" <?php checked( $nomail, '1' ); ?>> Ne pas envoyer d’e-mails pour ce live (test)</label>
			<p class="description">Sinon : annonce 7 jours avant, rappel la veille et 1 h avant, envoyés aux membres concernées.</p></td></tr>
	</table>
	<?php
}

add_action( 'save_post_rw_live', function ( $post_id ) {
	if ( ! isset( $_POST['rw_live_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['rw_live_nonce'] ) ), 'rw_live_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	$raw = sanitize_text_field( wp_unslash( $_POST['rw_live_start'] ?? '' ) );
	$old = (int) get_post_meta( $post_id, '_rw_live_start', true );
	$new = 0;
	if ( $raw ) {
		$dt = DateTime::createFromFormat( 'Y-m-d\TH:i', $raw, new DateTimeZone( 'Africa/Dakar' ) );
		if ( $dt ) $new = $dt->getTimestamp();
	}
	if ( $new ) update_post_meta( $post_id, '_rw_live_start', $new ); else delete_post_meta( $post_id, '_rw_live_start' );
	if ( $new !== $old ) { // date changée : les rappels repartent de zéro
		foreach ( array( 'j7', 'j1', 'h1' ) as $k ) delete_post_meta( $post_id, '_rw_rappel_' . $k );
	}

	$duree = min( 600, max( 15, absint( $_POST['rw_live_duree'] ?? 60 ) ) );
	update_post_meta( $post_id, '_rw_live_duree', $duree );

	$acces = sanitize_key( $_POST['rw_live_acces'] ?? 'pionnieres' );
	update_post_meta( $post_id, '_rw_live_acces', in_array( $acces, array( 'pionnieres', 'membres' ), true ) ? $acces : 'pionnieres' );

	$type = sanitize_key( $_POST['rw_live_type'] ?? 'auteure' );
	update_post_meta( $post_id, '_rw_live_type', array_key_exists( $type, rw_live_types() ) ? $type : 'auteure' );

	update_post_meta( $post_id, '_rw_live_lien', esc_url_raw( wp_unslash( $_POST['rw_live_lien'] ?? '' ) ) );
	update_post_meta( $post_id, '_rw_live_replay', esc_url_raw( wp_unslash( $_POST['rw_live_replay'] ?? '' ) ) );
	update_post_meta( $post_id, '_rw_live_oeuvre', absint( $_POST['rw_live_oeuvre'] ?? 0 ) );
	update_post_meta( $post_id, '_rw_live_auteure', absint( $_POST['rw_live_auteure'] ?? 0 ) );
	if ( ! empty( $_POST['rw_live_no_mail'] ) ) update_post_meta( $post_id, '_rw_live_no_mail', '1' ); else delete_post_meta( $post_id, '_rw_live_no_mail' );
	do_action( 'litespeed_purge_url', home_url( '/rendez-vous/' ) );
	do_action( 'litespeed_purge_url', home_url( '/espace-membre/' ) );
} );

add_filter( 'manage_rw_live_posts_columns', function ( $cols ) {
	$new = array();
	foreach ( $cols as $k => $v ) {
		$new[ $k ] = $v;
		if ( 'title' === $k ) {
			$new['rw_live_quand'] = 'Date (Dakar)';
			$new['rw_live_acces'] = 'Accès';
			$new['rw_live_lien']  = 'Lien';
		}
	}
	unset( $new['date'] );
	return $new;
} );
add_action( 'manage_rw_live_posts_custom_column', function ( $col, $id ) {
	if ( 'rw_live_quand' === $col ) {
		list( $s ) = rw_live_times( $id );
		echo $s ? esc_html( rw_live_date( $s, 'd/m/Y H\hi', 'Africa/Dakar' ) ) : '—';
	} elseif ( 'rw_live_acces' === $col ) {
		echo esc_html( rw_live_acces_label( $id ) );
	} elseif ( 'rw_live_lien' === $col ) {
		echo get_post_meta( $id, '_rw_live_lien', true ) ? '✓' : '<span style="color:#b32d2e">manquant</span>';
	}
}, 10, 2 );

/* ---------- Front : encadré sur la page du live ---------- */
function rw_live_box( $id ) {
	$oeuvre = (int) get_post_meta( $id, '_rw_live_oeuvre', true );
	$aut    = (int) get_post_meta( $id, '_rw_live_auteure', true );
	$pionn  = ( get_post_meta( $id, '_rw_live_acces', true ) !== 'membres' );
	list( $s ) = rw_live_times( $id );
	$h  = '<section class="rw-live-box" aria-label="Informations du live">';
	$h .= '<div class="rw-live-box__top"><span class="rw-live-eyebrow">' . esc_html( rw_live_type_label( $id ) ) . '</span>' . rw_live_statut_html( $id ) . '</div>';
	$h .= '<div class="rw-live-box__main">';
	if ( $s ) {
		$h .= '<div class="rw-live-date" aria-hidden="true"><span class="rw-live-date__jour">' . esc_html( rw_live_date( $s, 'j', 'Africa/Dakar' ) ) . '</span><span class="rw-live-date__mois">' . esc_html( rw_live_mois_court( $s ) ) . '</span><span class="rw-live-date__wd">' . esc_html( rw_live_date( $s, 'l', 'Africa/Dakar' ) ) . '</span></div>';
	}
	$h .= '<div class="rw-live-box__infos">';
	$h .= '<p class="rw-live-sr">' . esc_html( rw_live_horaire( $id ) ) . '</p>';
	if ( $aut ) $h .= '<p class="rw-live-box__avec">Avec <a href="' . esc_url( get_permalink( $aut ) ) . '">' . esc_html( get_the_title( $aut ) ) . '</a></p>';
	if ( $oeuvre ) $h .= '<p class="rw-live-box__oeuvre">Autour de <a href="' . esc_url( get_permalink( $oeuvre ) ) . '"><em>' . esc_html( get_the_title( $oeuvre ) ) . '</em></a></p>';
	if ( $s ) {
		$h .= '<ul class="rw-live-heures">';
		$h .= '<li>' . rw_live_icon( 'clock' ) . '<strong>' . esc_html( rw_live_date( $s, 'H\hi', 'Africa/Dakar' ) ) . '</strong> Dakar</li>';
		$h .= '<li><strong>' . esc_html( rw_live_date( $s, 'H\hi', 'Europe/Paris' ) ) . '</strong> Paris</li>';
		$h .= '<li class="rw-live-heures__local" hidden data-dakar="' . esc_attr( rw_live_date( $s, 'H:i', 'Africa/Dakar' ) ) . '" data-paris="' . esc_attr( rw_live_date( $s, 'H:i', 'Europe/Paris' ) ) . '"><strong data-rw-ts="' . (int) $s . '"></strong> chez toi</li>';
		$h .= '</ul>';
	}
	$h .= '</div></div>';
	$h .= '<p class="rw-live-badge">' . rw_live_icon( $pionn ? 'lock' : 'users' ) . esc_html( $pionn ? 'Réservé aux Pionnières' : 'Ouvert à tous les membres' ) . '</p>';
	$h .= '<div class="rw-live-acces" data-id="' . (int) $id . '" aria-live="polite"><div class="rw-live-skel" aria-hidden="true"></div><span class="rw-live-sr">Chargement de ton accès…</span></div>';
	if ( $s && rw_live_etat( $id ) !== 'termine' ) {
		$h .= '<p class="rw-live-box__outils"><a class="rw-live-ghost" href="' . esc_url( rw_live_ics_url( $id ) ) . '">' . rw_live_icon( 'calendar' ) . 'Ajouter à mon agenda</a></p>';
	}
	$h .= '</section>';
	return $h;
}

// Le gabarit maison (snippet 12) applique the_content hors de la boucle : on ne teste donc pas in_the_loop().
add_filter( 'the_content', function ( $content ) {
	if ( ! is_singular( 'rw_live' ) || doing_filter( 'get_the_excerpt' ) ) return $content;
	if ( (int) get_the_ID() !== (int) get_queried_object_id() ) return $content;
	return rw_live_box( get_queried_object_id() ) . $content . rw_live_inline_assets();
}, 20 );

/* ---------- AJAX : accès (lien / replay), jamais en cache ---------- */
add_action( 'wp_ajax_rw_live_acces', 'rw_live_ajax_acces' );
add_action( 'wp_ajax_nopriv_rw_live_acces', 'rw_live_ajax_acces' );
function rw_live_ajax_acces() {
	do_action( 'litespeed_control_set_nocache', 'rw live acces' );
	nocache_headers();
	$id   = absint( $_GET['id'] ?? 0 );
	$post = get_post( $id );
	if ( ! $post || 'rw_live' !== $post->post_type || 'publish' !== $post->post_status ) {
		wp_send_json_error( array( 'html' => '<p>Live introuvable.</p>', 'etat' => 'erreur' ) );
	}
	list( $s ) = rw_live_times( $id );
	$etat  = rw_live_etat( $id );
	$pionn = ( get_post_meta( $id, '_rw_live_acces', true ) !== 'membres' );
	$qui   = $pionn ? 'aux Pionnières' : 'aux membres';
	$html  = '';

	if ( ! is_user_logged_in() ) {
		$html = '<p>Ce live est réservé ' . $qui . ' du Salon.</p><p><a class="rw-live-btn" href="' . esc_url( wp_login_url( get_permalink( $id ) ) ) . '">Me connecter</a> <a class="rw-live-link" href="' . esc_url( home_url( '/adhesion/' ) ) . '">Devenir Pionnière</a></p>';
	} elseif ( ! rw_live_user_can_join( $id ) ) {
		$html = '<p>Ce live est réservé ' . $qui . ' du Salon.</p><p><a class="rw-live-btn" href="' . esc_url( home_url( '/adhesion/' ) ) . '">Découvrir l’adhésion Pionnière</a></p>';
	} elseif ( 'a_venir' === $etat || 'sans_date' === $etat ) {
		$html = '<p>Ta place est réservée. Le bouton pour rejoindre le live apparaîtra ici <strong>15 minutes avant le début</strong>. Tu recevras aussi un rappel par e-mail la veille et 1 h avant.</p>';
	} elseif ( 'ouvert' === $etat ) {
		$lien = get_post_meta( $id, '_rw_live_lien', true );
		$html = $lien
			? '<p><a class="rw-live-btn rw-live-btn--go" href="' . esc_url( $lien ) . '" target="_blank" rel="noopener noreferrer">Rejoindre le live</a></p><p class="rw-live-note">Ce lien est réservé au Salon : merci de ne pas le partager.</p>'
			: '<p>Le lien arrive dans un instant. Recharge la page dans une minute.</p>';
	} else {
		$replay = get_post_meta( $id, '_rw_live_replay', true );
		$html   = $replay ? '<p class="rw-live-box__type">Le replay</p>' . rw_live_replay_html( $replay ) : '<p>Ce live est terminé. Le replay sera ajouté ici dès qu’il est prêt.</p>';
	}
	wp_send_json_success( array(
		'html'       => $html,
		'etat'       => $etat,
		'ouvre_dans' => $s ? max( 0, $s - 15 * MINUTE_IN_SECONDS - time() ) : 0,
	) );
}

/* ---------- Fichier .ics ---------- */
function rw_live_ics_url( $id ) {
	return add_query_arg( array( 'action' => 'rw_live_ics', 'id' => (int) $id ), admin_url( 'admin-ajax.php' ) );
}
add_action( 'wp_ajax_rw_live_ics', 'rw_live_ics_output' );
add_action( 'wp_ajax_nopriv_rw_live_ics', 'rw_live_ics_output' );
function rw_live_ics_output() {
	$id   = absint( $_GET['id'] ?? 0 );
	$post = get_post( $id );
	if ( ! $post || 'rw_live' !== $post->post_type || 'publish' !== $post->post_status ) wp_die( 'Live introuvable.', '', array( 'response' => 404 ) );
	list( $s, $e ) = rw_live_times( $id );
	if ( ! $s ) wp_die( 'Date non définie.', '', array( 'response' => 404 ) );
	do_action( 'litespeed_control_set_nocache', 'rw live ics' );
	$esc   = function ( $t ) { return addcslashes( preg_replace( "/[\r\n]+/", ' ', $t ), ",;\\" ); };
	$titre = html_entity_decode( get_the_title( $id ), ENT_QUOTES, 'UTF-8' );
	$url   = get_permalink( $id );
	$host  = wp_parse_url( home_url(), PHP_URL_HOST );
	nocache_headers();
	header( 'Content-Type: text/calendar; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename="live-revelaworld-' . $id . '.ics"' );
	echo "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//RevelaWorld//Lives//FR\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n";
	echo "BEGIN:VEVENT\r\nUID:live-{$id}-{$s}@{$host}\r\nDTSTAMP:" . gmdate( 'Ymd\THis\Z' ) . "\r\n";
	echo 'DTSTART:' . gmdate( 'Ymd\THis\Z', $s ) . "\r\nDTEND:" . gmdate( 'Ymd\THis\Z', $e ) . "\r\n";
	echo 'SUMMARY:' . $esc( 'Live RevelaWorld — ' . $titre ) . "\r\n";
	echo 'DESCRIPTION:' . $esc( 'Le bouton pour rejoindre apparaît sur cette page 15 min avant le début : ' . $url ) . "\r\n";
	echo 'URL:' . $url . "\r\n";
	echo "BEGIN:VALARM\r\nTRIGGER:-PT30M\r\nACTION:DISPLAY\r\nDESCRIPTION:" . $esc( 'Live RevelaWorld dans 30 min' ) . "\r\nEND:VALARM\r\n";
	echo "END:VEVENT\r\nEND:VCALENDAR\r\n";
	exit;
}

/* ---------- Habillage : icônes, dates courtes, statut ---------- */
function rw_live_icon( $n ) {
	$p = array(
		'clock'    => '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
		'lock'     => '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
		'users'    => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
		'calendar' => '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4"/>',
		'play'     => '<path d="M7 4v16l13-8z"/>',
		'arrow'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
	);
	return '<svg class="rw-live-ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' . ( $p[ $n ] ?? '' ) . '</svg>';
}

function rw_live_mois_court( $ts ) {
	$m = array( 1 => 'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.' );
	return $m[ (int) rw_live_date( $ts, 'n', 'Africa/Dakar' ) ];
}

function rw_live_horaire_court( $id ) {
	list( $s ) = rw_live_times( $id );
	if ( ! $s ) return 'Date à venir';
	return ucfirst( rw_live_date( $s, 'l j F', 'Africa/Dakar' ) ) . ' · ' . rw_live_date( $s, 'H\hi', 'Africa/Dakar' ) . ' Dakar · ' . rw_live_date( $s, 'H\hi', 'Europe/Paris' ) . ' Paris';
}

function rw_live_statut_html( $id ) {
	list( $s, $e ) = rw_live_times( $id );
	if ( ! $s ) return '';
	$map = array( 'a_venir' => array( 'bientot', 'À venir' ), 'ouvert' => array( 'live', 'En direct' ), 'termine' => array( 'fini', 'Terminé' ) );
	list( $c, $t ) = $map[ rw_live_etat( $id ) ] ?? $map['a_venir'];
	return '<span class="rw-live-statut rw-live-statut--' . $c . '" data-rw-countdown="' . (int) $s . '" data-rw-end="' . (int) $e . '">' . esc_html( $t ) . '</span>';
}

/* ---------- Shortcodes ---------- */
function rw_live_card( $id, $passe = false ) {
	list( $s ) = rw_live_times( $id );
	$etat   = rw_live_etat( $id );
	$aut    = (int) get_post_meta( $id, '_rw_live_auteure', true );
	$pionn  = ( get_post_meta( $id, '_rw_live_acces', true ) !== 'membres' );
	$replay = (bool) get_post_meta( $id, '_rw_live_replay', true );
	$cls    = 'rw-live-card' . ( $passe ? ' rw-live-card--passe' : '' ) . ( 'ouvert' === $etat ? ' rw-live-card--live' : '' );
	$h  = '<article class="' . $cls . '">';
	$h .= '<div class="rw-live-card__date" aria-hidden="true"><span class="rw-live-card__jour">' . ( $s ? esc_html( rw_live_date( $s, 'j', 'Africa/Dakar' ) ) : '—' ) . '</span><span class="rw-live-card__mois">' . ( $s ? esc_html( rw_live_mois_court( $s ) ) : '' ) . '</span></div>';
	$h .= '<div class="rw-live-card__body">';
	$h .= '<p class="rw-live-card__meta"><span class="rw-live-card__type">' . esc_html( rw_live_type_label( $id ) ) . '</span>';
	$h .= '<span class="rw-live-tag">' . rw_live_icon( $pionn ? 'lock' : 'users' ) . esc_html( $pionn ? 'Pionnières' : 'Membres' ) . '</span>';
	if ( 'ouvert' === $etat ) {
		$h .= '<span class="rw-live-tag rw-live-tag--live"><span class="rw-live-dot" aria-hidden="true"></span>En direct</span>';
	} elseif ( $passe && $replay ) {
		$h .= '<span class="rw-live-tag rw-live-tag--replay">' . rw_live_icon( 'play' ) . 'Replay</span>';
	}
	$h .= '</p>';
	$h .= '<h3 class="rw-live-card__titre"><a class="rw-live-card__lien" href="' . esc_url( get_permalink( $id ) ) . '">' . esc_html( get_the_title( $id ) ) . '</a></h3>';
	if ( $aut ) $h .= '<p class="rw-live-card__avec">avec ' . esc_html( get_the_title( $aut ) ) . '</p>';
	$h .= '<p class="rw-live-card__heure">' . rw_live_icon( 'clock' ) . '<span>' . esc_html( rw_live_horaire_court( $id ) ) . '</span></p>';
	$h .= '</div>';
	$cta = $passe ? ( $replay ? 'Voir le replay' : 'Revoir la page' ) : ( 'ouvert' === $etat && rw_live_user_can_join( $id ) ? 'Rejoindre' : 'Voir le live' );
	$h .= '<span class="rw-live-card__cta" aria-hidden="true">' . esc_html( $cta ) . rw_live_icon( 'arrow' ) . '</span>';
	$h .= '</article>';
	return $h;
}

function rw_lives_query( $a_venir, $limit ) {
	$now = time();
	$ids = get_posts( array(
		'post_type'      => 'rw_live',
		'post_status'    => 'publish',
		'fields'         => 'ids',
		'posts_per_page' => $limit + 5,
		'meta_key'       => '_rw_live_start',
		'orderby'        => 'meta_value_num',
		'order'          => $a_venir ? 'ASC' : 'DESC',
		'meta_query'     => array( array(
			'key'     => '_rw_live_start',
			'value'   => $now - 12 * HOUR_IN_SECONDS,
			'compare' => $a_venir ? '>=' : '<',
			'type'    => 'NUMERIC',
		) ),
	) );
	if ( ! $a_venir ) { // + les lives terminés dans les 12 dernières heures
		$recent = get_posts( array( 'post_type' => 'rw_live', 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => 5,
			'meta_key' => '_rw_live_start', 'orderby' => 'meta_value_num', 'order' => 'DESC',
			'meta_query' => array( array( 'key' => '_rw_live_start', 'value' => $now - 12 * HOUR_IN_SECONDS, 'compare' => '>=', 'type' => 'NUMERIC' ) ) ) );
		$ids = array_merge( $recent, $ids );
	}
	$out = array();
	foreach ( $ids as $id ) {
		$fini = ( rw_live_etat( $id ) === 'termine' );
		if ( $a_venir === ! $fini ) $out[] = $id;
	}
	return array_slice( array_unique( $out ), 0, $limit );
}

add_shortcode( 'rw_lives', function ( $atts ) {
	$a = shortcode_atts( array( 'limite' => 12, 'passes' => 6 ), $atts );
	do_action( 'litespeed_control_set_ttl', 1800 );
	$avenir = rw_lives_query( true, (int) $a['limite'] );
	$passes = rw_lives_query( false, (int) $a['passes'] );
	$h  = '<div class="rw-lives">';
	$h .= '<section class="rw-lives__section"><header class="rw-lives__head"><span class="rw-live-eyebrow">À venir</span><h2 class="rw-lives__titre">Prochains lives</h2></header>';
	if ( $avenir ) {
		$h .= '<div class="rw-lives__liste">';
		foreach ( $avenir as $id ) $h .= rw_live_card( $id );
		$h .= '</div>';
	} else {
		$h .= '<div class="rw-lives__vide">' . rw_live_icon( 'calendar' ) . '<p class="rw-lives__vide-t">Le prochain live se prépare.</p><p>Il sera annoncé ici et par e-mail, 7 jours avant.</p></div>';
	}
	$h .= '</section>';
	if ( $passes ) {
		$h .= '<section class="rw-lives__section"><header class="rw-lives__head"><span class="rw-live-eyebrow">Mémoire du Salon</span><h2 class="rw-lives__titre">Lives passés et replays</h2></header><div class="rw-lives__liste">';
		foreach ( $passes as $id ) $h .= rw_live_card( $id, true );
		$h .= '</div></section>';
	}
	return $h . '</div>' . rw_live_inline_assets();
} );

add_shortcode( 'rw_prochain_live', function () {
	do_action( 'litespeed_control_set_ttl', 1800 );
	$ids = rw_lives_query( true, 1 );
	$h   = '<div class="rw-lives rw-lives--mini">';
	if ( ! $ids ) {
		$h .= '<div class="rw-lives__vide">' . rw_live_icon( 'calendar' ) . '<p class="rw-lives__vide-t">Aucun live programmé pour l’instant.</p><p>Les dates sont annoncées 7 jours avant, par e-mail et sur la page <a href="' . esc_url( home_url( '/rendez-vous/' ) ) . '">Rendez-vous</a>.</p></div>';
	} else {
		$h .= rw_live_card( $ids[0] );
		if ( is_user_logged_in() && ! rw_live_user_can_join( $ids[0] ) ) {
			$h .= '<p class="rw-live-note">' . rw_live_icon( 'lock' ) . '<span>Les lives sont réservés aux Pionnières. <a href="' . esc_url( home_url( '/adhesion/' ) ) . '">Découvrir l’adhésion Pionnière</a></span></p>';
		}
		$h .= '<p class="rw-lives__tous"><a class="rw-live-ghost" href="' . esc_url( home_url( '/rendez-vous/' ) ) . '">Tous les rendez-vous' . rw_live_icon( 'arrow' ) . '</a></p>';
	}
	return $h . '</div>' . rw_live_inline_assets();
} );

/* ---------- Styles + script ---------- */
function rw_live_assets() {
	add_action( 'wp_footer', function () {
		if ( ! empty( $GLOBALS['rw_live_assets_done'] ) ) return;
		$GLOBALS['rw_live_assets_done'] = true;
		rw_live_print_assets();
	}, 50 );
}

// Pour les gabarits sans wp_footer (ex. espace membre) : styles + script dans la sortie du shortcode.
function rw_live_inline_assets() {
	if ( ! empty( $GLOBALS['rw_live_assets_done'] ) ) return '';
	$GLOBALS['rw_live_assets_done'] = true;
	ob_start();
	rw_live_print_assets();
	return ob_get_clean();
}
add_action( 'wp', function () { if ( is_singular( 'rw_live' ) ) rw_live_assets(); } );

function rw_live_print_assets() {
	?>
	<style id="rw-lives-css">
	.rw-live-box,.rw-lives{--rw-mag:#c21e5c;--rw-mag-soft:#e35c8a;--rw-mag-deep:#8e1543;--rw-vio:#4d2d87;--rw-nuit:#0d0820;--rw-nuit-2:#1a0e30;--rw-mute:rgba(255,255,255,.66);--rw-line:rgba(255,255,255,.1);--rw-serif:'Playfair Display',Georgia,serif;--rw-display:'Bricolage Grotesque','Plus Jakarta Sans',system-ui,sans-serif;color:rgba(255,255,255,.92)}
	.rw-live-ic{width:16px;height:16px;flex:0 0 auto}
	.rw-live-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
	.rw-lives p,.rw-live-box p{border-bottom:0!important;padding-bottom:0!important}
	.rw-lives a:not(.rw-live-ghost):not(.rw-live-btn),.rw-live-box a:not(.rw-live-ghost):not(.rw-live-btn){border-bottom:0!important}
	.rw-live-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid var(--rw-line);font:500 .68rem/1.2 var(--rw-display);letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.78)}
	.rw-live-eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--rw-mag)}
	.rw-live-box{position:relative;overflow:hidden;margin:0 0 36px;padding:28px;border-radius:22px;border:1px solid rgba(227,92,138,.22);background:radial-gradient(120% 90% at 100% 0%,rgba(194,30,92,.2) 0%,transparent 55%),radial-gradient(90% 80% at 0% 100%,rgba(77,45,135,.38) 0%,transparent 60%),linear-gradient(160deg,var(--rw-nuit-2),var(--rw-nuit) 70%);box-shadow:0 30px 80px -40px rgba(194,30,92,.45)}
	.rw-live-box p{margin:0}
	.rw-live-box__top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:22px}
	.rw-live-box__main{display:flex;gap:24px;align-items:center}
	.rw-live-date{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;justify-content:center;width:104px;padding:14px 0 12px;border-radius:18px;background:rgba(5,5,5,.45);border:1px solid var(--rw-line);text-align:center}
	.rw-live-date__jour{font:italic 700 3.1rem/1 var(--rw-serif);color:#fff}
	.rw-live-date__mois{margin-top:6px;font:600 .78rem/1 var(--rw-display);letter-spacing:.2em;text-transform:uppercase;color:var(--rw-mag-soft)}
	.rw-live-date__wd{margin-top:6px;font-size:.74rem;color:var(--rw-mute);text-transform:capitalize}
	.rw-live-box__infos{min-width:0;display:grid;gap:8px}
	.rw-live-box__avec{font:italic 400 1.5rem/1.25 var(--rw-serif);color:#fff}
	.rw-live-box__avec a,.rw-live-box__oeuvre a{color:inherit;text-decoration:underline;text-decoration-color:rgba(227,92,138,.6);text-underline-offset:4px}
	.rw-live-box__oeuvre{color:var(--rw-mute);font-size:.95rem}
	.rw-live-heures{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 0!important;padding:0!important;list-style:none!important}
	.rw-live-heures li{display:inline-flex;align-items:center;gap:6px;margin:0!important;padding:7px 12px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid var(--rw-line);font-size:.86rem;color:var(--rw-mute)}
	.rw-live-heures li strong{color:#fff;font-weight:600}
	.rw-live-heures li[hidden]{display:none}
	.rw-live-badge{display:inline-flex;align-items:center;gap:8px;margin-top:22px!important;font-size:.88rem;color:var(--rw-mag-soft)}
	.rw-live-acces{margin-top:14px;padding:18px 20px;border-radius:16px;background:rgba(5,5,5,.5);border:1px solid var(--rw-line);min-height:64px}
	.rw-live-acces p{margin:0 0 10px!important;line-height:1.6}.rw-live-acces p:last-child{margin-bottom:0!important}
	.rw-live-skel{height:22px;width:60%;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.12),rgba(255,255,255,.05));background-size:200% 100%;animation:rwSkel 1.4s ease-in-out infinite}
	@keyframes rwSkel{to{background-position:-200% 0}}
	.rw-live-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 24px;margin:4px 10px 4px 0;border-radius:999px;background:var(--rw-mag);color:#fff!important;font-weight:600;font-size:.95rem;text-decoration:none!important;box-shadow:0 8px 24px -8px rgba(194,30,92,.6);transition:background-color .2s,box-shadow .2s;cursor:pointer}
	.rw-live-btn:hover{background:var(--rw-mag-deep)}
	.rw-live-btn--go{min-height:56px;padding:0 30px;font-size:1.05rem}
	.rw-live-btn--go::before{content:"";width:9px;height:9px;border-radius:50%;background:#fff;animation:rwPulse 1.8s infinite}
	@keyframes rwPulse{0%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}70%{box-shadow:0 0 0 10px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}
	.rw-live-link,.rw-live-ghost{color:var(--rw-mag-soft)!important;font-weight:600;text-decoration:none!important}
	.rw-live-ghost{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 18px;border-radius:999px;border:1px solid rgba(227,92,138,.35);transition:border-color .2s,background-color .2s;cursor:pointer}
	.rw-live-ghost:hover{border-color:var(--rw-mag-soft);background:rgba(227,92,138,.08)}
	.rw-live-btn:focus-visible,.rw-live-ghost:focus-visible,.rw-live-link:focus-visible{outline:2px solid #fff;outline-offset:3px}
	.rw-live-box__outils{margin-top:16px!important}
	.rw-live-note{display:flex;gap:8px;align-items:flex-start;font-size:.88rem;color:var(--rw-mute)}
	.rw-live-note .rw-live-ic{margin-top:3px}
	.rw-live-note a{color:var(--rw-mag-soft)}
	.rw-live-statut{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;font:600 .74rem/1.2 var(--rw-display);letter-spacing:.06em;background:rgba(255,255,255,.07);color:#fff}
	.rw-live-statut--live{background:rgba(229,72,77,.16);color:#ff8a8e}
	.rw-live-statut--live::before,.rw-live-dot{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:#ff5a5f;animation:rwBlink 1.6s infinite}
	@keyframes rwBlink{50%{opacity:.35}}
	.rw-live-statut--fini{color:var(--rw-mute)}
	.rw-live-replay{position:relative;padding-top:56.25%;border-radius:14px;overflow:hidden;border:1px solid var(--rw-line)}
	.rw-live-replay iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
	.rw-lives__section{margin:8px 0 44px}
	.rw-lives__head{display:grid;gap:12px;justify-items:start;margin-bottom:22px}
	.rw-lives__titre{margin:0!important;font:italic 700 clamp(1.7rem,4vw,2.3rem)/1.1 var(--rw-serif)!important;color:#fff!important}
	.rw-lives__liste{position:relative;display:grid;gap:14px;padding-left:24px}
	.rw-lives__liste::before{content:"";position:absolute;left:6px;top:18px;bottom:18px;width:1px;background:linear-gradient(var(--rw-mag),rgba(77,45,135,.45) 70%,transparent)}
	.rw-live-card{position:relative;display:flex;gap:18px;align-items:center;padding:18px 20px;border-radius:18px;background:linear-gradient(150deg,rgba(26,14,48,.9),rgba(13,8,32,.9));border:1px solid var(--rw-line);transition:border-color .2s,box-shadow .2s;cursor:pointer}
	.rw-lives__liste .rw-live-card::before{content:"";position:absolute;left:-23px;top:50%;width:11px;height:11px;margin-top:-6px;border-radius:50%;background:var(--rw-nuit);border:2px solid var(--rw-mag)}
	.rw-live-card:hover{border-color:rgba(227,92,138,.5);box-shadow:0 18px 50px -28px rgba(194,30,92,.75)}
	.rw-live-card:focus-within{outline:2px solid var(--rw-mag-soft);outline-offset:3px}
	.rw-live-card--live{border-color:rgba(255,90,95,.45)}
	.rw-live-card--passe{background:rgba(255,255,255,.03)}
	.rw-live-card--passe .rw-live-card__jour{color:rgba(255,255,255,.6)}
	.rw-lives__liste .rw-live-card--passe::before{border-color:rgba(255,255,255,.3)}
	.rw-live-card__date{flex:0 0 68px;display:flex;flex-direction:column;align-items:center;padding:10px 0;border-radius:14px;background:rgba(5,5,5,.45);border:1px solid var(--rw-line)}
	.rw-live-card__jour{font:italic 700 2rem/1 var(--rw-serif);color:#fff}
	.rw-live-card__mois{margin-top:5px;font:600 .66rem/1 var(--rw-display);letter-spacing:.18em;text-transform:uppercase;color:var(--rw-mag-soft)}
	.rw-live-card__body{flex:1;min-width:0;display:grid;gap:5px}
	.rw-live-card__body p{margin:0!important}
	.rw-live-card__meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
	.rw-live-card__type{font:500 .66rem/1.2 var(--rw-display);letter-spacing:.16em;text-transform:uppercase;color:var(--rw-mute)}
	.rw-live-tag{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;border-radius:999px;font-size:.72rem;font-weight:600;line-height:1.2;color:var(--rw-mag-soft);background:rgba(227,92,138,.1);border:1px solid rgba(227,92,138,.25)}
	.rw-live-tag .rw-live-ic{width:12px;height:12px}
	.rw-live-tag--live{color:#ff8a8e;background:rgba(229,72,77,.14);border-color:rgba(255,90,95,.35)}
	.rw-live-tag--replay{color:#fff;background:rgba(77,45,135,.5);border-color:rgba(180,140,255,.35)}
	.rw-live-card__titre{margin:2px 0 0!important;font:italic 700 1.3rem/1.25 var(--rw-serif)!important}
	.rw-live-card__lien{color:#fff!important;text-decoration:none!important}
	.rw-live-card__lien::after{content:"";position:absolute;inset:0;border-radius:inherit}
	.rw-live-card__lien:focus{outline:none}
	.rw-live-card__avec{font:italic 400 1rem/1.3 var(--rw-serif);color:rgba(255,255,255,.82)}
	.rw-live-card__heure{display:flex;gap:6px;align-items:flex-start;font-size:.85rem;color:var(--rw-mute)}
	.rw-live-card__heure .rw-live-ic{margin-top:2px}
	.rw-live-card__cta{flex:0 0 auto;display:inline-flex;align-items:center;gap:6px;color:var(--rw-mag-soft);font-weight:600;font-size:.9rem;white-space:nowrap}
	.rw-live-card__cta .rw-live-ic{transition:transform .2s}
	.rw-live-card:hover .rw-live-card__cta .rw-live-ic{transform:translateX(4px)}
	.rw-lives__vide{display:grid;justify-items:center;gap:6px;padding:34px 24px;text-align:center;border-radius:18px;border:1px dashed rgba(227,92,138,.3);background:rgba(13,8,32,.6);color:var(--rw-mute)}
	.rw-lives__vide .rw-live-ic{width:28px;height:28px;color:var(--rw-mag-soft);margin-bottom:6px}
	.rw-lives__vide p{margin:0!important}
	.rw-lives__vide-t{font:italic 700 1.25rem/1.3 var(--rw-serif);color:#fff}
	.rw-lives__vide a{color:var(--rw-mag-soft)}
	.rw-lives__tous{margin:14px 0 0!important}
	.rw-lives--mini .rw-live-note{margin:12px 0 0!important}
	@media (max-width:600px){
		.rw-live-box{padding:20px;border-radius:18px}
		.rw-live-box__main{gap:16px;align-items:flex-start}
		.rw-live-date{width:78px;padding:10px 0}
		.rw-live-date__jour{font-size:2.3rem}
		.rw-live-box__avec{font-size:1.2rem}
		.rw-live-btn{width:100%;margin-right:0}
		.rw-live-card{flex-wrap:wrap;align-items:flex-start;padding:16px}
		.rw-live-card__titre{font-size:1.15rem!important}
		.rw-live-card__cta{flex-basis:100%;padding-left:86px}
	}
	@media (prefers-reduced-motion:reduce){.rw-live-box *,.rw-live-box *::before,.rw-lives *,.rw-lives *::before{animation:none!important;transition:none!important}}
	</style>
	<script id="rw-lives-js">
	(function(){
		var AJAX=<?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
		document.querySelectorAll('.rw-live-heures__local').forEach(function(li){
			try{var s=li.querySelector('[data-rw-ts]');var d=new Date(parseInt(s.getAttribute('data-rw-ts'),10)*1000);
			var t=d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
			if(t!==li.getAttribute('data-dakar')&&t!==li.getAttribute('data-paris')){s.textContent=t.replace(':','h');li.hidden=false;}}catch(e){}
		});
		function statut(){
			var now=Date.now()/1000;
			document.querySelectorAll('[data-rw-countdown]').forEach(function(el){
				var s=+el.getAttribute('data-rw-countdown'),e=+el.getAttribute('data-rw-end'),t,c;
				if(now>e+1800){t='Terminé';c='fini';}
				else if(now>=s){t='En direct';c='live';}
				else if(now>=s-900){t='Portes ouvertes';c='live';}
				else{var d=s-now,j=Math.floor(d/86400),h=Math.floor(d%86400/3600),m=Math.max(1,Math.floor(d%3600/60));
					t='Dans '+(j?j+' j '+h+' h':(h?h+' h '+m+' min':m+' min'));c='bientot';}
				el.textContent=t;el.className='rw-live-statut rw-live-statut--'+c;
			});
		}
		statut();setInterval(statut,30000);
		document.querySelectorAll('.rw-live-acces').forEach(function(b){
			function load(){
				fetch(AJAX+'?action=rw_live_acces&id='+encodeURIComponent(b.getAttribute('data-id'))+'&_='+Date.now(),{credentials:'same-origin',cache:'no-store'})
				.then(function(r){return r.json();})
				.then(function(j){
					if(!j||!j.data)return;
					b.innerHTML=j.data.html;
					if(j.data.etat==='a_venir'&&j.data.ouvre_dans<86400){setTimeout(load,(j.data.ouvre_dans+5)*1000);}
				})
				.catch(function(){b.innerHTML='<p>Impossible de charger ton accès. Recharge la page.</p>';});
			}
			load();
		});
	})();
	</script>
	<?php
}

/* ---------- E-mails : J-7, J-1, H-1 ---------- */
add_action( 'init', function () {
	if ( ! wp_next_scheduled( 'rw_lives_rappels' ) ) {
		wp_schedule_event( time() + 300, 'hourly', 'rw_lives_rappels' );
	}
} );

add_action( 'rw_lives_rappels', function () {
	$now   = time();
	$lives = get_posts( array(
		'post_type'      => 'rw_live',
		'post_status'    => 'publish',
		'fields'         => 'ids',
		'posts_per_page' => 20,
		'meta_query'     => array( array(
			'key'     => '_rw_live_start',
			'value'   => array( $now, $now + 8 * DAY_IN_SECONDS ),
			'compare' => 'BETWEEN',
			'type'    => 'NUMERIC',
		) ),
	) );
	foreach ( $lives as $id ) {
		if ( get_post_meta( $id, '_rw_live_no_mail', true ) ) continue;
		list( $s ) = rw_live_times( $id );
		$reste = $s - $now;
		$etape = '';
		if ( $reste <= 7 * DAY_IN_SECONDS && $reste > 2 * DAY_IN_SECONDS && ! get_post_meta( $id, '_rw_rappel_j7', true ) ) {
			$etape = 'j7';
		} elseif ( $reste <= DAY_IN_SECONDS && $reste > 3 * HOUR_IN_SECONDS && ! get_post_meta( $id, '_rw_rappel_j1', true ) ) {
			$etape = 'j1';
		} elseif ( $reste <= 75 * MINUTE_IN_SECONDS && $reste > 0 && ! get_post_meta( $id, '_rw_rappel_h1', true ) ) {
			$etape = 'h1';
		}
		if ( ! $etape ) continue;
		update_post_meta( $id, '_rw_rappel_' . $etape, $now ); // marqué avant l'envoi : jamais deux fois
		rw_lives_envoyer( $id, $etape );
	}
} );

function rw_lives_destinataires( $id ) {
	global $wpdb;
	$t = $wpdb->prefix . 'pms_member_subscriptions';
	if ( get_post_meta( $id, '_rw_live_acces', true ) === 'membres' ) {
		$ids = $wpdb->get_col( $wpdb->prepare( "SELECT DISTINCT user_id FROM {$t} WHERE status = %s", 'active' ) );
	} else {
		$plans = rw_live_plan_ids_pionniere();
		if ( ! $plans ) return array();
		$in  = implode( ',', array_map( 'intval', $plans ) );
		$ids = $wpdb->get_col( $wpdb->prepare( "SELECT DISTINCT user_id FROM {$t} WHERE status = %s AND subscription_plan_id IN ({$in})", 'active' ) );
	}
	return array_map( 'intval', (array) $ids );
}

function rw_lives_envoyer( $id, $etape ) {
	list( $s ) = rw_live_times( $id );
	$titre = html_entity_decode( get_the_title( $id ), ENT_QUOTES, 'UTF-8' );
	$url   = get_permalink( $id );
	$ics   = rw_live_ics_url( $id );
	$quand = rw_live_horaire( $id );
	$sujets = array(
		'j7' => 'Live le ' . rw_live_date( $s, 'j F', 'Africa/Dakar' ) . ' : ' . $titre,
		'j1' => 'C’est demain : ' . $titre,
		'h1' => 'Dans 1 heure : ' . $titre,
	);
	$intros = array(
		'j7' => 'Un nouveau live privé est programmé au Salon. Ta place est réservée.',
		'j1' => 'Petit rappel : on se retrouve demain en direct.',
		'h1' => 'On commence dans une heure. Prépare ton thé, on t’attend.',
	);
	foreach ( rw_lives_destinataires( $id ) as $uid ) {
		$u = get_userdata( $uid );
		if ( ! $u || ! is_email( $u->user_email ) ) continue;
		$body = sprintf(
			"Bonjour %s,\n\n%s\n\n« %s »\n%s\n\nLe bouton pour rejoindre apparaîtra sur cette page 15 minutes avant le début :\n%s\n\n%sÀ très vite au Salon,\nL’équipe du Salon RevelaWorld",
			$u->first_name ?: $u->display_name,
			$intros[ $etape ],
			$titre,
			$quand,
			$url,
			( 'h1' !== $etape ) ? "Ajoute-le à ton agenda : " . $ics . "\n\n" : ''
		);
		wp_mail( $u->user_email, $sujets[ $etape ], $body );
	}
}
