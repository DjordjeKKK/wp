import flask
import datetime
from flask import Flask
from flask import request
from flask import session

from utils.db import mysql

from blueprints.ocene.ocene import ocene_blueprint
from blueprints.predmeti.predmeti import predmeti_blueprint
from blueprints.studenti.studenti import studenti_blueprint
from blueprints.zadaci.zadaci import zadaci_blueprint
from blueprints.simple_login import simple_login
from blueprints.profersori.profesori import profesori_blueprint



app = Flask(__name__, static_url_path="")


app.config["MYSQL_DATABASE_USER"] = "root" 
app.config["MYSQL_DATABASE_PASSWORD"] = "root" 
app.config["MYSQL_DATABASE_DB"] = "testovi" 
app.config["MYSQL_DATABASE_SOCKET"] = None

mysql.init_app(app) 

app.register_blueprint(profesori_blueprint, url_prefix="/api")
app.register_blueprint(predmeti_blueprint, url_prefix="/api")
app.register_blueprint(studenti_blueprint, url_prefix="/api")
app.register_blueprint(zadaci_blueprint, url_prefix="/api")
app.register_blueprint(ocene_blueprint, url_prefix="/api")
app.register_blueprint(simple_login)



@app.route("/")
@app.route("/index")
def index_page():
    
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run("0.0.0.0", 5000, threaded=True)
