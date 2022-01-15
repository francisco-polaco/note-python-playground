@echo off
set FLASK_APP=src/app/app.py
set FLASK_ENV=development
flask run --port=8080
