@echo off
echo Starting SynaptiVoice Frontend Server...
echo.
echo Installing dependencies...
call npm install

echo.
echo Starting development server...
call npm start

pause
