
run:
	FLASK_APP=src/app/app.py FLASK_ENV=development python3 -m flask run --port=8080

webapp:
	cd src/webapp && npm start && cd ../..

install:
	pip install -r requirements.txt

install-webapp:
	cd src/webapp && npm install && cd ../..

clean-env:
	rm -rf var/*

lint:
	flake8 src/ --count --select=E9,F63,F7,F82 --show-source --statistics
	flake8 src/ --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics

test:
	pytest

doc:
	openapi/generate.sh
