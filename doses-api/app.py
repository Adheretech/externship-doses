import sqlite3
from flask import Flask

app = Flask(__name__)

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

def get_db_connection():
    conn = sqlite3.connect('data.db')
    conn.row_factory = dict_factory
    return conn

@app.get("/healthz")
def healthz():
    return {'status': 200}

def init_db():
    cur = get_db_connection().cursor()
    with open("structure.sql") as f:
        cur.executescript(f.read())

if __name__ == "__main__":
    init_db()
    app.run(host='0.0.0.0')
