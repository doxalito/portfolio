#!/usr/bin/env bash
# Génère un ZIP importable dans Shopify (contenu à la racine, sans le dossier parent).
set -euo pipefail
cd "$(dirname "$0")"
OUT="../spiral-shopify-theme.zip"
rm -f "$OUT"
zip -r "$OUT" assets config layout locales sections snippets templates \
  -x "*.DS_Store" >/dev/null
echo "ZIP créé : $(cd .. && pwd)/spiral-shopify-theme.zip"
