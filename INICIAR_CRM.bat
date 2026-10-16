@echo off
title Vitgold CRM - Servidor Local + WhatsApp IA
color 0B
echo ================================================================
echo   VITGOLD CRM - ZIELHUB OMNICHANNEL + IA OPEN SOURCE
echo ================================================================
echo.
echo [1/2] Iniciando servicos locais (Vite + WhatsApp Bot)...
cd /d "%~dp0"

start http://localhost:5173

node server/unified-runner.js

pause
