import flask
from flask.blueprints import Blueprint
from utils.db import mysql


predmeti_blueprint = Blueprint('predmeti_blueprint', __name__)

# APPLICATION PROGRAMMING INTERFACE
@predmeti_blueprint.route("/predmeti", methods=['GET'])
def dobavi_predmete():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM predmet')
    predmeti = cursor.fetchall()
    return flask.jsonify(predmeti), 200


@predmeti_blueprint.route("/predmeti/<int:id_predmeta>", methods=['GET'])
def dobavi_predmet(id_predmeta):
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM predmet WHERE id= %s', (id_predmeta))
    predmet = cursor.fetchone()
    return flask.jsonify(predmet), 200

#   TODO Srediti brisanje foreign keyova.
@predmeti_blueprint.route("/predmeti/<int:id_predmeta>", methods=['DELETE'])
def obrisi_predmet(id_predmeta):
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute('DELETE FROM predmet WHERE id= %s', (id_predmeta))
    db.commit()
    return flask.jsonify({'status': 'ok'}), 204


@predmeti_blueprint.route("/predmeti/<int:id_predmeta>", methods=['PUT'])
def izmeni_predmet(id_predmeta):
    data = flask.request.get_json()
    data["id"] = id_predmeta
    print(data)
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute(
        "UPDATE predmet SET naziv= %(naziv)s, skracenica= %(skracenica)s, profesor_id= %(profesor_id)s WHERE id=%(id)s", data)
    db.commit()
    return flask.jsonify({'status': 'ok'}), 200


@predmeti_blueprint.route("/predmeti", methods=["POST"])
def dodaj_predmet():
    data = flask.request.json
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute(
        "INSERT INTO predmet(naziv, skracenica, profesor_id) VALUES(%(naziv)s, %(skracenica)s, %(profesor_id)s)", data)
    db.commit()
    return flask.jsonify({"status": "Resource created."}), 204