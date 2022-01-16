#!/usr/bin/bash

FLASK_APP=src/app/app.py FLASK_ENV=development python3 -m flask run --port=8080 &
pid=$!
sleep 1
python3 openapi/generate-swagger-doc.py
kill $pid
