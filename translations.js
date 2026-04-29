/* Translations embarquées en JS — pas de fetch, donc fonctionne en file://
 * et en hors-ligne. Si translations-{lang}.json est servi en HTTP, lang.js le
 * superpose au runtime pour permettre la mise à jour sans rebuild. */
window.AAA_TRANSLATIONS = {
  fr: {
    "site": { "name": "Al Amine Academy" },
    "meta": {
      "lang": "fr",
      "title": "DAARA Al Amine Academy | École coranique d'excellence à Dakar",
      "description": "École coranique moderne à Dakar. Programmes Tahfiz, internat, externat et cours en ligne. Yarr ak Xam-Xam — le bon comportement avant le savoir."
    },
    "menu": {
      "home": "Accueil", "programs": "Programmes", "gallery": "Galerie",
      "about": "À propos", "contact": "Contact", "blog": "Blog",
      "testimonials": "Témoignages", "admission": "Admission",
      "conferences": "Conférences", "register": "S'inscrire"
    },
    "nav": {
      "problems": "Nos défis", "approach": "Notre approche",
      "programs": "Programmes", "testimonials": "Témoignages",
      "admission": "Admission", "contact": "Contact"
    },
    "programs": {
      "tahfiz": "Tahfiz Internat", "combined": "Tahfiz + Académique",
      "mixed": "Programme Mixte", "online": "Cours en ligne",
      "free": "Cours gratuits",
      "tahfiz_subtitle": "Coran, sport et hébergement",
      "combined_subtitle": "Coran, français et anglais",
      "mixed_subtitle": "Externat — retour à la maison chaque soir",
      "online_subtitle": "Apprendre depuis chez vous",
      "free_subtitle": "Cours en wolof, ouverts à tous"
    },
    "hero": {
      "badge": "École coranique d'excellence",
      "title": "Offrez à votre enfant une éducation coranique d'excellence",
      "title_html": "Offrez à votre enfant une <span class=\"text-secondary\">éducation coranique</span> d'excellence",
      "subtitle": "Vous cherchez un daara moderne qui allie mémorisation du Coran, discipline et épanouissement ? Al Amine Academy accompagne votre enfant vers la réussite spirituelle et académique.",
      "motto": "يار أك خام خام",
      "motto_transliteration": "Yarr ak Xam-Xam",
      "motto_translation": "Le bon comportement avant le savoir",
      "cta_primary": "Inscrire mon enfant",
      "cta_secondary": "Découvrir nos programmes",
      "stats_rating": "15 avis Google", "stats_students": "Élèves épanouis",
      "stats_programs": "Programmes adaptés", "stats_since": "Excellence depuis"
    },
    "home": {
      "problems_title": "Les défis des parents aujourd'hui",
      "problems_title_html": "Les défis des parents <span class=\"text-primary\">aujourd'hui</span>",
      "problems_subtitle": "Vous n'êtes pas seul(e). Des centaines de parents vivent les mêmes préoccupations.",
      "problem_external_title": "Le problème externe",
      "problem_external_text": "Trouver un daara fiable qui offre de vrais résultats dans la mémorisation du Coran tout en maintenant un niveau académique solide.",
      "problem_internal_title": "Le problème interne",
      "problem_internal_text": "La peur que votre enfant ne perde ses valeurs, ne prenne du retard académique, ou ne s'épanouisse pas dans un environnement contrôlé.",
      "problem_philosophical_title": "Le problème philosophique",
      "problem_philosophical_text": "Chaque enfant mérite une éducation qui nourrit l'esprit ET l'âme, qui renforce la foi sans compromettre l'avenir académique.",
      "guide_title": "Nous comprenons vos inquiétudes",
      "guide_text": "Depuis 2023, Al Amine Academy accompagne les familles du Sénégal dans cette quête délicate : offrir une éducation islamique d'excellence tout en garantissant l'épanouissement et la réussite académique de chaque enfant.",
      "plan_title": "3 étapes simples pour commencer",
      "plan_title_html": "3 étapes simples pour <span class=\"text-secondary\">commencer</span>",
      "plan_subtitle": "Un processus transparent et facile pour inscrire votre enfant.",
      "plan_step1_title": "Inscrivez votre enfant",
      "plan_step1_text": "Remplissez notre formulaire d'inscription en ligne. Ça ne prend que quelques minutes.",
      "plan_step2_title": "Il rejoint sa classe",
      "plan_step2_text": "Votre enfant est intégré dans le programme qui correspond à son âge et ses objectifs.",
      "plan_step3_title": "Il progresse chaque jour",
      "plan_step3_text": "Suivi personnalisé avec rapports réguliers. Vous voyez les progrès de votre enfant en temps réel.",
      "programs_title": "Nos trois programmes",
      "programs_title_html": "Nos trois <span class=\"text-primary\">programmes</span>",
      "programs_subtitle": "Chaque programme est conçu pour répondre aux besoins spécifiques de votre enfant.",
      "popular_badge": "Populaire", "learn_more": "En savoir plus",
      "register_now": "S'inscrire maintenant",
      "pricing_label": "À partir de",
      "pricing_per_month": " / mois — tout inclus",
      "pricing_hint": "Repas, hébergement, sport, fournitures coraniques",
      "pricing_cta": "Voir les tarifs",
      "testimonials_title": "Ce que les familles disent",
      "testimonials_title_html": "Ce que les <span class=\"text-primary\">familles disent</span>",
      "testimonials_subtitle": "Découvrez les transformations et succès de nos élèves à travers les témoignages de leurs familles.",
      "all_reviews": "Lire tous les avis Google", "more_testimonials": "Plus de témoignages",
      "failure_title": "Ne laissez pas le temps passer",
      "failure_text": "Chaque année d'attente est une année où votre enfant n'accumule pas les souvenirs précieux d'une éducation islamique structurée.",
      "final_cta_title": "Rejoignez notre famille",
      "final_cta_title_html": "Rejoignez notre <span class=\"text-secondary\">famille</span>",
      "final_cta_text": "Prêt(e) à offrir à votre enfant une éducation islamique d'excellence ? Les inscriptions sont ouvertes pour tous nos programmes."
    },
    "about": {
      "hero_title": "À propos de DAARA Al Amine Academy",
      "hero_subtitle": "Votre partenaire de confiance pour l'excellence académique et spirituelle de votre enfant.",
      "mission_label": "Notre mission", "mission_title": "Éduquer avec excellence",
      "mission_text": "Offrir une éducation holistique combinant la mémorisation du Coran noble avec une formation académique solide.",
      "vision_label": "Notre vision", "vision_title": "Bâtir l'avenir ensemble",
      "vision_text": "Devenir la référence incontournable des écoles coraniques modernes en Afrique de l'Ouest.",
      "values_label": "Nos valeurs", "values_title": "Les piliers de notre excellence",
      "value_adab": "Adab & Comportement", "value_excellence": "Excellence",
      "value_modernity": "Modernité", "value_kindness": "Bienveillance",
      "team_title": "Des professionnels dévoués", "timeline_title": "Historique & jalons"
    },
    "contact": {
      "hero_title": "Contactez-nous",
      "hero_subtitle": "Une question sur nos programmes ? Besoin d'informations ? Notre équipe est à votre écoute pour vous aider.",
      "phone_label": "Téléphone", "phone_hours": "Disponible du lundi au samedi, 08h–18h",
      "email_label": "Email", "email_response": "Réponse sous 24 heures",
      "whatsapp_label": "WhatsApp", "whatsapp_hint": "Chat instantané disponible",
      "address_label": "Localisation",
      "phone1": "+221 77 774 37 00", "phone2": "+221 77 785 07 89",
      "email": "daara@alamineacademy.com",
      "address": "Cité des Magistrats, Derrière Kër Yoff, Dakar"
    },
    "admission": {
      "hero_title": "Inscription & admission",
      "hero_subtitle": "Rejoignez DAARA Al Amine Academy en suivant nos étapes d'inscription simples et transparentes.",
      "open_badge": "Inscriptions 2026 ouvertes", "steps_title": "Étapes d'inscription",
      "step1": "Remplir le formulaire", "step2": "Entretien",
      "step3": "Inscription", "step4": "Rentrée",
      "fees_title": "Frais de scolarité", "fees_subtitle": "Transparent et compétitif",
      "cta_title": "Prêt à commencer ?",
      "cta_subtitle": "Remplissez ces 4 champs et envoyez votre demande directement par WhatsApp. Notre équipe vous répond dans la journée.",
      "form_parent_name": "Votre nom (parent / tuteur)",
      "form_phone": "Téléphone WhatsApp",
      "form_program": "Programme souhaité",
      "form_program_choose": "— Choisir un programme —",
      "form_age": "Âge de l'enfant",
      "form_submit": "Envoyer ma demande",
      "form_full": "Formulaire complet",
      "form_privacy": "Vos informations restent confidentielles. Nous les utilisons uniquement pour vous recontacter au sujet de l'inscription."
    },
    "testimonials_page": {
      "hero_title": "Témoignages",
      "hero_subtitle": "Découvrez pourquoi plus de 150 familles font confiance à DAARA Al Amine Academy.",
      "stat_families": "Familles satisfaites", "stat_rating": "Note moyenne",
      "stat_recommend": "Recommandent l'école"
    },
    "gallery": {
      "hero_title": "Galerie",
      "hero_subtitle": "Plongez dans le quotidien de nos élèves à travers nos photos et vidéos.",
      "categories_title": "Catégories",
      "cat_classes": "Salles de classe", "cat_sport": "Sport",
      "cat_events": "Événements", "cat_building": "Bâtiment", "cat_canteen": "Cantine"
    },
    "blog": {
      "hero_title": "Notre blog éducatif",
      "hero_subtitle": "Découvrez nos guides complets, articles comparatifs et témoignages sur l'éducation coranique moderne.",
      "filter_all": "Tous", "filter_guides": "Guides",
      "filter_comparatifs": "Comparatifs", "filter_methodes": "Méthodes",
      "filter_testimonials": "Témoignages"
    },
    "footer": {
      "description": "École coranique moderne dédiée à la mémorisation du Noble Coran et à l'éducation académique d'excellence.",
      "navigation": "Navigation", "programs": "Programmes", "contact": "Contact",
      "follow": "Nous suivre", "legal": "Mentions légales",
      "privacy": "Politique de confidentialité", "terms": "Conditions d'utilisation",
      "copyright": "© 2026 DAARA Al Amine Academy. Tous droits réservés."
    },
    "cta": {
      "register": "Remplir le formulaire d'inscription", "contact": "Nous contacter",
      "whatsapp": "Contacter sur WhatsApp", "learn_more": "En savoir plus",
      "back_home": "Retour à l'accueil"
    },
    "programme_internat": {
      "hero_title": "Programme Tahfiz Complet",
      "hero_subtitle": "Mémorisation intégrale du Coran en internat avec un encadrement d'excellence."
    },
    "programme_combined": {
      "hero_title_html": "Programme Mixte<br/><span class=\"text-secondary\">Tahfiz + Académique</span>",
      "hero_subtitle_html": "Le meilleur des deux mondes : votre enfant mémorise le Coran <strong>ET</strong> suit le cursus scolaire français officiel."
    },
    "programme_mixed": {
      "hero_title": "Programme Mixte en Externat",
      "hero_subtitle": "Coran le matin, cursus académique l'après-midi. Votre enfant rentre à la maison chaque soir."
    },
    "programme_online": { "hero_title": "Apprenez le Coran depuis chez vous" },
    "programme_free": { "hero_title": "Cours Gratuits pour Tous" },
    "lang_label": "Langue",
    "page_404": {
      "code": "404", "title": "Page introuvable",
      "subtitle": "La page que vous cherchez n'existe pas ou a été déplacée.",
      "description": "Retournez à l'accueil pour explorer notre école coranique et nos programmes de mémorisation du Coran.",
      "back_home": "Retour à l'accueil", "contact_us": "Nous contacter",
      "quick_nav": "Navigation rapide :"
    },
    "conferences_page": {
      "hero_badge": "Événements & Savoir",
      "hero_title_html": "Conférences <span class=\"text-secondary\">&</span> Formations",
      "hero_subtitle": "Découvrez nos conférences islamiques, formations et séminaires organisés pour le partage du savoir et le renforcement de la communauté.",
      "upcoming_label": "À venir",
      "upcoming_title": "Prochaines conférences",
      "upcoming_subtitle": "Retrouvez ici les événements à venir. Inscrivez-vous et ne manquez aucune opportunité d'apprentissage.",
      "card_status_upcoming": "À venir",
      "card_date_tbd": "Date à confirmer",
      "card_speaker_tbd": "Intervenant à confirmer",
      "card_details_soon": "Détails bientôt disponibles",
      "card1_title": "Les fondements de la foi",
      "card1_location": "Al Amine Academy, Cité des Magistrats, Dakar",
      "card1_topic": "Aqida & sciences islamiques",
      "card2_title": "L'éducation islamique moderne",
      "card2_location": "Al Amine Academy, Dakar",
      "card2_topic": "Pédagogie & éducation",
      "card_more_title": "Plus d'événements à venir",
      "card_more_subtitle": "Restez connectés pour découvrir nos prochaines conférences.",
      "formations_label": "Se former",
      "formations_title": "Nos formations"
    },
    "lang_switch_toast": "Langue changée : Français"
  },
  en: {
    "site": { "name": "Al Amine Academy" },
    "meta": {
      "lang": "en",
      "title": "DAARA Al Amine Academy | Premier Quranic School in Dakar",
      "description": "Modern Quranic school in Dakar. Tahfiz programs, boarding, day school and online courses. Yarr ak Xam-Xam — good character before knowledge."
    },
    "menu": {
      "home": "Home", "programs": "Programs", "gallery": "Gallery",
      "about": "About", "contact": "Contact", "blog": "Blog",
      "testimonials": "Testimonials", "admission": "Admission",
      "conferences": "Conferences", "register": "Register"
    },
    "nav": {
      "problems": "The challenges", "approach": "Our approach",
      "programs": "Programs", "testimonials": "Testimonials",
      "admission": "Admission", "contact": "Contact"
    },
    "programs": {
      "tahfiz": "Tahfiz Boarding", "combined": "Tahfiz + Academic",
      "mixed": "Day Program", "online": "Online Courses", "free": "Free Courses",
      "tahfiz_subtitle": "Quran, sports and accommodation",
      "combined_subtitle": "Quran, French and English",
      "mixed_subtitle": "Day school — back home every evening",
      "online_subtitle": "Learn from home",
      "free_subtitle": "Wolof courses, open to all"
    },
    "hero": {
      "badge": "Premier Quranic school",
      "title": "Give your child an outstanding Quranic education",
      "title_html": "Give your child an outstanding <span class=\"text-secondary\">Quranic education</span>",
      "subtitle": "Looking for a modern daara that combines Quran memorization, discipline and personal growth? Al Amine Academy guides your child toward both spiritual and academic success.",
      "motto": "يار أك خام خام", "motto_transliteration": "Yarr ak Xam-Xam",
      "motto_translation": "Good character before knowledge",
      "cta_primary": "Enroll my child", "cta_secondary": "Discover our programs",
      "stats_rating": "15 Google reviews", "stats_students": "Thriving students",
      "stats_programs": "Tailored programs", "stats_since": "Excellence since"
    },
    "home": {
      "problems_title": "The challenges parents face today",
      "problems_title_html": "The challenges parents <span class=\"text-primary\">face today</span>",
      "problems_subtitle": "You are not alone. Hundreds of parents share the same concerns.",
      "problem_external_title": "The external problem",
      "problem_external_text": "Finding a reliable daara that delivers real results in Quran memorization while maintaining solid academic standards.",
      "problem_internal_title": "The internal problem",
      "problem_internal_text": "The fear that your child might lose their values, fall behind academically, or fail to thrive in a controlled environment.",
      "problem_philosophical_title": "The philosophical problem",
      "problem_philosophical_text": "Every child deserves an education that nurtures both mind AND soul, that strengthens faith without compromising the academic future.",
      "guide_title": "We understand your concerns",
      "guide_text": "Since 2023, Al Amine Academy has supported families in Senegal in this delicate quest: providing an excellent Islamic education while ensuring each child's well-being and academic success.",
      "plan_title": "3 simple steps to get started",
      "plan_title_html": "3 simple steps to <span class=\"text-secondary\">get started</span>",
      "plan_subtitle": "A transparent and easy process to enroll your child.",
      "plan_step1_title": "Enroll your child",
      "plan_step1_text": "Fill out our online registration form. It only takes a few minutes.",
      "plan_step2_title": "They join their class",
      "plan_step2_text": "Your child is placed in the program that matches their age and goals.",
      "plan_step3_title": "They progress every day",
      "plan_step3_text": "Personalized follow-up with regular reports. You see your child's progress in real time.",
      "programs_title": "Our three programs",
      "programs_title_html": "Our three <span class=\"text-primary\">programs</span>",
      "programs_subtitle": "Each program is designed to meet your child's specific needs.",
      "popular_badge": "Popular", "learn_more": "Learn more", "register_now": "Register now",
      "pricing_label": "Starting from",
      "pricing_per_month": " / month — all-inclusive",
      "pricing_hint": "Meals, boarding, sports, Quranic supplies",
      "pricing_cta": "See pricing",
      "testimonials_title": "What families say",
      "testimonials_title_html": "What <span class=\"text-primary\">families say</span>",
      "testimonials_subtitle": "Discover the transformations and successes of our students through their families' testimonials.",
      "all_reviews": "Read all Google reviews", "more_testimonials": "More testimonials",
      "failure_title": "Don't let time slip away",
      "failure_text": "Every year of waiting is a year your child does not build the foundation of a structured Islamic education.",
      "final_cta_title": "Join our family",
      "final_cta_title_html": "Join our <span class=\"text-secondary\">family</span>",
      "final_cta_text": "Ready to give your child an outstanding Islamic education? Registrations are open for all our programs."
    },
    "about": {
      "hero_title": "About DAARA Al Amine Academy",
      "hero_subtitle": "Your trusted partner for your child's academic and spiritual excellence.",
      "mission_label": "Our mission", "mission_title": "Educating with excellence",
      "mission_text": "Provide a holistic education that combines memorization of the Noble Quran with solid academic training.",
      "vision_label": "Our vision", "vision_title": "Building the future together",
      "vision_text": "Become the leading reference for modern Quranic schools in West Africa.",
      "values_label": "Our values", "values_title": "The pillars of our excellence",
      "value_adab": "Adab & Behavior", "value_excellence": "Excellence",
      "value_modernity": "Modernity", "value_kindness": "Kindness",
      "team_title": "Dedicated professionals", "timeline_title": "History & milestones"
    },
    "contact": {
      "hero_title": "Contact us",
      "hero_subtitle": "A question about our programs? Need information? Our team is here to help.",
      "phone_label": "Phone", "phone_hours": "Available Monday to Saturday, 8 AM – 6 PM",
      "email_label": "Email", "email_response": "Reply within 24 hours",
      "whatsapp_label": "WhatsApp", "whatsapp_hint": "Instant chat available",
      "address_label": "Location",
      "phone1": "+221 77 774 37 00", "phone2": "+221 77 785 07 89",
      "email": "daara@alamineacademy.com",
      "address": "Cité des Magistrats, behind Kër Yoff, Dakar"
    },
    "admission": {
      "hero_title": "Registration & admission",
      "hero_subtitle": "Join DAARA Al Amine Academy by following our simple and transparent registration steps.",
      "open_badge": "2026 admissions open", "steps_title": "Registration steps",
      "step1": "Fill out the form", "step2": "Interview",
      "step3": "Registration", "step4": "First day",
      "fees_title": "Tuition fees", "fees_subtitle": "Transparent and competitive",
      "cta_title": "Ready to get started?",
      "cta_subtitle": "Fill in these 4 fields and send your request directly via WhatsApp. Our team replies within the day.",
      "form_parent_name": "Your name (parent / guardian)",
      "form_phone": "WhatsApp phone number",
      "form_program": "Preferred program",
      "form_program_choose": "— Choose a program —",
      "form_age": "Child's age",
      "form_submit": "Send my request",
      "form_full": "Full form",
      "form_privacy": "Your information stays confidential. We only use it to contact you about your registration."
    },
    "testimonials_page": {
      "hero_title": "Testimonials",
      "hero_subtitle": "Discover why more than 150 families trust DAARA Al Amine Academy.",
      "stat_families": "Satisfied families", "stat_rating": "Average rating",
      "stat_recommend": "Recommend the school"
    },
    "gallery": {
      "hero_title": "Gallery",
      "hero_subtitle": "Step into our students' daily life through our photos and videos.",
      "categories_title": "Categories",
      "cat_classes": "Classrooms", "cat_sport": "Sports",
      "cat_events": "Events", "cat_building": "Building", "cat_canteen": "Canteen"
    },
    "blog": {
      "hero_title": "Our educational blog",
      "hero_subtitle": "Discover our complete guides, comparative articles and testimonials about modern Quranic education.",
      "filter_all": "All", "filter_guides": "Guides",
      "filter_comparatifs": "Comparisons", "filter_methodes": "Methods",
      "filter_testimonials": "Testimonials"
    },
    "footer": {
      "description": "Modern Quranic school dedicated to the memorization of the Noble Quran and academic excellence.",
      "navigation": "Navigation", "programs": "Programs", "contact": "Contact",
      "follow": "Follow us", "legal": "Legal", "privacy": "Privacy policy",
      "terms": "Terms of use",
      "copyright": "© 2026 DAARA Al Amine Academy. All rights reserved."
    },
    "cta": {
      "register": "Fill out the registration form", "contact": "Contact us",
      "whatsapp": "Contact on WhatsApp", "learn_more": "Learn more",
      "back_home": "Back to home"
    },
    "programme_internat": {
      "hero_title": "Full Tahfiz Boarding Program",
      "hero_subtitle": "Complete Quran memorization in our boarding school with excellent guidance and care."
    },
    "programme_combined": {
      "hero_title_html": "Combined Program<br/><span class=\"text-secondary\">Tahfiz + Academic</span>",
      "hero_subtitle_html": "The best of both worlds: your child memorizes the Quran <strong>AND</strong> follows the official French curriculum."
    },
    "programme_mixed": {
      "hero_title": "Day Program (Externat)",
      "hero_subtitle": "Quran in the morning, academic curriculum in the afternoon. Your child comes home every evening."
    },
    "programme_online": { "hero_title": "Learn the Quran from home" },
    "programme_free": { "hero_title": "Free courses for everyone" },
    "lang_label": "Language",
    "page_404": {
      "code": "404", "title": "Page not found",
      "subtitle": "The page you're looking for doesn't exist or has been moved.",
      "description": "Head back home to explore our Quranic school and our Quran memorization programs.",
      "back_home": "Back to home", "contact_us": "Contact us",
      "quick_nav": "Quick links:"
    },
    "conferences_page": {
      "hero_badge": "Events & Knowledge",
      "hero_title_html": "Lectures <span class=\"text-secondary\">&</span> Workshops",
      "hero_subtitle": "Discover our Islamic lectures, workshops and seminars hosted to share knowledge and strengthen the community.",
      "upcoming_label": "Upcoming",
      "upcoming_title": "Upcoming lectures",
      "upcoming_subtitle": "Here you'll find what's coming up. Sign up and don't miss a learning opportunity.",
      "card_status_upcoming": "Upcoming",
      "card_date_tbd": "Date to be confirmed",
      "card_speaker_tbd": "Speaker to be confirmed",
      "card_details_soon": "Details coming soon",
      "card1_title": "The foundations of faith",
      "card1_location": "Al Amine Academy, Cité des Magistrats, Dakar",
      "card1_topic": "Aqida & Islamic sciences",
      "card2_title": "Modern Islamic education",
      "card2_location": "Al Amine Academy, Dakar",
      "card2_topic": "Pedagogy & education",
      "card_more_title": "More events coming soon",
      "card_more_subtitle": "Stay tuned for our next lectures.",
      "formations_label": "Train",
      "formations_title": "Our trainings"
    },
    "lang_switch_toast": "Language changed: English"
  },
  ar: {
    "site": { "name": "أكاديمية الأمين" },
    "meta": {
      "lang": "ar",
      "title": "دارة الأمين أكاديمي | مدرسة قرآنية متميزة في داكار",
      "description": "مدرسة قرآنية حديثة في داكار. برامج التحفيظ، الداخلية، الخارجية والدروس عبر الإنترنت. يار أك خام خام — حسن الخلق قبل العلم."
    },
    "menu": {
      "home": "الرئيسية", "programs": "البرامج", "gallery": "المعرض",
      "about": "من نحن", "contact": "اتصل بنا", "blog": "المدونة",
      "testimonials": "الشهادات", "admission": "التسجيل",
      "conferences": "المحاضرات", "register": "سجّل الآن"
    },
    "nav": {
      "problems": "تحديات الأهالي", "approach": "منهجنا",
      "programs": "البرامج", "testimonials": "الشهادات",
      "admission": "التسجيل", "contact": "اتصل بنا"
    },
    "programs": {
      "tahfiz": "تحفيظ داخلي", "combined": "تحفيظ + أكاديمي",
      "mixed": "برنامج مختلط (خارجي)", "online": "دروس عبر الإنترنت",
      "free": "دروس مجانية",
      "tahfiz_subtitle": "قرآن، رياضة وإقامة",
      "combined_subtitle": "قرآن، فرنسي وإنجليزي",
      "mixed_subtitle": "خارجي — العودة إلى المنزل كل مساء",
      "online_subtitle": "تعلّم من بيتك",
      "free_subtitle": "دروس باللغة الولوفية، مفتوحة للجميع"
    },
    "hero": {
      "badge": "مدرسة قرآنية متميزة",
      "title": "امنح طفلك تربية قرآنية متميزة",
      "title_html": "امنح طفلك <span class=\"text-secondary\">تربية قرآنية</span> متميزة",
      "subtitle": "هل تبحث عن دارة عصرية تجمع بين حفظ القرآن، الانضباط والازدهار الشخصي؟ أكاديمية الأمين ترافق طفلك نحو النجاح الروحي والأكاديمي.",
      "motto": "يار أك خام خام", "motto_transliteration": "Yarr ak Xam-Xam",
      "motto_translation": "حسن الخلق قبل العلم",
      "cta_primary": "سجّل طفلي", "cta_secondary": "اكتشف برامجنا",
      "stats_rating": "15 تقييمًا على غوغل",
      "stats_students": "طلابنا المزدهرون",
      "stats_programs": "برامج مخصصة", "stats_since": "التميز منذ"
    },
    "home": {
      "problems_title": "تحديات الأهالي اليوم",
      "problems_title_html": "تحديات الأهالي <span class=\"text-primary\">اليوم</span>",
      "problems_subtitle": "أنت لست وحدك. مئات الأهالي يعيشون نفس المخاوف.",
      "problem_external_title": "المشكلة الخارجية",
      "problem_external_text": "إيجاد دارة موثوقة تقدّم نتائج فعلية في حفظ القرآن مع الحفاظ على مستوى أكاديمي قوي.",
      "problem_internal_title": "المشكلة الداخلية",
      "problem_internal_text": "الخوف من أن يفقد طفلك قيمه، أن يتأخر دراسيًا، أو ألا يزدهر في بيئة منظمة.",
      "problem_philosophical_title": "المشكلة الفلسفية",
      "problem_philosophical_text": "كل طفل يستحق تربية تغذي العقل والروح معًا، تعزّز الإيمان دون التضحية بالمستقبل الأكاديمي.",
      "guide_title": "نحن نتفهّم مخاوفك",
      "guide_text": "منذ 2023، تواكب أكاديمية الأمين الأسر السنغالية في هذا المسعى الدقيق: تقديم تربية إسلامية متميزة مع ضمان ازدهار كل طفل ونجاحه الأكاديمي.",
      "plan_title": "ثلاث خطوات بسيطة للبدء",
      "plan_title_html": "ثلاث خطوات بسيطة <span class=\"text-secondary\">للبدء</span>",
      "plan_subtitle": "مسار شفاف وسهل لتسجيل طفلك.",
      "plan_step1_title": "سجّل طفلك",
      "plan_step1_text": "املأ نموذج التسجيل عبر الإنترنت. الأمر لا يستغرق سوى دقائق قليلة.",
      "plan_step2_title": "ينضمّ إلى صفّه",
      "plan_step2_text": "يلتحق طفلك بالبرنامج الذي يناسب عمره وأهدافه.",
      "plan_step3_title": "يتقدّم كلّ يوم",
      "plan_step3_text": "متابعة شخصية وتقارير منتظمة. تشاهد تقدّم طفلك في الوقت الفعلي.",
      "programs_title": "برامجنا الثلاثة",
      "programs_title_html": "<span class=\"text-primary\">برامجنا</span> الثلاثة",
      "programs_subtitle": "كل برنامج مصمَّم لتلبية الاحتياجات الخاصة لطفلك.",
      "popular_badge": "الأكثر طلبًا", "learn_more": "اعرف المزيد",
      "register_now": "سجّل الآن",
      "pricing_label": "ابتداءً من",
      "pricing_per_month": " / شهر — شامل كل شيء",
      "pricing_hint": "وجبات، إقامة، رياضة، لوازم قرآنية",
      "pricing_cta": "عرض الأسعار",
      "testimonials_title": "ماذا تقول الأسر",
      "testimonials_title_html": "ماذا تقول <span class=\"text-primary\">الأسر</span>",
      "testimonials_subtitle": "اكتشف تحوّلات طلابنا ونجاحاتهم من خلال شهادات أسرهم.",
      "all_reviews": "اقرأ جميع تقييمات غوغل",
      "more_testimonials": "المزيد من الشهادات",
      "failure_title": "لا تدع الوقت يمضي",
      "failure_text": "كل سنة انتظار هي سنة لا يبني فيها طفلك أساس تربية إسلامية منظمة.",
      "final_cta_title": "انضمّ إلى عائلتنا",
      "final_cta_title_html": "انضمّ إلى <span class=\"text-secondary\">عائلتنا</span>",
      "final_cta_text": "هل أنت مستعد لتقديم تربية إسلامية متميزة لطفلك؟ التسجيل مفتوح لجميع برامجنا."
    },
    "about": {
      "hero_title": "عن دارة الأمين أكاديمي",
      "hero_subtitle": "شريكك الموثوق لتميّز طفلك الأكاديمي والروحي.",
      "mission_label": "مهمتنا", "mission_title": "التربية بالتميّز",
      "mission_text": "تقديم تربية شاملة تجمع بين حفظ القرآن الكريم وتكوين أكاديمي متين.",
      "vision_label": "رؤيتنا", "vision_title": "نبني المستقبل معًا",
      "vision_text": "أن نصبح المرجع الرائد للمدارس القرآنية الحديثة في غرب إفريقيا.",
      "values_label": "قِيَمُنَا", "values_title": "أعمدة التميّز لدينا",
      "value_adab": "الأدب والسلوك", "value_excellence": "التميّز",
      "value_modernity": "الحداثة", "value_kindness": "الرحمة والرفق",
      "team_title": "مهنيون متفانون", "timeline_title": "تاريخنا ومحطاتنا"
    },
    "contact": {
      "hero_title": "اتصل بنا",
      "hero_subtitle": "لديك سؤال حول برامجنا؟ تحتاج إلى معلومات؟ فريقنا في خدمتك.",
      "phone_label": "الهاتف",
      "phone_hours": "متاح من الإثنين إلى السبت، من 8 صباحًا إلى 6 مساءً",
      "email_label": "البريد الإلكتروني", "email_response": "ردّ خلال 24 ساعة",
      "whatsapp_label": "واتساب", "whatsapp_hint": "محادثة فورية متاحة",
      "address_label": "الموقع",
      "phone1": "+221 77 774 37 00", "phone2": "+221 77 785 07 89",
      "email": "daara@alamineacademy.com",
      "address": "مدينة القضاة، خلف كير يوف، داكار"
    },
    "admission": {
      "hero_title": "التسجيل والقبول",
      "hero_subtitle": "انضمّ إلى دارة الأمين أكاديمي عبر خطوات تسجيل بسيطة وشفافة.",
      "open_badge": "التسجيل لعام 2026 مفتوح", "steps_title": "خطوات التسجيل",
      "step1": "املأ النموذج", "step2": "المقابلة",
      "step3": "التسجيل", "step4": "بدء الدراسة",
      "fees_title": "الرسوم الدراسية", "fees_subtitle": "شفافة وتنافسية",
      "cta_title": "هل أنت مستعد للبدء؟",
      "cta_subtitle": "املأ هذه الحقول الأربعة وأرسل طلبك مباشرة عبر واتساب. يردّ فريقنا في غضون اليوم.",
      "form_parent_name": "اسمك (الوالد / الوصي)",
      "form_phone": "رقم واتساب",
      "form_program": "البرنامج المطلوب",
      "form_program_choose": "— اختر برنامجًا —",
      "form_age": "عمر الطفل",
      "form_submit": "إرسال طلبي",
      "form_full": "النموذج الكامل",
      "form_privacy": "تظل معلوماتك سرية. نستخدمها فقط للتواصل معك بشأن التسجيل."
    },
    "testimonials_page": {
      "hero_title": "الشهادات",
      "hero_subtitle": "اكتشف لماذا تثق أكثر من 150 أسرة بدارة الأمين أكاديمي.",
      "stat_families": "أسر راضية", "stat_rating": "متوسط التقييم",
      "stat_recommend": "ينصحون بالمدرسة"
    },
    "gallery": {
      "hero_title": "المعرض",
      "hero_subtitle": "اطّلع على يوميات طلابنا من خلال صورنا وفيديوهاتنا.",
      "categories_title": "الفئات",
      "cat_classes": "القاعات الدراسية", "cat_sport": "الرياضة",
      "cat_events": "الفعاليات", "cat_building": "المبنى", "cat_canteen": "المطعم"
    },
    "blog": {
      "hero_title": "مدوّنتنا التربوية",
      "hero_subtitle": "اكتشف أدلتنا الشاملة، مقالاتنا المقارنة، وشهاداتنا حول التربية القرآنية الحديثة.",
      "filter_all": "الكل", "filter_guides": "الأدلة",
      "filter_comparatifs": "المقارنات", "filter_methodes": "المناهج",
      "filter_testimonials": "الشهادات"
    },
    "footer": {
      "description": "مدرسة قرآنية حديثة مكرّسة لحفظ القرآن الكريم وتحقيق التميّز الأكاديمي.",
      "navigation": "روابط", "programs": "البرامج", "contact": "اتصل بنا",
      "follow": "تابعنا", "legal": "الإشعارات القانونية",
      "privacy": "سياسة الخصوصية", "terms": "شروط الاستخدام",
      "copyright": "© 2026 دارة الأمين أكاديمي. جميع الحقوق محفوظة."
    },
    "cta": {
      "register": "املأ نموذج التسجيل", "contact": "اتصل بنا",
      "whatsapp": "تواصل عبر واتساب", "learn_more": "اعرف المزيد",
      "back_home": "العودة إلى الرئيسية"
    },
    "programme_internat": {
      "hero_title": "برنامج التحفيظ الكامل",
      "hero_subtitle": "حفظ القرآن الكريم كاملًا في الإقامة الداخلية مع إشراف متميّز ورعاية شاملة."
    },
    "programme_combined": {
      "hero_title_html": "البرنامج المختلط<br/><span class=\"text-secondary\">تحفيظ + أكاديمي</span>",
      "hero_subtitle_html": "أفضل ما في العالمين: يحفظ طفلك القرآن <strong>و</strong> يتابع المنهج الفرنسي الرسمي."
    },
    "programme_mixed": {
      "hero_title": "البرنامج المختلط — خارجي",
      "hero_subtitle": "قرآن في الصباح، منهج أكاديمي بعد الظهر. يعود طفلك إلى المنزل كل مساء."
    },
    "programme_online": { "hero_title": "تعلّم القرآن من بيتك" },
    "programme_free": { "hero_title": "دروس مجانية للجميع" },
    "lang_label": "اللغة",
    "page_404": {
      "code": "404", "title": "الصفحة غير موجودة",
      "subtitle": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
      "description": "عُد إلى الصفحة الرئيسية لاكتشاف مدرستنا القرآنية وبرامجنا لحفظ القرآن.",
      "back_home": "العودة إلى الرئيسية", "contact_us": "اتصل بنا",
      "quick_nav": "روابط سريعة:"
    },
    "conferences_page": {
      "hero_badge": "أحداث وعلم",
      "hero_title_html": "المحاضرات <span class=\"text-secondary\">و</span> التكوينات",
      "hero_subtitle": "اكتشف محاضراتنا الإسلامية، تكويناتنا وندواتنا المنظَّمة لنشر العلم وتعزيز المجتمع.",
      "upcoming_label": "قادم",
      "upcoming_title": "المحاضرات القادمة",
      "upcoming_subtitle": "تجد هنا الفعاليات القادمة. سجّل ولا تفوّت أي فرصة تعلّم.",
      "card_status_upcoming": "قادم",
      "card_date_tbd": "التاريخ سيُحدَّد لاحقًا",
      "card_speaker_tbd": "المتحدث سيُحدَّد لاحقًا",
      "card_details_soon": "التفاصيل قريبًا",
      "card1_title": "أسس الإيمان",
      "card1_location": "أكاديمية الأمين، مدينة القضاة، داكار",
      "card1_topic": "العقيدة والعلوم الإسلامية",
      "card2_title": "التربية الإسلامية الحديثة",
      "card2_location": "أكاديمية الأمين، داكار",
      "card2_topic": "البيداغوجيا والتربية",
      "card_more_title": "المزيد من الفعاليات قريبًا",
      "card_more_subtitle": "ابقَ على اتصال لاكتشاف محاضراتنا القادمة.",
      "formations_label": "التكوّن",
      "formations_title": "تكويناتنا"
    },
    "lang_switch_toast": "تم تغيير اللغة: العربية"
  },
  es: {
    "site": { "name": "Academia Al Amine" },
    "meta": {
      "lang": "es",
      "title": "DAARA Al Amine Academy | Escuela coránica de excelencia en Dakar",
      "description": "Escuela coránica moderna en Dakar. Programas Tahfiz, internado, externado y cursos en línea. Yarr ak Xam-Xam — buen carácter antes que conocimiento."
    },
    "menu": {
      "home": "Inicio", "programs": "Programas", "gallery": "Galería",
      "about": "Sobre nosotros", "contact": "Contacto", "blog": "Blog",
      "testimonials": "Testimonios", "admission": "Admisión",
      "conferences": "Conferencias", "register": "Inscribirse"
    },
    "nav": {
      "problems": "Los desafíos", "approach": "Nuestro enfoque",
      "programs": "Programas", "testimonials": "Testimonios",
      "admission": "Admisión", "contact": "Contacto"
    },
    "programs": {
      "tahfiz": "Tahfiz Internado", "combined": "Tahfiz + Académico",
      "mixed": "Programa Mixto", "online": "Cursos en línea", "free": "Cursos gratuitos",
      "tahfiz_subtitle": "Corán, deporte y alojamiento",
      "combined_subtitle": "Corán, francés e inglés",
      "mixed_subtitle": "Externado — vuelta a casa cada noche",
      "online_subtitle": "Aprende desde casa",
      "free_subtitle": "Cursos en wolof, abiertos a todos"
    },
    "hero": {
      "badge": "Escuela coránica de excelencia",
      "title": "Ofrezca a su hijo una educación coránica de excelencia",
      "title_html": "Ofrezca a su hijo una <span class=\"text-secondary\">educación coránica</span> de excelencia",
      "subtitle": "¿Busca una daara moderna que combine memorización del Corán, disciplina y desarrollo personal? Al Amine Academy acompaña a su hijo hacia el éxito espiritual y académico.",
      "motto": "يار أك خام خام", "motto_transliteration": "Yarr ak Xam-Xam",
      "motto_translation": "Buen carácter antes que conocimiento",
      "cta_primary": "Inscribir a mi hijo", "cta_secondary": "Descubrir nuestros programas",
      "stats_rating": "15 reseñas en Google", "stats_students": "Alumnos plenos",
      "stats_programs": "Programas adaptados", "stats_since": "Excelencia desde"
    },
    "home": {
      "problems_title": "Los desafíos de los padres hoy",
      "problems_title_html": "Los desafíos de los padres <span class=\"text-primary\">hoy</span>",
      "problems_subtitle": "No está solo(a). Cientos de padres viven las mismas preocupaciones.",
      "problem_external_title": "El problema externo",
      "problem_external_text": "Encontrar una daara fiable que ofrezca resultados reales en la memorización del Corán manteniendo un nivel académico sólido.",
      "problem_internal_title": "El problema interno",
      "problem_internal_text": "El miedo a que su hijo pierda sus valores, se atrase académicamente o no se desarrolle plenamente en un entorno controlado.",
      "problem_philosophical_title": "El problema filosófico",
      "problem_philosophical_text": "Cada niño merece una educación que nutra el espíritu Y el alma, que refuerce la fe sin comprometer el futuro académico.",
      "guide_title": "Comprendemos sus preocupaciones",
      "guide_text": "Desde 2023, Al Amine Academy acompaña a las familias de Senegal en esta búsqueda delicada: ofrecer una educación islámica de excelencia garantizando el bienestar y el éxito académico de cada niño.",
      "plan_title": "3 pasos sencillos para empezar",
      "plan_title_html": "3 pasos sencillos para <span class=\"text-secondary\">empezar</span>",
      "plan_subtitle": "Un proceso transparente y fácil para inscribir a su hijo.",
      "plan_step1_title": "Inscriba a su hijo",
      "plan_step1_text": "Complete nuestro formulario de inscripción en línea. Solo lleva unos minutos.",
      "plan_step2_title": "Se incorpora a su clase",
      "plan_step2_text": "Su hijo se integra en el programa que corresponde a su edad y objetivos.",
      "plan_step3_title": "Progresa cada día",
      "plan_step3_text": "Seguimiento personalizado con informes regulares. Usted ve los progresos de su hijo en tiempo real.",
      "programs_title": "Nuestros tres programas",
      "programs_title_html": "Nuestros tres <span class=\"text-primary\">programas</span>",
      "programs_subtitle": "Cada programa está diseñado para responder a las necesidades específicas de su hijo.",
      "popular_badge": "Popular", "learn_more": "Saber más", "register_now": "Inscribirse ahora",
      "pricing_label": "Desde",
      "pricing_per_month": " / mes — todo incluido",
      "pricing_hint": "Comidas, alojamiento, deporte, material coránico",
      "pricing_cta": "Ver tarifas",
      "testimonials_title": "Lo que dicen las familias",
      "testimonials_title_html": "Lo que dicen <span class=\"text-primary\">las familias</span>",
      "testimonials_subtitle": "Descubra las transformaciones y los éxitos de nuestros alumnos a través de los testimonios de sus familias.",
      "all_reviews": "Leer todas las reseñas de Google", "more_testimonials": "Más testimonios",
      "failure_title": "No deje pasar el tiempo",
      "failure_text": "Cada año de espera es un año en el que su hijo no construye los cimientos de una educación islámica estructurada.",
      "final_cta_title": "Únase a nuestra familia",
      "final_cta_title_html": "Únase a nuestra <span class=\"text-secondary\">familia</span>",
      "final_cta_text": "¿Listo(a) para ofrecer a su hijo una educación islámica de excelencia? Las inscripciones están abiertas para todos nuestros programas."
    },
    "about": {
      "hero_title": "Sobre DAARA Al Amine Academy",
      "hero_subtitle": "Su socio de confianza para la excelencia académica y espiritual de su hijo.",
      "mission_label": "Nuestra misión", "mission_title": "Educar con excelencia",
      "mission_text": "Ofrecer una educación holística que combine la memorización del Noble Corán con una sólida formación académica.",
      "vision_label": "Nuestra visión", "vision_title": "Construir el futuro juntos",
      "vision_text": "Convertirnos en la referencia de las escuelas coránicas modernas en África Occidental.",
      "values_label": "Nuestros valores", "values_title": "Los pilares de nuestra excelencia",
      "value_adab": "Adab y comportamiento", "value_excellence": "Excelencia",
      "value_modernity": "Modernidad", "value_kindness": "Amabilidad",
      "team_title": "Profesionales dedicados", "timeline_title": "Historia y hitos"
    },
    "contact": {
      "hero_title": "Contáctenos",
      "hero_subtitle": "¿Una pregunta sobre nuestros programas? ¿Necesita información? Nuestro equipo está a su disposición.",
      "phone_label": "Teléfono", "phone_hours": "Disponible de lunes a sábado, 8 h – 18 h",
      "email_label": "Correo electrónico", "email_response": "Respuesta en 24 horas",
      "whatsapp_label": "WhatsApp", "whatsapp_hint": "Chat instantáneo disponible",
      "address_label": "Ubicación",
      "phone1": "+221 77 774 37 00", "phone2": "+221 77 785 07 89",
      "email": "daara@alamineacademy.com",
      "address": "Cité des Magistrats, detrás de Kër Yoff, Dakar"
    },
    "admission": {
      "hero_title": "Inscripción y admisión",
      "hero_subtitle": "Únase a DAARA Al Amine Academy siguiendo nuestros pasos de inscripción simples y transparentes.",
      "open_badge": "Inscripciones 2026 abiertas", "steps_title": "Pasos de inscripción",
      "step1": "Completar el formulario", "step2": "Entrevista",
      "step3": "Inscripción", "step4": "Inicio del curso",
      "fees_title": "Cuotas escolares", "fees_subtitle": "Transparente y competitivo",
      "cta_title": "¿Listo para empezar?",
      "cta_subtitle": "Complete estos 4 campos y envíe su solicitud directamente por WhatsApp. Nuestro equipo responde en el día.",
      "form_parent_name": "Su nombre (padre / tutor)",
      "form_phone": "Número de WhatsApp",
      "form_program": "Programa deseado",
      "form_program_choose": "— Elija un programa —",
      "form_age": "Edad del niño",
      "form_submit": "Enviar mi solicitud",
      "form_full": "Formulario completo",
      "form_privacy": "Su información permanece confidencial. Solo la usamos para contactarle sobre la inscripción."
    },
    "testimonials_page": {
      "hero_title": "Testimonios",
      "hero_subtitle": "Descubra por qué más de 150 familias confían en DAARA Al Amine Academy.",
      "stat_families": "Familias satisfechas", "stat_rating": "Nota media",
      "stat_recommend": "Recomiendan la escuela"
    },
    "gallery": {
      "hero_title": "Galería",
      "hero_subtitle": "Sumérjase en el día a día de nuestros alumnos a través de nuestras fotos y vídeos.",
      "categories_title": "Categorías",
      "cat_classes": "Aulas", "cat_sport": "Deporte",
      "cat_events": "Eventos", "cat_building": "Edificio", "cat_canteen": "Comedor"
    },
    "blog": {
      "hero_title": "Nuestro blog educativo",
      "hero_subtitle": "Descubra nuestras guías completas, artículos comparativos y testimonios sobre la educación coránica moderna.",
      "filter_all": "Todos", "filter_guides": "Guías",
      "filter_comparatifs": "Comparativas", "filter_methodes": "Métodos",
      "filter_testimonials": "Testimonios"
    },
    "footer": {
      "description": "Escuela coránica moderna dedicada a la memorización del Noble Corán y a la excelencia académica.",
      "navigation": "Navegación", "programs": "Programas", "contact": "Contacto",
      "follow": "Síganos", "legal": "Aviso legal",
      "privacy": "Política de privacidad", "terms": "Condiciones de uso",
      "copyright": "© 2026 DAARA Al Amine Academy. Todos los derechos reservados."
    },
    "cta": {
      "register": "Completar el formulario de inscripción", "contact": "Contáctenos",
      "whatsapp": "Contactar por WhatsApp", "learn_more": "Saber más",
      "back_home": "Volver al inicio"
    },
    "programme_internat": {
      "hero_title": "Programa Tahfiz completo",
      "hero_subtitle": "Memorización integral del Corán en internado con un acompañamiento de excelencia."
    },
    "programme_combined": {
      "hero_title_html": "Programa Mixto<br/><span class=\"text-secondary\">Tahfiz + Académico</span>",
      "hero_subtitle_html": "Lo mejor de los dos mundos: su hijo memoriza el Corán <strong>Y</strong> sigue el currículo francés oficial."
    },
    "programme_mixed": {
      "hero_title": "Programa Mixto en externado",
      "hero_subtitle": "Corán por la mañana, currículo académico por la tarde. Su hijo regresa a casa cada noche."
    },
    "programme_online": { "hero_title": "Aprenda el Corán desde casa" },
    "programme_free": { "hero_title": "Cursos gratuitos para todos" },
    "lang_label": "Idioma",
    "page_404": {
      "code": "404", "title": "Página no encontrada",
      "subtitle": "La página que busca no existe o ha sido movida.",
      "description": "Vuelva al inicio para descubrir nuestra escuela coránica y nuestros programas de memorización del Corán.",
      "back_home": "Volver al inicio", "contact_us": "Contáctenos",
      "quick_nav": "Navegación rápida:"
    },
    "conferences_page": {
      "hero_badge": "Eventos y saber",
      "hero_title_html": "Conferencias <span class=\"text-secondary\">y</span> formaciones",
      "hero_subtitle": "Descubra nuestras conferencias islámicas, formaciones y seminarios organizados para compartir el saber y reforzar la comunidad.",
      "upcoming_label": "Próximamente",
      "upcoming_title": "Próximas conferencias",
      "upcoming_subtitle": "Aquí encontrará los próximos eventos. Inscríbase y no se pierda ninguna oportunidad de aprendizaje.",
      "card_status_upcoming": "Próximamente",
      "card_date_tbd": "Fecha por confirmar",
      "card_speaker_tbd": "Ponente por confirmar",
      "card_details_soon": "Detalles próximamente",
      "card1_title": "Los fundamentos de la fe",
      "card1_location": "Al Amine Academy, Cité des Magistrats, Dakar",
      "card1_topic": "Aqida y ciencias islámicas",
      "card2_title": "La educación islámica moderna",
      "card2_location": "Al Amine Academy, Dakar",
      "card2_topic": "Pedagogía y educación",
      "card_more_title": "Más eventos próximamente",
      "card_more_subtitle": "Manténgase conectado para descubrir nuestras próximas conferencias.",
      "formations_label": "Formarse",
      "formations_title": "Nuestras formaciones"
    },
    "lang_switch_toast": "Idioma cambiado: Español"
  }
};
