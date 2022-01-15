from flask import Flask, request, json

import src.data.database as db
from src.data.model import Note

app = Flask(__name__)


@app.route('/api/list')
def list_notes():
    limit_parameter = request.args.get('limit')

    if limit_parameter is not None:
        try:
            limit = int(limit_parameter)
        except ValueError:
            # throw 400 if limit is not an int.
            return "'limit' parameter should be an integer!", 400
    else:
        limit = 5

    return str(db.list_notes(limit))


@app.route('/api/get')
def get_note():
    id_parameter = request.args.get('id')
    if id_parameter is None or id_parameter == "":
        return "'id' parameter should not be empty!", 400

    note = db.get_note(id_parameter)

    if note is None:
        return f"Note with id '{id_parameter}' not found.", 404
    else:
        return json.dumps(note.to_dict())


@app.route('/api/delete')
def delete_note():
    id_parameter = request.args.get('id')
    if id_parameter is None or id_parameter == "":
        return "'id' parameter should not be empty!", 400

    db.delete_note(id_parameter)
    return 'OK', 200


@app.route('/api/save', methods=['POST'])
def store_note():
    payload = request.get_json()
    if payload is None or payload == {}:
        return "'payload' should not be empty!", 400

    note = Note(**payload)
    db.store_note(note)
    return 'OK', 200
