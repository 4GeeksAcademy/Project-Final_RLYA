"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Profesional,Consulta,Oficio,Tipo_consulta
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def loginUser():
    userInfo = request.json

    userExist = User.query.filter_by(email=userInfo["email"]).first()

    if userExist == None:
        # AHora buscaremos el usuario pero en el modulo de profesional
        profExist = Profesional.query.filter_by(email=userInfo["email"]).first()
        if profExist == None:
            return jsonify({"msg":"No hay un usario con ese correo","ok":False}),400
        profF = profExist.serialize()
        if userInfo["email"] == profF["email"] and userInfo["password"] == profF["password"]:
            oficioProf = Oficio.query.filter_by(id=profF["id_oficio"]).first()
            oficioS = oficioProf.serialize()
            token = create_access_token(identity=profF["email"])
            
            return jsonify({"ok":True,"msg":"Login correcto","dataProf":{
                "id": profF["id"],
                "name": profF["name"],
                "last_name": profF["last_name"],
                "age": profF["age"],
                "birth_date": profF["birth_date"],
                "registration_date": profF["registration_date"],
                "photo": profF["photo"],
                "description": profF["descripcion"],
                "oficio":oficioS["name"],
                "email":profF["email"],
                "token":token
            }}),200
        return jsonify({"ok":False,"msg":"error en las credenciales"}),400
        

    userF = userExist.serialize()
    if userInfo["email"] == userF["email"] and userInfo["password"] == userF["password"]:
            token = create_access_token(identity=userF["email"])
            response_body = {
            "ok":True,
            "msg": "Login correcto",
            "dataUser": {
                "id": userF["id"],
                "name": userF["name"],
                "last_name": userF["last_name"],
                "age": userF["age"],
                "birth_date": userF["birth_date"],
                "registration_date": userF["registration_date"],
                "email":userF["email"],
                "token":token
             }
            }
            return jsonify(response_body), 200
    return jsonify({"ok":False,"msg":"error en las credenciales"}),400

# End-point registro de usuario
@api.route('/registro', methods=['POST'])
def creacion_de_registro():

    response_body = {
        "message": "ok"
    }

    return jsonify(response_body), 200