import time
import uuid
from uuid import UUID

import data.database as db
from src.data.model import Note

if __name__ == '__main__':
    note_id: UUID = uuid.uuid4()
    note = Note(str(note_id), int(time.time()), "Batata")
    db.store_note(note)
    print(db.get_note(str(note_id)))
