#!/usr/bin/env python3
import json, os
BASE = os.path.dirname(os.path.abspath(__file__))

KEYS = {
    "fr": {
        "sched_row_1": "Accueil et installation",
        "sched_row_2": "<strong>Apprentissage du Coran</strong> — nouvelle leçon, lecture corrigée, Tajweed.",
        "sched_row_3": "Pause + collation",
        "sched_row_4": "<strong>Révision du Coran</strong> et sciences islamiques (Fiqh, Aqida, Akhlaq)",
        "sched_row_5": "Déjeuner sur place + temps libre encadré",
        "sched_row_6": "Prière de Dhohr en groupe",
        "sched_row_7": "<strong>Cours académiques français</strong> — français, mathématiques, sciences, histoire-géographie, anglais (programme officiel du Sénégal).",
        "sched_row_8": "Prière de Asr",
        "sched_row_9": "<strong>Sortie</strong> — retour à la maison auprès de la famille.",
    },
    "en": {
        "sched_row_1": "Welcome and settling in",
        "sched_row_2": "<strong>Quran learning</strong> — new lesson, corrected recitation, Tajweed.",
        "sched_row_3": "Break + snack",
        "sched_row_4": "<strong>Quran revision</strong> and Islamic sciences (Fiqh, Aqida, Akhlaq)",
        "sched_row_5": "Lunch on-site + supervised free time",
        "sched_row_6": "Dhuhr prayer in group",
        "sched_row_7": "<strong>French academic classes</strong> — French, mathematics, science, history-geography, English (official Senegalese curriculum).",
        "sched_row_8": "Asr prayer",
        "sched_row_9": "<strong>Departure</strong> — return home to the family.",
    },
    "ar": {
        "sched_row_1": "الاستقبال والاستقرار",
        "sched_row_2": "<strong>تعلم القرآن</strong> — درس جديد، تلاوة مصححة، تجويد.",
        "sched_row_3": "استراحة + وجبة خفيفة",
        "sched_row_4": "<strong>مراجعة القرآن</strong> والعلوم الإسلامية (فقه، عقيدة، أخلاق)",
        "sched_row_5": "الغداء في المكان + وقت حر مشرف",
        "sched_row_6": "صلاة الظهر جماعةً",
        "sched_row_7": "<strong>الدروس الأكاديمية الفرنسية</strong> — الفرنسية، الرياضيات، العلوم، الجغرافيا والتاريخ، الإنجليزية (المنهج الرسمي السنغالي).",
        "sched_row_8": "صلاة العصر",
        "sched_row_9": "<strong>الانصراف</strong> — العودة إلى المنزل.",
    },
    "es": {
        "sched_row_1": "Bienvenida e instalación",
        "sched_row_2": "<strong>Aprendizaje del Corán</strong> — nueva lección, recitación corregida, Tajweed.",
        "sched_row_3": "Descanso + merienda",
        "sched_row_4": "<strong>Repaso del Corán</strong> y ciencias islámicas (Fiqh, Aqida, Akhlaq)",
        "sched_row_5": "Almuerzo en el lugar + tiempo libre supervisado",
        "sched_row_6": "Oración de Dhuhr en grupo",
        "sched_row_7": "<strong>Clases académicas francesas</strong> — francés, matemáticas, ciencias, historia-geografía, inglés (programa oficial de Senegal).",
        "sched_row_8": "Oración de Asr",
        "sched_row_9": "<strong>Salida</strong> — regreso a casa con la familia.",
    },
}

JSON_FILES = {"fr":"translations-fr.json","en":"translations-en.json","ar":"translations-ar.json","es":"translations-es.json"}
for lang, fname in JSON_FILES.items():
    path = os.path.join(BASE, fname)
    with open(path, encoding="utf-8") as f: data = json.load(f)
    if "programme_mixed" not in data: data["programme_mixed"] = {}
    data["programme_mixed"].update(KEYS[lang])
    with open(path, "w", encoding="utf-8") as f: json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] {fname}")

# translations.js — inject after last known key in programme_mixed per lang
JS_PATH = os.path.join(BASE, "translations.js")
with open(JS_PATH, encoding="utf-8") as f: src = f.read()

LANG_MARKS = {"fr":'"lang": "fr"',"en":'"lang": "en"',"ar":'"lang": "ar"',"es":'"lang": "es"'}
ANCHOR_KEY = "schedule_note"

for lang, mark in LANG_MARKS.items():
    lpos = src.find(mark)
    if lpos == -1: print(f"  WARN: lang mark not found: {mark}"); continue
    ns_pos = src.find('"programme_mixed"', lpos)
    if ns_pos == -1: print(f"  WARN: programme_mixed not found for {lang}"); continue
    key_pos = src.find(f'"{ANCHOR_KEY}"', ns_pos)
    if key_pos == -1: print(f"  WARN: anchor key not found for {lang}"); continue
    colon = src.find(":", key_pos)
    vstart = src.find('"', colon+1)
    vend = src.find('"', vstart+1)
    inject = ""
    for k, v in KEYS[lang].items():
        if f'"{k}"' not in src[ns_pos:ns_pos+5000]:
            ev = v.replace('\\','\\\\').replace('"','\\"')
            inject += f',\n      "{k}": "{ev}"'
    if inject:
        src = src[:vend+1] + inject + src[vend+1:]
        print(f"[OK] translations.js — {lang} — {len(KEYS[lang])} clés")
    else:
        print(f"[SKIP] translations.js — {lang} — déjà présent")

with open(JS_PATH, "w", encoding="utf-8") as f: f.write(src)
print("Done.")
