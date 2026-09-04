#!/bin/bash
# Minifie les trois scripts servis par le site.
#
# Les sources restent lisibles et commentées ; les pages chargent les .min.js.
# Relancer après toute modification de lang.js, site-shell.js ou modern-reveal.js.
set -e
cd "$(dirname "$0")/.."
for src in lang.js assets/js/modern-reveal.js assets/js/site-shell.js; do
  out="${src%.js}.min.js"
  npx --yes terser@5 "$src" --compress --mangle --output "$out"
  printf '%-34s %7s o -> %6s o (%s o compressé)\n' "$out" \
    "$(stat -c%s "$src")" "$(stat -c%s "$out")" "$(gzip -9c "$out" | wc -c)"
done
