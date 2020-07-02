import flask
from flask.blueprints import Blueprint
from utils.db import mysql


ocene_blueprint = Blueprint('ocene_blueprint', __name__)

# APPLICATION PROGRAMMING INTERFACE
@ocene_blueprint.route("/ocene", methods=['GET'])
def dobavi_ocene():
    cursor = mysql.get_db().cursor()
    cursor.execute('SELECT * FROM ocena')
    ocene = cursor.fetchall()
    return flask.jsonify(ocene), 200

@ocene_blueprint.route("/ocene", methods=["POST"])
def dodaj_ocenu():
    data = flask.request.json
    db = mysql.get_db()
    cursor = db.cursor()
    print(flask.request.json)
    cursor.execute(
        "INSERT INTO ocena(student_id,zadatak_id,ocena, datum_ocene) VALUES(%(student_id)s, %(zadatak_id)s, %(ocena)s, %(datum_ocene)s)", data)
    db.commit()
    return flask.jsonify({"status": "Resource created."}), 204


# @ocene_blueprint.route("/ocene/<int:id_predmeta>", methods=['GET'])
# def dobavi_predmet(id_predmeta):
#     cursor = mysql.get_db().cursor()
#     cursor.execute('SELECT * FROM predmet WHERE id= %s', (id_predmeta))
#     predmet = cursor.fetchone()
#     return flask.jsonify(predmet), 200


# @ocene_blueprint.route("/ocene/<int:id_predmeta>", methods=['DELETE'])
# def obrisi_predmet(id_predmeta):
#     db = mysql.get_db()
#     cursor = mysql.get_db().cursor()
#     cursor.execute('DELETE FROM predmet WHERE id= %s', (id_predmeta))
#     db.commit()
#     return flask.jsonify({'status': 'ok'}), 204


# @ocene_blueprint.route("/ocene/<int:id_predmeta>", methods=['PUT'])
# def izmeni_predmet(id_predmeta):
#     data = flask.request.get_json()
#     data["id"] = id_predmeta
#     print(data)
#     db = mysql.get_db()
#     cursor = mysql.get_db().cursor()
#     cursor.execute(
#         "UPDATE predmet SET naziv= %(naziv)s, skracenica= %(skracenica)s WHERE id=%(id)s", data)
#     db.commit()
#     return flask.jsonify({'status': 'ok'}), 200


