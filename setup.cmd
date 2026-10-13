@echo off
setlocal
cd /d "%~dp0"

if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Created .env from .env.example. Review the local credentials before starting.
)

if not exist ".venv\Scripts\python.exe" (
  py -3.11 -m venv .venv
  if errorlevel 1 (
    echo Failed to create the Python virtual environment. Install Python 3.11 first.
    exit /b 1
  )
)

".venv\Scripts\python.exe" -m pip install -r backend\requirements.txt
if errorlevel 1 exit /b 1

pushd frontend
call npm.cmd install
if errorlevel 1 (
  popd
  exit /b 1
)
popd

echo Setup complete. Run start.cmd for Docker or start-local.cmd for local services.
