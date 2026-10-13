@echo off
setlocal
cd /d "%~dp0"

where docker >nul 2>nul
if errorlevel 1 (
  if exist "C:\Program Files\Docker\Docker\resources\bin\docker.exe" (
    set "PATH=%PATH%;C:\Program Files\Docker\Docker\resources\bin"
  ) else (
    echo Docker Desktop is not installed. Run setup.cmd for local dependencies.
    exit /b 1
  )
)

if not exist ".env" (
  copy ".env.example" ".env" >nul
  echo Created .env from .env.example. Review the local credentials before starting.
)

docker compose up --build
