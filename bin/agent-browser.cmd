@echo off
:: agent-browser CLI wrapper for Windows
:: Tries native binary first, falls back to Node.js

setlocal

set "SCRIPT_DIR=%~dp0"

:: Detect architecture
if "%PROCESSOR_ARCHITECTURE%"=="AMD64" (
    set "ARCH=x64"
) else if "%PROCESSOR_ARCHITECTURE%"=="ARM64" (
    set "ARCH=arm64"
) else (
    set "ARCH=x64"
)

set "BINARY=%SCRIPT_DIR%agent-browser-win32-%ARCH%.exe"

:: Try native binary first
if exist "%BINARY%" (
    "%BINARY%" %*
    exit /b %errorlevel%
)

:: Fall back to Node.js
node "%SCRIPT_DIR%..\dist\index.js" %*
exit /b %errorlevel%
