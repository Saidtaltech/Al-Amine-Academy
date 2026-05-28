#!/usr/bin/env python3
# patch_inclus_i18n.py — injecte les clés Linge/Goûter/Taekwondo dans translations.js + 4 JSON
import json, re, os

BASE = os.path.dirname(os.path.abspath(__file__))

# ── Nouvelles clés par langue ─────────────────────────────────────────────────
NEW_KEYS = {
    "fr": {
        "programme_mixed": {
            "inclus_title":       "Inclus &amp; Options",
            "inclus_subtitle":    "Ce qui est prévu dans votre programme quotidien",
            "gouter_title":       "Goûter",
            "gouter_desc":        "Collation quotidienne pour les internants.",
            "obligatoire":        "Obligatoire",
            "linge_title":        "Linge",
            "linge_desc":         "Entretien de l'uniforme scolaire.",
            "option_suffix":      "(option)",
            "taekwondo_desc":     "Discipline, concentration et développement physique encadré par un coach qualifié.",
            "inscription_label":  "Inscription",
            "mensualite_label":   "Mensualité",
            "per_month":          "/mois",
        },
        "programme_internat": {
            "included1_desc":     "3 repas équilibrés par jour inclus dans le forfait.",
            "included3_desc":     "Coran et livres fournis aux élèves.",
            "gouter_badge":       "Goûter — Obligatoire",
            "linge_badge":        "Linge — Obligatoire",
            "taekwondo_title":    "Taekwondo",
            "option_suffix":      "(option)",
            "taekwondo_desc":     "Discipline, concentration et développement physique encadré par un coach qualifié.",
            "inscription_label":  "Inscription",
            "mensualite_label":   "Mensualité",
            "per_month":          "/mois",
        },
    },
    "en": {
        "programme_mixed": {
            "inclus_title":       "Included &amp; Options",
            "inclus_subtitle":    "What's included in your daily programme",
            "gouter_title":       "Snack",
            "gouter_desc":        "Daily snack for boarding students.",
            "obligatoire":        "Mandatory",
            "linge_title":        "Laundry",
            "linge_desc":         "School uniform maintenance.",
            "option_suffix":      "(option)",
            "taekwondo_desc":     "Discipline, focus and physical development supervised by a qualified coach.",
            "inscription_label":  "Registration fee",
            "mensualite_label":   "Monthly fee",
            "per_month":          "/month",
        },
        "programme_internat": {
            "included1_desc":     "3 balanced meals per day included in the package.",
            "included3_desc":     "Quran and books provided to students.",
            "gouter_badge":       "Snack — Mandatory",
            "linge_badge":        "Laundry — Mandatory",
            "taekwondo_title":    "Taekwondo",
            "option_suffix":      "(option)",
            "taekwondo_desc":     "Discipline, focus and physical development supervised by a qualified coach.",
            "inscription_label":  "Registration fee",
            "mensualite_label":   "Monthly fee",
            "per_month":          "/month",
        },
    },
    "ar": {
        "programme_mixed": {
            "inclus_title":       "المشمول والخيارات",
            "inclus_subtitle":    "ما هو مقرر في برنامجك اليومي",
            "gouter_title":       "وجبة خفيفة",
            "gouter_desc":        "وجبة خفيفة يومية للطلاب المقيمين.",
            "obligatoire":        "إلزامي",
            "linge_title":        "الغسيل",
            "linge_desc":         "صيانة الزي المدرسي.",
            "option_suffix":      "(اختياري)",
            "taekwondo_desc":     "الانضباط والتركيز والتطور الجسدي بإشراف مدرب مؤهل.",
            "inscription_label":  "رسوم التسجيل",
            "mensualite_label":   "الرسوم الشهرية",
            "per_month":          "/شهر",
        },
        "programme_internat": {
            "included1_desc":     "3 وجبات متوازنة يومياً مدرجة في الحزمة.",
            "included3_desc":     "القرآن والكتب مقدمة للطلاب.",
            "gouter_badge":       "وجبة خفيفة — إلزامية",
            "linge_badge":        "الغسيل — إلزامي",
            "taekwondo_title":    "تايكوندو",
            "option_suffix":      "(اختياري)",
            "taekwondo_desc":     "الانضباط والتركيز والتطور الجسدي بإشراف مدرب مؤهل.",
            "inscription_label":  "رسوم التسجيل",
            "mensualite_label":   "الرسوم الشهرية",
            "per_month":          "/شهر",
        },
    },
    "es": {
        "programme_mixed": {
            "inclus_title":       "Incluido y Opciones",
            "inclus_subtitle":    "Lo que está incluido en su programa diario",
            "gouter_title":       "Merienda",
            "gouter_desc":        "Merienda diaria para los internos.",
            "obligatoire":        "Obligatorio",
            "linge_title":        "Ropa",
            "linge_desc":         "Mantenimiento del uniforme escolar.",
            "option_suffix":      "(opción)",
            "taekwondo_desc":     "Disciplina, concentración y desarrollo físico supervisado por un entrenador cualificado.",
            "inscription_label":  "Inscripción",
            "mensualite_label":   "Mensualidad",
            "per_month":          "/mes",
        },
        "programme_internat": {
            "included1_desc":     "3 comidas equilibradas por día incluidas en el paquete.",
            "included3_desc":     "Corán y libros proporcionados a los estudiantes.",
            "gouter_badge":       "Merienda — Obligatoria",
            "linge_badge":        "Ropa — Obligatoria",
            "taekwondo_title":    "Taekwondo",
            "option_suffix":      "(opción)",
            "taekwondo_desc":     "Disciplina, concentración y desarrollo físico supervisado por un entrenador cualificado.",
            "inscription_label":  "Inscripción",
            "mensualite_label":   "Mensualidad",
            "per_month":          "/mes",
        },
    },
}

