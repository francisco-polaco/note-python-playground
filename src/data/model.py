from sqlalchemy import Column, UnicodeText, Integer

from src.data.engine import base


class Note(base):
    __tablename__ = 'notes'
    id = Column(UnicodeText(40), primary_key=True)
    timestamp = Column(Integer)
    content = Column(UnicodeText, nullable=True)

    def __init__(self, note_id: str, timestamp: int, content: str):
        self.id = note_id
        self.timestamp = timestamp
        self.content = content

    def __repr__(self) -> str:
        return f'Note({self.id}, {self.timestamp}, {self.content})'

    def to_dict(self) -> dict:
        return {
            "note_id": self.id,
            "timestamp": self.timestamp,
            "content": self.content
        }


base.metadata.create_all()
