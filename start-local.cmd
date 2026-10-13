@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo Run setup.cmd first to install dependencies.
  exit /b 1
)

if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Created .env from .env.example. Review the local credentials before starting.
)

echo Start PostgreSQL with pgvector and Redis separately, then press a key.
pause
start "Mini CRM API" cmd /k ".venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload"
pushd frontend
call npm.cmd run dev
popd
