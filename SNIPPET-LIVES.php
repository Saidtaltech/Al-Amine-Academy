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
	list( $s ) = rw_live_times( $id );
	$h  = '<div class="rw-live-box">';
	$h .= '<p class="rw-live-box__type">' . esc_html( rw_live_type_label( $id ) ) . ' · <span class="rw-live-badge">' . esc_html( rw_live_acces_label( $id ) ) . '</span></p>';
	$h .= '<p class="rw-live-box__quand">' . esc_html( rw_live_horaire( $id ) ) . '</p>';
	if ( $s ) $h .= '<p class="rw-live-box__local">Chez toi : <span data-rw-ts="' . (int) $s . '"></span></p>';
	if ( $aut ) $h .= '<p class="rw-live-box__avec">Avec <a href="' . esc_url( get_permalink( $aut ) ) . '">' . esc_html( get_the_title( $aut ) ) . '</a></p>';
	if ( $oeuvre ) $h .= '<p class="rw-live-box__oeuvre">Autour de <a href="' . esc_url( get_permalink( $oeuvre ) ) . '"><em>' . esc_html( get_the_title( $oeuvre ) ) . '</em></a></p>';
	if ( $s && rw_live_etat( $id ) !== 'termine' ) {
		$h .= '<p><a class="rw-live-link" href="' . esc_url( rw_live_ics_url( $id ) ) . '">＋ Ajouter à mon agenda</a></p>';
	}
	$h .= '<div class="rw-live-acces" data-id="' . (int) $id . '" aria-live="polite"><p>Chargement de ton accès…</p></div>';
	$h .= '</div>';
	return $h;
}

