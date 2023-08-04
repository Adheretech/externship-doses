import sqlite3
from flask import Flask, jsonify, request
import os
from flask_cors import CORS
# Test
app = Flask(__name__)
CORS(app)

@app.route("/dose", methods=["POST"])
def post_dose():
    try:
        data = request.get_json()

        patient = data.get("patient")
        medication = data.get("medication")
        dose_time = data.get("doseTime", None)

        if not patient or not medication:
            return jsonify({'error': 'Patient and medication information are required'}), 400

        conn = get_db_connection()
        cur = conn.cursor()

        if dose_time:
            cur.execute('INSERT INTO doses (patient, medication, dose_time) VALUES(?, ?, ?)',
                        (patient, medication, dose_time))
        else:
            cur.execute(
                'INSERT INTO doses (patient, medication) VALUES(?, ?)', (patient, medication))

        conn.commit()

        cur.execute('SELECT * FROM doses WHERE id = ?', (cur.lastrowid, ))
        dose = cur.fetchone()
        
        conn.close()

        return jsonify({"message": "Dosage added successfully"}, dose), 200
    except Exception as e:
        # Internal Server Error
        return jsonify({'error': str(e)}), 500


@app.route("/dose/<int:dosageId>", methods=['GET'])
def get_dosage(dosageId):
    try:
        # dosage_id = request.get_json().get('dosageId')
        dosage_id = dosageId

        if not dosage_id:
            return jsonify({'error': 'dosageId is required to retrieve dosage information'}), 400

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM doses WHERE id = ?", (dosage_id, ))
        dose = cur.fetchone()

        conn.close()
        if dose:
            return jsonify(dose), 200
        else:
            return jsonify({'error': 'Dosage not found!'}), 404
    except Exception as e:
        # Internal Server Error
        return jsonify({'error': str(e)}), 500


@app.route("/getAllDoses", methods=['GET'])
def get_all_doses():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute('SELECT * FROM doses')
        all_doses = cur.fetchall()
        
        conn.close()
        
        if all_doses:
            return jsonify(all_doses), 200
        else:
            return jsonify({'error': 'No valid doses found'}), 400
    except Exception as e:
        # Internal Server Error
        return jsonify({'error': str(e)}), 500


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
