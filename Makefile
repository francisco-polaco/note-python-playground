
run:
	FLASK_APP=src/app/app.py FLASK_ENV=development python3 -m flask run --port=8080

install:
	pip install -r requirements.txt

clean-env:
	rm -rf var/*
