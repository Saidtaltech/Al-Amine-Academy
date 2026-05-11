@echo off
chcp 65001 >nul
title Al Amine Academy — Mise en ligne
color 0B
cd /d "%~dp0"
echo.
echo  ============================================================
echo   AL AMINE ACADEMY — Push GitHub (auto-deploy Hostinger)
echo  ============================================================
echo.
echo  1/3  Ajout des fichiers modifies...
git add .
if errorlevel 1 goto :error

echo.
echo  2/3  Commit...
git commit -m "fix: contenu visible meme si AOS/CDN echoue + cache-buster"
if errorlevel 1 (
  echo  Aucun changement a commiter, on tente quand meme un push...
)

echo.
echo  3/3  Push vers GitHub (declenche auto-deploy Hostinger)...
git push origin main
if errorlevel 1 goto :error

echo.
echo  ============================================================
echo   TERMINE — le site sera mis a jour dans ~1 minute.
echo   Ouvre https://alamineacademy.com et fais Ctrl+Shift+R
echo  ============================================================
echo.
pause
exit /b 0

:error
echo.
echo  ============================================================
echo   ERREUR lors du push.
echo   Verifie ta connexion internet et tes credentials Git.
echo   En cas de blocage : ouvre PowerShell ici et tape :
echo     git push origin main
echo  ============================================================
echo.
pause
exit /b 1
