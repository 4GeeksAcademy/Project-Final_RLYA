"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Profesional, Consulta, Oficio, Tipo_consulta
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta



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

    photoperf = User.query.filter_by(photo=userInfo["photo"]).first()

    if userExist == None:
        # AHora buscaremos el usuario pero en el modulo de profesional
        profExist = Profesional.query.filter_by(
            email=userInfo["email"]).first()
        if profExist == None:
            return jsonify({"msg": "No hay un usario con ese correo", "ok": False}), 400
        profF = profExist.serialize()
        if userInfo["email"] == profF["email"] and userInfo["password"] == profF["password"]:
            oficioProf = Oficio.query.filter_by(id=profF["id_oficio"]).first()
            oficioS = oficioProf.serialize()
            token = create_access_token(identity=profF["email"])

            return jsonify({"ok": True, "msg": "Login correcto", "dataProf": {
                "id": profF["id"],
                "name": profF["name"],
                "last_name": profF["last_name"],
                "age": profF["age"],
                "registration_date": profF["registration_date"],
                "photo": profF["photo"],
                "description": profF["descripcion"],
                "oficio": oficioS["name"],
                "email": profF["email"],
                "token": token
            }}), 200
        return jsonify({"ok": False, "msg": "error en las credenciales"}), 400

    userF = userExist.serialize()
    if userInfo["email"] == userF["email"] and userInfo["password"] == userF["password"]:
        token = create_access_token(identity=userF["email"])
        response_body = {
            "ok": True,
            "msg": "Login correcto",
            "dataUser": {
                "id": userF["id"],
                "name": userF["name"],
                "last_name": userF["last_name"],
                "age": userF["age"],
                "registration_date": userF["registration_date"],
                "email": userF["email"],
                "token": token
            }
        }
        return jsonify(response_body), 200
    return jsonify({"ok": False, "msg": "error en las credenciales"}), 400


# End-point registro de usuario


@api.route('/registro', methods=['POST'])
def creacion_de_registro():
    request_body = request.json
    print(request_body)
    email = request_body["email"]

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        response_body = {
            "message": "El usuario ya existe",
            "ok": False
        }
        return jsonify(response_body), 400

    fecha = datetime.datetime.now()
    nuevo_usuario = User(name=request_body["nombre"],
                         last_name=request_body["apellido"],
                         age=request_body["edad"],
                         email=request_body["email"],
                         password=request_body["contraseña"],
                         registration_date=fecha)
    db.session.add(nuevo_usuario)
    db.session.commit()

    response_body = {
        "message": "Usuario correctamente registrado",
        "ok": True
    }
    return jsonify(response_body), 200

    # End-point registro de profesional


@api.route('/registro_prof', methods=['POST'])
def creacion_de_registro_prof():
    request_body = request.json
    email = request_body["email"]

    # Verificar si el profesional ya existe
    existing_prof = Profesional.query.filter_by(email=email).first()
    if existing_prof:
        response_body = {
            "message": "El profesional ya existe",
            "ok": False
        }
        return jsonify(response_body), 400

    fecha = datetime.datetime.now()
    nuevo_prof = Profesional(name=request_body["nombre"],
                             last_name=request_body["apellido"],
                             age=request_body["edad"],
                             email=request_body["email"],
                             password=request_body["contraseña"],
                             registration_date=fecha,
                             photo=request_body["foto"],
                             descripcion=request_body["descripcion"],
                             id_oficio=request_body["id_oficio"])
    db.session.add(nuevo_prof)
    db.session.commit()

    response_body = {
        "message": "Profesional correctamente registrado",
        "ok": True
    }

    return jsonify(response_body), 200


@api.route('/validToken', methods=['GET'])
@jwt_required()
def ValidarToken():
    current_user = get_jwt_identity()
    return jsonify({"isLogged": True}), 200


@api.route('/listprof', methods=['GET'])
def handle_list():
    #     # if (status > 400) {
    #     #     return("error en solicitud")
    #     # }
    #     # this is how you can use the Family datastructure by calling its methods
    listp = Profesional.query.all()  # trae el class y de ahi la funcion all members
    listfinal = list(map(lambda item: item.serialize(), listp))
    print(list)
    return jsonify({"ok": True, "profesionales": listfinal}), 200




@api.route('/profesionales', methods=['GET'])
def get_single_photo():
    # Obtener el profesional por su ID
    info_prof = Profesional.query.all()

    # Si el profesional existe, devolver la foto
    if len(info_prof)==0:
        return jsonify({"error": "El profesional no se encontró"}), 404
    # Si el profesional no existe, devolver un error 404
    else:
        listfinal = list(map(lambda item: item.serialize(), info_prof))
        return jsonify({"info": listfinal}), 200