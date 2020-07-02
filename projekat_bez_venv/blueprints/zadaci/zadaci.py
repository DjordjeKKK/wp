import flask
from flask.blueprints import Blueprint
from utils.db import mysql


zadaci_blueprint = Blueprint('zadaci_blueprint', __name__)

# APPLICATION PROGRAMMING INTERFACE
@zadaci_blueprint.route("/zadaci", methods=['GET'])
def dobavi_zadatke():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM zadatak')
    zadaci = cursor.fetchall()
    return flask.jsonify(zadaci), 200


@zadaci_blueprint.route("/zadaci/<int:id_zadatka>", methods=['GET'])
def dobavi_zadatak(id_zadatka):
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM zadatak WHERE id= %s', (id_zadatka))
    zadatak = cursor.fetchone()
    return flask.jsonify(zadatak), 200

#   TODO Srediti brisanje foreign keyova.
@zadaci_blueprint.route("/zadaci/<int:id_zadatka>", methods=['DELETE'])
def obrisi_zadatak(id_zadatka):
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute('DELETE FROM zadatak WHERE id= %s', (id_zadatka))
    db.commit()
    return flask.jsonify({'status': 'ok'}), 204


@zadaci_blueprint.route("/zadaci/<int:id_zadatka>", methods=['PUT'])
def izmeni_zadatak(id_zadatka):
    data = flask.request.get_json()
    data["id"] = id_zadatka
    print(data)
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute(
        "UPDATE zadatak SET predmet_id= %(predmet_id)s, naslov= %(naslov)s, sadrzaj=%(sadrzaj)s, datum_provere=%(datum_provere)s  WHERE id=%(id)s", data)
    db.commit()
    return flask.jsonify({'status': 'ok'}), 200


@zadaci_blueprint.route("/zadaci", methods=["POST"])
def dodaj_zadatak():
    data = flask.request.json
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute(
        "INSERT INTO zadatak(predmet_id, naslov, sadrzaj, datum_provere) VALUES(%(predmet_id)s, %(naslov)s, %(sadrzaj)s, %(datum_provere)s)", data)
    db.commit()
    return flask.jsonify({"status": "Resource created."}), 204
