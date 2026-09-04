#!/bin/bash
# Assemble la feuille de style unique servie par le site.
#
# Le site chargeait cinq feuilles : Tailwind, site.css, modern.css, plus Font
# Awesome et Google Fonts depuis deux CDN. Chacune retardait le premier rendu
# et deux d'entre elles imposaient une résolution DNS et une poignée de main TLS
# supplémentaires. On produit ici un seul fichier auto-hébergé.
#
# Ordre impératif : polices, Tailwind (base), Font Awesome, puis site.css et
# modern.css qui surchargent les utilitaires Tailwind.
#
# Prérequis : npm install --no-save clean-css@5
set -e
cd "$(dirname "$0")/.."
npx tailwindcss -i ./assets/css/tailwind-src.css -o ./assets/css/tailwind.css --minify
{
  echo "/*! Al Amine Academy — feuille unique générée par tools/build-css.sh."
  echo " *  Ne pas éditer : modifier les sources (fonts.css, tailwind-src.css,"
  echo " *  fa-subset.css, site.css, modern.css) puis relancer le script. */"
  cat assets/css/fonts.css
  cat assets/css/tailwind.css
  cat assets/css/fa-subset.css
  cat assets/css/site.css
  cat assets/css/modern.css
} > /tmp/aaa-app.raw.css
node -e '
const CleanCSS = require("clean-css"), fs = require("fs");
/* Niveau 1 seulement : le niveau 2 réorganise les règles pour un gain de
   20 octets une fois compressé, sans intérêt face au risque sur la cascade. */
const out = new CleanCSS({ level: 1 }).minify(fs.readFileSync("/tmp/aaa-app.raw.css", "utf8"));
if (out.errors.length) { console.error(out.errors); process.exit(1); }
fs.writeFileSync("assets/css/app.css", out.styles);
'
printf 'assets/css/app.css : %s o (%s o une fois compressé)\n' \
  "$(stat -c%s assets/css/app.css)" "$(gzip -9c assets/css/app.css | wc -c)"
