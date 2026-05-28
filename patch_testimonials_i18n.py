#!/usr/bin/env python3
# patch_testimonials_i18n.py — inject testimonial translation keys
import json, os

BASE = os.path.dirname(os.path.abspath(__file__))

KEYS = {
    "fr": {
        "testimonial1_text": "“J’ai mis 5 étoiles parce que c’est le maximum qu’on peut noter, sinon vous méritez plus. À peine 1 an que nos enfants sont rentrés dans votre école, franchement on ne le regrette pas.”",
        "testimonial2_text": "“Je suis plus que satisfaite du Daara Al amine, j’y avais laissé mes deux enfants mais machallah que de bons retours de leur part. Merci encore pour le professionnalisme.”",
        "testimonial3_text": "“Je recommande vivement cette Daara. J’y ai inscrit mon petit frère de 9 ans et en moins de 2 mois, il est devenu poli, posé et studieux. Sa lecture coranique est devenue très fluide.”",
        "testimonial4_text": "“Très bon internat. Bien structuré, très bonne pédagogie, très bon apprentissage. Évolution de l’enfant dans l’apprentissage.”",
        "parent_label":       "Parent d’élève",
        "parent_label_plural":"Parent d’élèves",
    },
    "en": {
        "testimonial1_text": "“I gave 5 stars because it’s the maximum rating, otherwise you deserve more. Barely 1 year since our children enrolled in your school and we honestly don’t regret it.”",
        "testimonial2_text": "“I am more than satisfied with Daara Al Amine. I entrusted both my children there and mashallah, only positive feedback from them. Thank you again for the professionalism.”",
        "testimonial3_text": "“I highly recommend this Daara. I enrolled my 9-year-old brother and in less than 2 months he became polite, calm, and studious. His Quranic recitation has become very fluent.”",
        "testimonial4_text": "“Very good boarding school. Well structured, excellent pedagogy, great learning. Real progress in the child’s education.”",
        "parent_label":       "Student’s parent",
        "parent_label_plural":"Students’ parent",
    },
    "ar": {
        "testimonial1_text": "“أعطيت 5 نجوم لأنه الحد الأقصى للتقييم، وإلا فأنتم تستحقون أكثر. لم يمضِ سوى عام منذ التحاق أطفالنا بمدرستكم، وصراحةً لم نندم على ذلك.”",
        "testimonial2_text": "“أنا أكثر من راضية عن داارا الأمين. أودعتها طفليّ وماشاء الله ما من إلا ردود فعل إيجابية منهما. شكراً مجدداً على الاحترافية.”",
        "testimonial3_text": "“أوصي بشدة بهذه الداارا. أدرجتفيها أخي البالغ من العمر 9 سنوات وفي أقل من شهرين أصبح مؤدباً وهادئاً ومجتهداً. تلاوته القرآنية أصبحت سلسة جداً.”",
        "testimonial4_text": "“داخلية ممتازة. منظمة جيداً، تدريس رائع، تعلم ممتاز. تطوّر حقيقي للطفل في مسيرته التعليمية.”",
        "parent_label":       "ولي أمر طالب",
        "parent_label_plural":"ولي أمر طلاب",
    },
    "es": {
        "testimonial1_text": "“Puse 5 estrellas porque es el máximo que se puede dar, de lo contrario merecen más. Apenas 1 año desde que nuestros hijos entraron a su escuela y francamente no nos arrepentimos.”",
        "testimonial2_text": "“Estoy más que satisfecha con el Daara Al Amine. Dejé a mis dos hijos allí y mashallah, solo buenas noticias de su parte. Gracias de nuevo por el profesionalismo.”",
        "testimonial3_text": "“Recomiendo ampliamente este Daara. Inscribí a mi hermano de 9 años y en menos de 2 meses se volvió educado, tranquilo y estudioso. Su recitación del Corán se ha vuelto muy fluida.”",
        "testimonial4_text": "“Muy buen internado. Bien estructurado, muy buena pedagógia, muy buen aprendizaje. Evolución del niño en el aprendizaje.”",
        "parent_label":       "Padre/Madre de alumno",
        "parent_label_plural":"Padre/Madre de alumnos",
    },
}

JSON_FILES = {"fr":"translations-fr.json","en":"translations-en.json","ar":"translations-ar.json","es":"translations-es.json"}
for lang, fname in JSON_FILES.items():
    path = os.path.join(BASE, fname)
    with open(path, encoding="utf-8") as f: data = json.load(f)
    if "home" not in data: data["home"] = {}
    data["home"].update(KEYS[lang])
    with open(path, "w", encoding="utf-8") as f: json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"[OK] {fname}")

# translations.js
JS_PATH = os.path.join(BASE, "translations.js")
with open(JS_PATH, encoding="utf-8") as f: src = f.read()

LANG_MARKS = {"fr":'"lang": "fr"',"en":'"lang": "en"',"ar":'"lang": "ar"',"es":'"lang": "es"'}
ANCHOR_KEY = "more_testimonials"

for lang, mark in LANG_MARKS.items():
    lpos = src.find(mark)
    if lpos == -1: print(f"  WARN: lang mark not found: {mark}"); continue
    ns_pos = src.find('"home"', lpos)
    if ns_pos == -1: print(f"  WARN: home ns not found for {lang}"); continue
    key_pos = src.find(f'"{ANCHOR_KEY}"', ns_pos)
    if key_pos == -1: print(f"  WARN: anchor key not found for {lang}"); continue
    colon = src.find(":", key_pos)
    vstart = src.find('"', colon+1)
    vend = src.find('"', vstart+1)
    inject = ""
    for k, v in KEYS[lang].items():
        if f'"{k}"' not in src[ns_pos:ns_pos+8000]:
            ev = v.replace('\\','\\\\').replace('"','\\"')
            inject += f',\n      "{k}": "{ev}"'
    if inject:
        src = src[:vend+1] + inject + src[vend+1:]
        print(f"[OK] translations.js — {lang} — {len(KEYS[lang])} clés")
    else:
        print(f"[SKIP] translations.js — {lang} — déjà présent")

with open(JS_PATH, "w", encoding="utf-8") as f: f.write(src)
print("Done.")
