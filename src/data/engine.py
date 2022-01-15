import os

import sqlalchemy as db
from sqlalchemy.orm import sessionmaker, declarative_base

if os.path.exists('var') is False:
    print('Creating db directory.')
    os.makedirs('var')

engine = db.create_engine('sqlite:///var/foo.db')
base = declarative_base(bind=engine)

Session = sessionmaker(bind=engine)
