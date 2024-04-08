from uuid import uuid4 as uuid
import json
from flask import Flask, request
from flask_cors import CORS
from server.models import Poll, PollOption, SQL
from sqlalchemy import select, insert, delete


app = Flask(__name__)
CORS(app)

def sql():
    try:
        SQL = Session(Engine)
    ensure

@app.post("/api/polls")
def create_poll():
    attrs = json.loads(request.data)['poll']
    attrs['id'] = str(uuid())
    with SQL.begin():
        poll = Poll(**attrs)
        SQL.add(poll)
        SQL.commit()
    return poll.as_json()

@app.get("/api/polls")
def list_polls():
    return json.dumps([record.as_dict() for record in SQL.query(Poll).all()])
