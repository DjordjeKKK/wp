import flask
from flask.blueprints import Blueprint
from utils.db import mysql


studenti_blueprint = Blueprint('studenti_blueprint', __name__)

# APPLICATION PROGRAMMING INTERFACE
@studenti_blueprint.route("/studenti", methods=['GET'])
def dobavi_studente():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM student')
    studenti = cursor.fetchall()
    return flask.jsonify(studenti), 200


@studenti_blueprint.route("/studenti/<int:id_studenta>", methods=['GET'])
def dobavi_studenta(id_studenta):
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM student WHERE id= %s', (id_studenta))
    student = cursor.fetchone()
    return flask.jsonify(student), 200

#   TODO Srediti brisanje foreign keyova.
@studenti_blueprint.route("/studenti/<int:id_studenta>", methods=['DELETE'])
def obrisi_studenta(id_studenta):
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute('DELETE FROM student WHERE id= %s', (id_studenta))
    db.commit()
    return flask.jsonify({'status': 'ok'}), 204


@studenti_blueprint.route("/studenti/<int:id_studenta>", methods=['PUT'])
def izmeni_studenta(id_studenta):
    data = flask.request.get_json()
    data["id"] = id_studenta
    print(data)
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute(
        "UPDATE student SET indeks= %(indeks)s, ime= %(ime)s, prezime=%(prezime)s  WHERE id=%(id)s", data)
    db.commit()
    return flask.jsonify({'status': 'ok'}), 200


@studenti_blueprint.route("/studenti", methods=["POST"])
def dodaj_studenta():
    data = flask.request.json
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute(
        "INSERT INTO student(indeks, ime, prezime) VALUES(%(indeks)s, %(ime)s, %(prezime)s)", data)
    db.commit()
    return flask.jsonify({"status": "Resource created."}), 204