import uuid

import pytest
import src.data.database as db
from src.data.model import Note

note_id = str(uuid.uuid4())


@pytest.fixture(autouse=True)
def cleanup():
    db.delete_note(note_id)


def test_save_note():

    saved_note = Note(note_id=note_id, timestamp=123, content='test')
    # get the dict here, because after committing this note to the DB, the entries will be invalidated.
    saved_note_to_dict = saved_note.to_dict()
    db.store_note(saved_note)

    note_to_assert = db.get_note(note_id)

    if isinstance(saved_note, Note) and isinstance(note_to_assert, Note):
        assert saved_note_to_dict == note_to_assert.to_dict()
    else:
        assert False
