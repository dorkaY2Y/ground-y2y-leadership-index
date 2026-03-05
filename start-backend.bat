@echo off
echo ========================================
echo Y2Y Leadership Backend Szerver
echo ========================================
echo.

cd backend

if not exist .env (
    echo HIBA: A .env fajl nem letezik!
    echo.
    echo Kovess el a backend/SETUP.md utmutatot a beallitashoz.
    echo.
    pause
    exit /b 1
)

echo Szerver inditasa...
echo.
node server.js
