@echo off
START /B win-scripts\start.bat
timeout /t 2
python openapi/generate-swagger-doc.py
taskkill /FI "WindowTitle eq Note Taking App" /T /F
