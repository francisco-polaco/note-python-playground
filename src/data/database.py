from src.data.engine import Session
from src.data.model import Note


def store_note(note: Note):
    print(f"Writing note with id {note.id}.")
    with Session() as s:
        s.add(note)
        s.commit()


def get_note(note_id: str):
    print(f"Fetching note with id {note_id}.")
    with Session() as s:
        return s.query(Note).get(note_id)


def list_notes(limit: int):
    print(f"Fetching {limit} notes.")
    with Session() as s:
        return s.query(Note).limit(limit).all()


def delete_note(note_id: str):
    print(f"Deleting note with id {note_id}.")
    with Session() as s:
        s.query(Note).filter(Note.id == note_id).delete()
        s.commit()
