import flask
from flask.blueprints import Blueprint
from utils.db import mysql


profesori_blueprint = Blueprint('profesori_blueprint', __name__)

# APPLICATION PROGRAMMING INTERFACE
@profesori_blueprint.route("/profesori", methods=['GET'])
def dobavi_profesore():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM profesor')
    profesori = cursor.fetchall()
    return flask.jsonify(profesori), 200


@profesori_blueprint.route("/profesori/<int:id_profesora>", methods=['GET'])
def dobavi_profesora(id_profesora):
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM profesor WHERE id= %s', (id_profesora))
    profesor = cursor.fetchone()
    return flask.jsonify(profesor), 200

#   TODO Srediti brisanje foreign keyova.
@profesori_blueprint.route("/profesori/<int:id_profesora>", methods=['DELETE'])
def obrisi_profesora(id_profesora):
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute('DELETE FROM profesor WHERE id= %s', (id_profesora))
    db.commit()
    return flask.jsonify({'status': 'ok'}), 204


@profesori_blueprint.route("/profesori/<int:id_profesora>", methods=['PUT'])
def izmeni_profesora(id_profesora):
    data = flask.request.get_json()
    data["id"] = id_profesora
    print(data)
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute(
        "UPDATE profesor SET id= %(id)s, ime= %(ime)s, prezime=%(prezime)s  WHERE id=%(id)s", data)
    db.commit()
    return flask.jsonify({'status': 'ok'}), 200


@profesori_blueprint.route("/profesori", methods=["POST"])
def dodaj_profesora():
    data = flask.request.json
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute(
        "INSERT INTO profesor(id, ime, prezime) VALUES(%(id)s, %(ime)s, %(prezime)s)", data)
    db.commit()
    return flask.jsonify({"status": "Resource created."}), 204