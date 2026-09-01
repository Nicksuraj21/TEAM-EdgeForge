@echo off
echo Starting BarrierVerse Local Server...
start "" "http://localhost:8080/"
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 8080
pause
