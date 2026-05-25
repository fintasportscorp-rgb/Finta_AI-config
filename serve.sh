#!/bin/bash
echo "Claude Setup Wizard — Serveur local"
echo "====================================="
echo ""

open_browser() {
  sleep 1
  if command -v open &>/dev/null; then
    open "http://localhost:8080/wizard.html"
  elif command -v xdg-open &>/dev/null; then
    xdg-open "http://localhost:8080/wizard.html"
  fi
}

# Try Python 3
if command -v python3 &>/dev/null; then
  echo "Démarrage avec Python 3 sur http://localhost:8080"
  echo "→ http://localhost:8080/wizard.html"
  echo "Ctrl+C pour arrêter."
  open_browser &
  python3 -m http.server 8080
  exit 0
fi

# Try Python 2
if command -v python &>/dev/null; then
  echo "Démarrage avec Python sur http://localhost:8080"
  echo "→ http://localhost:8080/wizard.html"
  echo "Ctrl+C pour arrêter."
  open_browser &
  python -m SimpleHTTPServer 8080
  exit 0
fi

# Try npx
if command -v npx &>/dev/null; then
  echo "Démarrage avec npx serve sur http://localhost:8080"
  echo "→ http://localhost:8080/wizard.html"
  echo "Ctrl+C pour arrêter."
  open_browser &
  npx serve . -p 8080
  exit 0
fi

echo "ERREUR : Python ou Node.js requis."
echo "Installe Python depuis https://python.org"
echo "ou Node.js depuis https://nodejs.org"
exit 1