# ── 1. Patch les 4 fichiers JSON ──────────────────────────────────────────────
JSON_FILES = {
    "fr": "translations-fr.json",
    "en": "translations-en.json",
    "ar": "translations-ar.json",
    "es": "translations-es.json",
}

for lang, fname in JSON_FILES.items():
    path = os.path.join(BASE, fname)
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    for ns, keys in NEW_KEYS[lang].items():
        if ns not in data:
            data[ns] = {}
        data[ns].update(keys)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] {fname}")

# ── 2. Patch translations.js ──────────────────────────────────────────────────
JS_PATH = os.path.join(BASE, "translations.js")
with open(JS_PATH, encoding="utf-8") as f:
    src = f.read()

def inject_after_key(src, lang_anchor, namespace, first_existing_key, new_keys_dict):
    """
    Find the first_existing_key inside namespace inside the lang block,
    and insert new keys just after it (if not already present).
    """
    # Build injection string
    to_inject = ""
    for k, v in new_keys_dict.items():
        # skip if already present
        if f'"{k}"' in src:
            continue
        escaped = v.replace('\\', '\\\\').replace('"', '\\"')
        to_inject += f',\n      "{k}": "{escaped}"'
    if not to_inject:
        return src

    # Find the last key in the namespace to anchor insertion
    # Strategy: find "namespace": { ... "first_existing_key": "..." and insert after it
    pattern = r'("' + re.escape(first_existing_key) + r'":\s*"[^"]*")'
    # We need to find the right occurrence (inside correct namespace in correct lang)
    # Use a simple approach: find all occurrences and pick the one near the lang_anchor
    lang_pos = src.find(lang_anchor)
    if lang_pos == -1:
        print(f"  WARNING: lang anchor not found: {lang_anchor!r}")
        return src
    ns_pos = src.find(f'"{namespace}"', lang_pos)
    if ns_pos == -1:
        print(f"  WARNING: namespace {namespace!r} not found after lang anchor")
        return src
    # Find first_existing_key after ns_pos
    key_pos = src.find(f'"{first_existing_key}"', ns_pos)
    if key_pos == -1:
        print(f"  WARNING: key {first_existing_key!r} not found in {namespace!r}")
        return src
    # Find end of that key's value (closing quote after colon)
    colon_pos = src.find(":", key_pos)
    val_start = src.find('"', colon_pos + 1)
    val_end = src.find('"', val_start + 1)
    # Insert after val_end + 1
    insert_pos = val_end + 1
    src = src[:insert_pos] + to_inject + src[insert_pos:]
    return src

# Anchors for each language block in translations.js
LANG_ANCHORS = {
    "fr": '"lang": "fr"',
    "en": '"lang": "en"',
    "ar": '"lang": "ar"',
    "es": '"lang": "es"',
}

# For each lang, inject after an existing key in each namespace
# Use the last known existing key as anchor
ANCHORS = {
    "programme_mixed":   "price_label4",   # last key we know exists
    "programme_internat": "price_activities", # last key we know exists
}

for lang, lang_anchor in LANG_ANCHORS.items():
    for ns, anchor_key in ANCHORS.items():
        src = inject_after_key(src, lang_anchor, ns, anchor_key, NEW_KEYS[lang][ns])

with open(JS_PATH, "w", encoding="utf-8") as f:
    f.write(src)
print("[OK] translations.js")
print("Done.")
