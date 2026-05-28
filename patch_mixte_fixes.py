#!/usr/bin/env python3
# patch_mixte_fixes.py — corrige age 6-12, quinzaine, titre section
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

# ── Remplacements par langue dans les JSON ───────────────────────────────────
# Structure: { fichier: { namespace: { key: new_value } } }

FIXES = {
    "translations-fr.json": {
        "programme_mixed": {
            "inclus_title":  "Options",
            "hero_subtitle": "Coran le matin, cursus académique l'après-midi. Votre enfant rentre à la maison chaque quinzaine — pour les familles qui veulent garder leur enfant proche tout en lui offrant Tahfiz + études.",
            "price_label3":  "Retour à la maison chaque quinzaine",
            "feat3_title":   "Retour chaque quinzaine",
            "feat3_desc":    "Votre enfant rentre chez vous chaque quinzaine. Idéal pour les familles qui souhaitent rester proches.",
            "adv1_desc":     "Votre enfant rentre chaque quinzaine. Il garde un lien fort avec sa famille.",
        },
        "home": {
            "mixed_subtitle": "Internat — retour à la maison chaque quinzaine",
            "card3_subtitle": "Internat : Coran le matin, académique l'après-midi, retour à la maison chaque quinzaine",
        },
    },
    "translations-en.json": {
        "programme_mixed": {
            "inclus_title":  "Options",
            "hero_subtitle": "Quran in the morning, academic curriculum in the afternoon. Your child returns home every two weeks — for families who want to keep their child close while offering Tahfiz + studies.",
            "price_label3":  "Return home every two weeks",
            "feat3_title":   "Return every two weeks",
            "feat3_desc":    "Your child returns home every two weeks. Ideal for families who wish to stay close.",
            "adv1_desc":     "Your child returns every two weeks, maintaining a strong bond with the family.",
        },
        "home": {
            "mixed_subtitle": "Boarding — return home every two weeks",
            "card3_subtitle": "Boarding: Quran in the morning, academics in the afternoon, return home every two weeks",
        },
    },
    "translations-ar.json": {
        "programme_mixed": {
            "inclus_title":  "الخيارات",
            "hero_subtitle": "القرآن صباحاً، المنهج الأكاديمي بعد الظهر. يعود طفلك إلى المنزل كل أسبوعين — للعائلات التي ترغب في إبقاء طفلها قريباً مع تقديم الحفظ والدراسة.",
            "price_label3":  "العودة إلى المنزل كل أسبوعين",
            "feat3_title":   "العودة كل أسبوعين",
            "feat3_desc":    "يعود طفلك إلى المنزل كل أسبوعين. مثالي للعائلات التي ترغب في البقاء قريبة.",
            "adv1_desc":     "يعود طفلك كل أسبوعين، مما يحافظ على رابط قوي مع الأسرة.",
        },
        "home": {
            "mixed_subtitle": "داخلي — العودة إلى المنزل كل أسبوعين",
            "card3_subtitle": "داخلي: القرآن صباحاً، الأكاديمي بعد الظهر، العودة إلى المنزل كل أسبوعين",
        },
    },
    "translations-es.json": {
        "programme_mixed": {
            "inclus_title":  "Opciones",
            "hero_subtitle": "Corán por la mañana, plan académico por la tarde. Su hijo regresa a casa cada quincena — para familias que quieren mantener a su hijo cerca mientras le ofrecen Tahfiz + estudios.",
            "price_label3":  "Regreso a casa cada quincena",
            "feat3_title":   "Regreso cada quincena",
            "feat3_desc":    "Su hijo regresa a casa cada quincena. Ideal para familias que desean permanecer cerca.",
            "adv1_desc":     "Su hijo regresa cada quincena, manteniendo un vínculo fuerte con la familia.",
        },
        "home": {
            "mixed_subtitle": "Internado — regreso a casa cada quincena",
            "card3_subtitle": "Internado: Corán por la mañana, académico por la tarde, regreso a casa cada quincena",
        },
    },
}

for fname, namespaces in FIXES.items():
    path = os.path.join(BASE, fname)
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    changed = 0
    for ns, keys in namespaces.items():
        if ns not in data:
            data[ns] = {}
        for k, v in keys.items():
            if data[ns].get(k) != v:
                data[ns][k] = v
                changed += 1
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] {fname} — {changed} clés mises à jour")

# ── translations.js — remplacements directs ──────────────────────────────────
JS_PATH = os.path.join(BASE, "translations.js")
with open(JS_PATH, encoding="utf-8") as f:
    src = f.read()

REPLACEMENTS_JS = [
    # FR
    ('"inclus_title": "Inclus &amp; Options"',          '"inclus_title": "Options"'),
    ('"inclus_title": "Inclus & Options"',              '"inclus_title": "Options"'),
    ('"price_label3": "Retour à la maison chaque soir"','"price_label3": "Retour à la maison chaque quinzaine"'),
    ('"feat3_title": "Retour chaque soir"',             '"feat3_title": "Retour chaque quinzaine"'),
    # EN
    ('"inclus_title": "Included &amp; Options"',        '"inclus_title": "Options"'),
    ('"inclus_title": "Included & Options"',            '"inclus_title": "Options"'),
    ('"price_label3": "Return home every evening"',     '"price_label3": "Return home every two weeks"'),
    # AR
    ('"inclus_title": "\\u0627\\u0644\\u0645\\u0634\\u0645\\u0648\\u0644 \\u0648\\u0627\\u0644\\u062e\\u064a\\u0627\\u0631\\u0627\\u062a"',
     '"inclus_title": "\\u0627\\u0644\\u062e\\u064a\\u0627\\u0631\\u0627\\u062a"'),
    # ES
    ('"inclus_title": "Incluido y Opciones"',           '"inclus_title": "Opciones"'),
    ('"price_label3": "Regreso a casa cada tarde"',     '"price_label3": "Regreso a casa cada quincena"'),
]

ok = 0
for old, new in REPLACEMENTS_JS:
    if old in src:
        src = src.replace(old, new)
        ok += 1

with open(JS_PATH, "w", encoding="utf-8") as f:
    f.write(src)
print(f"[OK] translations.js — {ok}/{len(REPLACEMENTS_JS)} remplacements")
print("Done.")
