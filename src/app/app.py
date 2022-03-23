from flask import Flask, request, json, Response, Blueprint
from flask_restx import Api, Resource, fields
from flask_cors import CORS
import os
import src.data.database as db
from src.data.model import Note

app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/docs')
api = Api(app=app, version='1.0', title='Note Taking App', description='Python playground', blueprint=blueprint,
          doc='/docs', default_label='Note Taking Namespace', default='note-taking')
app.register_blueprint(blueprint)

ns = api.namespace('Note', description='Note APIs')

model = api.model('Note', {
    'note_id': fields.String(required=True, description="ID of the note.", help="Cannot be blank."),
    'timestamp': fields.Integer(description="Note's timestamp.", help="UNIX epoch."),
    'content': fields.String(description="The actual note.")
})


if os.environ['FLASK_ENV'] == 'development':
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
else:
    cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def buildListResult(notes: list):
    final_notes = []
    for note in notes:
        final_notes += [note.to_dict()]
    return Response(response=json.dumps(final_notes),
                    status=200,
                    mimetype="application/json")


@api.route('/api/list')
class ListNotes(Resource):
    """Shows a list of all notes"""

    @ns.doc('list_notes')
    # FIXME: auto marshal
    # @ns.marshal_list_with(model)
    @ns.response(200, "List of notes.")
    @ns.response(400, "'limit' parameter should be an integer.")
    @ns.response(404, "Notes not found.")
    @ns.param(name='limit', description='The maximum number of elements to return.')
    def get(self):
        limit_parameter = request.args.get('limit')

        if limit_parameter is not None:
            try:
                limit = int(limit_parameter)
            except ValueError:
                # throw 400 if limit is not an int.
                return "'limit' parameter should be an integer!", 400
        else:
            limit = 5

        notes = db.list_notes(limit)

        if notes is None or notes == []:
            return [], 404
        else:
            return buildListResult(notes)


@api.route('/api/get')
class GetNote(Resource):
    """Gets a note"""

    @ns.doc('get_note')
    # FIXME: auto marshal
    # @ns.marshal_with(model)
    @ns.response(200, "The note.")
    @ns.response(400, "'id' parameter should not be empty.")
    @ns.response(404, "Note not found.")
    @ns.param(name='id', description='The note id to retrieve.')
    def get(self):
        id_parameter = request.args.get('id')
        if id_parameter is None or id_parameter == "":
            return "'id' parameter should not be empty!", 400

        note = db.get_note(id_parameter)

        if note is None:
            return f"Note with id '{id_parameter}' not found.", 404
        else:
            return Response(response=json.dumps(note.to_dict()),
                            status=200,
                            mimetype="application/json")


@api.route('/api/delete')
class DeleteNote(Resource):
    """Deletes a note"""

    @ns.doc('delete_note')
    @ns.response(200, "Success")
    @ns.response(400, "'id' parameter should not be empty.")
    @ns.param(name='id', description='The note id to delete.')
    def get(self):
        id_parameter = request.args.get('id')
        if id_parameter is None or id_parameter == "":
            return "'id' parameter should not be empty!", 400

        db.delete_note(id_parameter)
        return 'OK', 200


@api.route('/api/save')
class SaveNote(Resource):
    """Saves a note"""

    @ns.doc('save_note')
    @ns.expect(model)
    @ns.response(200, "Success")
    @ns.response(400, "Request body is empty.")
    def post(self):
        payload = request.get_json()
        if payload is None or payload == {}:
            return "'payload' should not be empty!", 400

        note = Note(**payload)
        db.store_note(note)
        return 'OK', 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
