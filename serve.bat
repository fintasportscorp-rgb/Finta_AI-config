@echo off
echo Claude Setup Wizard — Serveur local
echo =====================================
echo.

:: Try Python first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Demarrage avec Python sur http://localhost:8080
    echo Ouvre : http://localhost:8080/wizard.html
    echo Appuie sur Ctrl+C pour arreter.
    echo.
    python -m http.server 8080
    goto :end
)

:: Try Node/npx
npx --version >nul 2>&1
if %errorlevel% == 0 (
    echo Demarrage avec npx serve sur http://localhost:8080
    echo Ouvre : http://localhost:8080/wizard.html
    echo Appuie sur Ctrl+C pour arreter.
    echo.
    npx serve . -p 8080
    goto :end
)

echo ERREUR : Python ou Node.js requis.
echo Installe Python depuis https://python.org
echo ou Node.js depuis https://nodejs.org
pause
:end