add_filter( 'the_content', function ( $content ) {
	if ( ! is_singular( 'rw_live' ) || ! in_the_loop() || ! is_main_query() ) return $content;
	return rw_live_box( get_the_ID() ) . $content;
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

/* ---------- Shortcodes ---------- */
function rw_live_card( $id, $passe = false ) {
	list( $s ) = rw_live_times( $id );
	$etat = rw_live_etat( $id );
	$aut  = (int) get_post_meta( $id, '_rw_live_auteure', true );
	$h  = '<article class="rw-live-card' . ( $passe ? ' rw-live-card--passe' : '' ) . '">';
	$h .= '<div class="rw-live-card__date"><span class="rw-live-card__jour">' . ( $s ? esc_html( rw_live_date( $s, 'j', 'Africa/Dakar' ) ) : '?' ) . '</span><span class="rw-live-card__mois">' . ( $s ? esc_html( rw_live_date( $s, 'M', 'Africa/Dakar' ) ) : '' ) . '</span></div>';
	$h .= '<div class="rw-live-card__body">';
	$h .= '<p class="rw-live-card__meta">' . esc_html( rw_live_type_label( $id ) ) . ' · <span class="rw-live-badge">' . esc_html( rw_live_acces_label( $id ) ) . '</span>' . ( 'ouvert' === $etat ? ' · <strong class="rw-live-encours">En direct</strong>' : '' ) . '</p>';
	$h .= '<h3 class="rw-live-card__titre"><a href="' . esc_url( get_permalink( $id ) ) . '">' . esc_html( get_the_title( $id ) ) . '</a></h3>';
	if ( $aut ) $h .= '<p class="rw-live-card__avec">Avec ' . esc_html( get_the_title( $aut ) ) . '</p>';
	$h .= '<p class="rw-live-card__heure">' . esc_html( rw_live_horaire( $id ) ) . '</p>';
	$h .= '</div>';
	$cta = $passe ? ( get_post_meta( $id, '_rw_live_replay', true ) ? 'Voir le replay' : 'Voir le live' ) : ( 'ouvert' === $etat && rw_live_user_can_join( $id ) ? 'Rejoindre' : 'Voir le live' );
	$h .= '<a class="rw-live-card__cta" href="' . esc_url( get_permalink( $id ) ) . '">' . esc_html( $cta ) . '</a>';
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
	$h = '<div class="rw-lives">';
	$avenir = rw_lives_query( true, (int) $a['limite'] );
	$h .= '<h2 class="rw-lives__titre">Prochains lives</h2>';
	if ( $avenir ) {
		foreach ( $avenir as $id ) $h .= rw_live_card( $id );
	} else {
		$h .= '<p class="rw-lives__vide">Le prochain live sera annoncé ici et par e-mail, 7 jours avant.</p>';
	}
	$passes = rw_lives_query( false, (int) $a['passes'] );
	if ( $passes ) {
		$h .= '<h2 class="rw-lives__titre">Lives passés et replays</h2>';
		foreach ( $passes as $id ) $h .= rw_live_card( $id, true );
	}
	return $h . '</div>' . rw_live_inline_assets();
} );

add_shortcode( 'rw_prochain_live', function () {
	do_action( 'litespeed_control_set_ttl', 1800 );
	$ids = rw_lives_query( true, 1 );
	$h   = '<div class="rw-lives rw-lives--mini">';
	if ( ! $ids ) {
		$h .= '<p>Aucun live programmé pour l’instant. Les dates sont annoncées 7 jours avant, par e-mail et sur la page <a href="' . esc_url( home_url( '/rendez-vous/' ) ) . '">Rendez-vous</a>.</p>';
	} else {
		$h .= rw_live_card( $ids[0] );
		if ( is_user_logged_in() && ! rw_live_user_can_join( $ids[0] ) ) {
			$h .= '<p class="rw-live-note">Les lives sont réservés aux Pionnières. <a href="' . esc_url( home_url( '/adhesion/' ) ) . '">Découvrir l’adhésion Pionnière</a></p>';
		}
		$h .= '<p><a class="rw-live-link" href="' . esc_url( home_url( '/rendez-vous/' ) ) . '">Tous les rendez-vous →</a></p>';
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
	.rw-live-box,.rw-live-card{--rw-a:var(--theme-palette-color-1,#b48cff);border:1px solid color-mix(in srgb,currentColor 18%,transparent);border-radius:14px}
	.rw-live-box{padding:20px 22px;margin:0 0 28px;background:color-mix(in srgb,var(--rw-a) 7%,transparent)}
	.rw-live-box p{margin:0 0 8px}.rw-live-box__type,.rw-live-card__meta{font-size:.82rem;letter-spacing:.04em;text-transform:uppercase;opacity:.8}
	.rw-live-box__quand{font-size:1.15rem;font-weight:600}.rw-live-box__local{font-size:.9rem;opacity:.75}
	.rw-live-badge{display:inline-block;padding:1px 8px;border-radius:99px;border:1px solid var(--rw-a);color:var(--rw-a);text-transform:none;letter-spacing:0}
	.rw-live-acces{margin-top:14px;padding-top:14px;border-top:1px dashed color-mix(in srgb,currentColor 20%,transparent)}
	.rw-live-btn{display:inline-block;padding:11px 20px;border-radius:99px;background:var(--rw-a);color:#fff!important;text-decoration:none!important;font-weight:600;margin:4px 8px 4px 0}
	.rw-live-btn--go{font-size:1.05rem;padding:14px 26px}
	.rw-live-link{color:var(--rw-a);font-weight:600}.rw-live-note{font-size:.88rem;opacity:.75}
	.rw-live-replay{position:relative;padding-top:56.25%;border-radius:12px;overflow:hidden}.rw-live-replay iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
	.rw-lives__titre{margin:28px 0 14px}.rw-lives__vide{opacity:.8}
	.rw-live-card{display:flex;gap:16px;align-items:center;padding:14px 16px;margin:0 0 12px}
	.rw-live-card--passe{opacity:.8}
	.rw-live-card__date{flex:0 0 58px;text-align:center;border-radius:10px;padding:8px 0;background:color-mix(in srgb,var(--rw-a) 14%,transparent)}
	.rw-live-card__jour{display:block;font-size:1.5rem;font-weight:700;line-height:1}.rw-live-card__mois{display:block;font-size:.78rem;text-transform:uppercase}
	.rw-live-card__body{flex:1;min-width:0}.rw-live-card__body p{margin:0}.rw-live-card__titre{margin:2px 0 4px;font-size:1.08rem}
	.rw-live-card__titre a{text-decoration:none}.rw-live-card__heure,.rw-live-card__avec{font-size:.9rem;opacity:.8}
	.rw-live-card__cta{flex:0 0 auto;color:var(--rw-a);font-weight:600;text-decoration:none;white-space:nowrap}
	.rw-live-encours{color:#e5484d}
	@media(max-width:600px){.rw-live-card{flex-wrap:wrap}.rw-live-card__cta{flex-basis:100%;padding-left:74px}}
	</style>
	<script id="rw-lives-js">
	(function(){
		var AJAX=<?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
		document.querySelectorAll('[data-rw-ts]').forEach(function(s){
			try{var d=new Date(parseInt(s.getAttribute('data-rw-ts'),10)*1000);
			s.textContent=d.toLocaleString('fr-FR',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'});}catch(e){s.parentNode.style.display='none';}
		});
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
