"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app

from api.models import db, User, Profesional, Consulta, Oficio, Tipo_consulta, Favoritoss, Plan, Pagos

from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from datetime import datetime, timedelta
# from ..app import bcrypt
import pytz
import mercadopago
sdk = mercadopago.SDK(
    "TEST-4422592801019195-092415-a39725f0a1f9404df90fd178847704b5-304755483")

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
        profExist = Profesional.query.filter_by(
            email=userInfo["email"]).first()
        if profExist == None:
            return jsonify({"msg": "No hay un usuario con ese correo", "ok": False}), 400
        profF = profExist.serialize()
        if userInfo["email"] == profF["email"]:
            # Verificar la contraseña para el profesional
            check = current_app.bcrypt.check_password_hash(
                profF["password"], userInfo["password"])
            if check == True:
                oficioProf = Oficio.query.filter_by(
                    id=profF["id_oficio"]).first()
                oficioS = oficioProf.serialize()
                tipos_consulta = Tipo_consulta.query.filter_by(
                    id_oficio=profF["id_oficio"], id_profesional=profF["id"]).all()
                token = create_access_token(identity=profF["email"])
                tipos_consulta_serializada = list(
                    map(lambda item: item.serialize(), tipos_consulta))
                return jsonify({"ok": True, "msg": "Login correcto", "dataProf": {
                    "id": profF["id"],
                    "name": profF["name"],
                    "last_name": profF["last_name"],
                    "age": profF["age"],
                    "registration_date": profF["registration_date"],
                    "photo": profF["photo"],
                    "description": profF["descripcion"],
                    "oficio": oficioS,
                    "email": profF["email"],
                    "token": token,
                    "rol": "admin",
                    "tipos_consulta": tipos_consulta_serializada
                }}), 200
            return jsonify({"ok": False, "msg": "error en las credenciales"}), 400

    userF = userExist.serialize()
    if userInfo["email"] == userF["email"]:
        # Verificar la contraseña para el usuario
        chek = current_app.bcrypt.check_password_hash(
            userF["password"], userInfo["password"])
        if chek == True:
            token = create_access_token(identity=userF["email"])
            response_body = {
                "ok": True,
                "msg": "Login correcto",
                "dataUser": {
                    "id": userF["id"],
                    "name": userF["name"],
                    "last_name": userF["last_name"],
                    "age": userF["age"],
                    "photo": userF["photo"],
                    "registration_date": userF["registration_date"],
                    "email": userF["email"],
                    "token": token,
                    "rol": "user"
                }
            }
            return jsonify(response_body), 200
        return jsonify({"ok": False, "msg": "error en las credenciales"}), 400
    return jsonify({"ok": False, "msg": "No hay usuario con ese correo"}), 400

# Función para verificar los requisitos de contraseña segura


def is_password_secure(password):
    # Requerimientos
    return len(password) >= 8 and any(c.isupper() for c in password) and any(c.islower() for c in password) and any(c.isdigit() for c in password)

# End-point registro de usuario


@api.route('/registro', methods=['POST'])
def creacion_de_registro():
    request_body = request.json
    email = request_body["email"]
    print(email)
    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        response_body = {
            "message": "El usuario ya existe",
            "ok": False
        }
        return jsonify(response_body), 400

# Verificar que la contraseña cumple con los requisitos

    # password = request_body["password"]
    # if not is_password_secure(password):
    #     response_body = {
    #         "message": "La contraseña no cumple con los requisitos",
    #         "ok": False
    #     }
    #     return jsonify(response_body), 400

# Encripta la contraseña antes de guardarla

    password = request_body["password"]
    hashed_password = current_app.bcrypt.generate_password_hash(
        password).decode('utf-8')

    nuevo_usuario = User(name=request_body["name"],
                         last_name=request_body["last_name"],
                         age=request_body["age"],
                         email=request_body["email"],
                         photo=request_body["photo"],
                         password=hashed_password,
                         registration_date=request_body["registration_date"])
    db.session.add(nuevo_usuario)
    db.session.commit()

    response_body = {
        "message": "Usuario correctamente registrado",
        "ok": True
    }

    return jsonify(response_body), 200

    # End-point registro de profesional


@api.route('/editarperfil/<int:user_id>', methods=['PUT'])
def editar_perfil(user_id):
    user = User.query.get(user_id)
    request_body = request.json
    # email = request_body["email"]
    # print(email)
    # Verificar si el usuario ya existe
    print(request_body)
    if not user:
        response_body = {
            "message": "Usuario no encontrado",
            "ok": False
        }
        return jsonify(response_body), 404

    if "name" in request_body:
        user.name = request_body["name"],
    if "last_name" in request_body:
        user.last_name = request_body["last_name"],
    if "age" in request_body:
        user.age = request_body["age"],
    if "photo" in request_body:
        user.photo = request_body["photo"],

    db.session.add(user)
    db.session.commit()

    response_body = {
        "infouser": user.serialize(),
        "message": "Perfil de usuario modificado correctamente",
        "ok": True
    }
    print(user)
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

# Encripta la contraseña antes de guardarla

    password = request_body["password"]
    hashed_password = current_app.bcrypt.generate_password_hash(
        password).decode('utf-8')

    nuevo_prof = Profesional(name=request_body["name"],
                             last_name=request_body["last_name"],
                             age=request_body["age"],
                             email=request_body["email"],
                             password=hashed_password,
                             photo=request_body["photo"],
                             descripcion=request_body["descripcion"],
                             id_oficio=request_body["id_oficio"],
                             registration_date=request_body["registration_date"])
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

 # Api para crear una consulta a un admin


@api.route('/consulta', methods=['POST'])
def crearConsulta():
    dataConsulta = request.json

    if "id_user" in dataConsulta and "id_profesional" in dataConsulta and "id_tipo_consulta" in dataConsulta and "realization_date" in dataConsulta and "consultation_date" in dataConsulta and "nota" in dataConsulta:
        # validamos que el user, el profesional y el tipo de consulta existan
        userExist = User.query.filter_by(id=dataConsulta["id_user"]).first()
        profExist = Profesional.query.filter_by(
            id=dataConsulta["id_profesional"]).first()
        Tipo_consulta_exist = Tipo_consulta.query.filter_by(
            id=dataConsulta["id_tipo_consulta"]).first()

        if userExist == None:
            return jsonify({"ok": False, "msg": "Error,el usuario no existe"}), 400
        if profExist == None:
            return jsonify({"ok": False, "msg": "Error,el Profesional no existe"}), 400
        if Tipo_consulta_exist == None:
            return jsonify({"ok": False, "msg": "Error,el tipo de consulta no existe"}), 400

        # pasamos a crear nuestra nueva consulta
        consulta = Consulta(**dataConsulta)

        db.session.add(consulta)
        db.session.commit()
        return jsonify({"ok": True, "msg": "Consulta agendada correctamente"}), 200
    return jsonify({"ok": False, "msg": "Error, debe de ingresar los datos correctamente"}), 400

# Api para traer consultas de un admin


@api.route('/consultaProf/<int:id_prof>', methods=['GET'])
def traerConsultasAdmin(id_prof):
    # Validamos que el prof exista
    profExist = Profesional.query.filter_by(id=id_prof).first()
    if profExist == None:
        return jsonify({"ok": False, "msg": "Error,el Profesional no existe"}), 400
    # ahora traeremos todas las consultas de ese usuario

    consultas_Admin = Consulta.query.filter_by(id_profesional=id_prof).all()
    print(consultas_Admin)
    if len(consultas_Admin) == 0:
        return jsonify({"ok": False, "msg": "Este usuario no tiene ninguna consulta"}), 200
    # serializamos cada consulta que hayan en nuestro array
    result = list(map(lambda item: item.serialize(), consultas_Admin))

    # ahora por ultimo cargamos los nombres del usuario, profesional y el tipo de consulta, definiendo una funcion para llamar en el map
    def cargarDatos(item):

        user = User.query.filter_by(id=item["id_user"]).first().serialize()
        prof = Profesional.query.filter_by(
            id=item["id_profesional"]).first().serialize()
        tpo_consulta = Tipo_consulta.query.filter_by(
            id=item["id_tipo_consulta"]).first().serialize()
        # ahora en base al tipo de consulta y duracion, retornaremos una nueva prop que tenga cuando finalizaria
        float_a_str = str(tpo_consulta["duracion"])
        partes_array = float_a_str.split(".")
        # aqui obtengo la hora y minutos de un flotante
        horas = partes_array[0]
        minutos = partes_array[1] if len(partes_array) > 1 else 0

        # obtengo la hora de inicio para sumarle horas(en este caso viene en formato dateTime)
        hora_extract = item["consultation_date"]

        # aqui lo que hacemos es pasar la hora a un string para añadirle la zona horaria
        strhora = str(hora_extract) + " GMT-0300"
        mi_fecha = datetime.strptime(strhora, '%Y-%m-%d %H:%M:%S %Z%z')

        delta_time = timedelta(hours=int(horas), minutes=int(minutos))
        # aqui suma la base de la hora que ya tenia mas el delta_time que creamos recien con formato solo horas y minutos
        end_date = mi_fecha + delta_time

        item["consultation_date"] = mi_fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        item["userInfo"] = {
            "nombre": user["name"],
            "id": user["id"]
        }
        item["id_profesional"] = prof["name"]
        item["id_tipo_consulta"] = tpo_consulta["nombre"]
        item["duracion"] = tpo_consulta["duracion"]
        item["end_date"] = end_date.strftime('%Y-%m-%d %H:%M:%S %Z%z')
        return item
    resultFinal = list(map(lambda item: cargarDatos(item), result))
    return jsonify({"ok": True, "consultas_prof": resultFinal}), 200

# Api para traer info de un user en base al token


@api.route('/infobyToken', methods=['GET'])
@jwt_required()
def infoByToken():
    indentyToken = get_jwt_identity()
    print(indentyToken)
    print("xddd")
    userExist = User.query.filter_by(email=indentyToken).first()
    if userExist == None:
        # AHora buscaremos el usuario pero en el modulo de profesional

        profesional_exist = Profesional.query.filter_by(
            email=indentyToken).first().serialize()
        oficioProf = Oficio.query.filter_by(
            id=profesional_exist["id_oficio"]).first()
        oficioS = oficioProf.serialize()
        # Ahora cargaremos los tipos de consulta en la info del user
        tipos_consulta = Tipo_consulta.query.filter_by(
            id_oficio=profesional_exist["id_oficio"], id_profesional=profesional_exist["id"]).all()
        tipos_consulta_serializada = list(
            map(lambda item: item.serialize(), tipos_consulta))
        print(tipos_consulta_serializada)
        return jsonify({"ok": True, "info": {
            "id": profesional_exist["id"],
            "name": profesional_exist["name"],
            "last_name": profesional_exist["last_name"],
            "age": profesional_exist["age"],
            "registration_date": profesional_exist["registration_date"],
            "photo": profesional_exist["photo"],
            "description": profesional_exist["descripcion"],
            "oficio": oficioS,
            "email": profesional_exist["email"],
            "rol": "admin",
            "tipos_consulta": tipos_consulta_serializada
        }}), 200
    userF = userExist.serialize()
    return jsonify({"ok": True, "info": {
        "id": userF["id"],
        "name": userF["name"],
        "last_name": userF["last_name"],
        "age": userF["age"],
        "photo": userF["photo"],
        "registration_date": userF["registration_date"],
        "email": userF["email"],
        "rol": "user"
    }}), 200

# Api para traer los tipos de consulta


@api.route("/tipo_consultas/<int:id_of>", methods=["POST"])
def Cargar_Tipo_Consultas(id_of):
    body = request.json
    id_user = body["id_user"]
    tipos_consulta = Tipo_consulta.query.filter_by(
        id_oficio=id_of, id_profesional=id_user).all()
    # Ahora tengo que filtrar las que sean del usuario que yo quiera

    if len(tipos_consulta) == 0:
        jsonify({"ok": False, "msg": "No hay tipos de consulta"}), 400
    tipos_consulta_serializada = list(
        map(lambda item: item.serialize(), tipos_consulta))
    return jsonify({"ok": True, "tipo_consultas": tipos_consulta_serializada})


@api.route("/oficio_prof/<int:id_prof>", methods=["GET"])
def Traer_oficio_prof(id_prof):

    prof = Profesional.query.filter_by(id=id_prof).first()
    print(prof)
    if prof == None:
        return jsonify({"ok": False, "msg": "Este profesional no existe"}), 400
    profS = prof.serialize()
    # ahora cargaremos su oficio
    oficio_prof = Oficio.query.filter_by(id=profS["id_oficio"]).first()
    if oficio_prof == None:
        return jsonify({"ok": False, "msg": "Este usuario no tiene ningun oficio"})
    oficio_profS = oficio_prof.serialize()
    return jsonify({"ok": True, "oficio_prof": oficio_profS})


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
    if len(info_prof) == 0:
        return jsonify({"error": "El profesional no se encontró"}), 404
    else:
        def cargarOficioYconsultas(item):
            itemfinal = item.serialize()
            print(item)
            oficio = Oficio.query.filter_by(id=itemfinal["id_oficio"]).first()
            oficiofinal = oficio.serialize()
            itemfinal["id_oficio"] = oficiofinal
            # Ahora cargaremos las consultas
            id_prof = itemfinal["id"]
            tp_c = Tipo_consulta.query.filter_by(id_profesional=id_prof).all()
            if len(tp_c) == 0:
                itemfinal["tipos_consulta"] = []
            else:
                lsF = list(map(lambda item: item.serialize(), tp_c))
                itemfinal["tipos_consulta"] = lsF
            # Ahora cargaremos el plan que tiene en base al pago que realizo
            pago = Pagos.query.filter_by(id_profesional=id_prof).first()
            if pago == None:
                itemfinal["plan"] = ""
            else:
                pagoF = pago.serialize()
                # Traemos el plan
                plan = Plan.query.filter_by(id=pagoF["id_plan"]).first()
                planF = plan.serialize()
                itemfinal["plan"] = planF["name"]
            return itemfinal
        listfinal = list(
            map(lambda item: cargarOficioYconsultas(item), info_prof))
        return jsonify({"info": listfinal}), 200

# Api para obtener oficios


@api.route("/oficios", methods=["GET"])
def cargar_oficios():
    oficios = Oficio.query.all()
    if len(oficios) > 0:
        ofFinal = list(map(lambda item: item.serialize(), oficios))
        return jsonify({"ok": True, "oficios": ofFinal}), 200
    return jsonify({"ok": False, "msg": "No hay oficios"}), 400


# Api para crear un tipo de consulta en base a un oficio
@api.route("/tipo_consulta", methods=["POST"])
def new_tipo_consulta():
    body = request.json
    print(body)
    print("XDDDDDDDDD")
    tipo_consultaNew = Tipo_consulta(
        id_oficio=body["id_oficio"],
        id_profesional=body["id_profesional"],
        nombre=body["nombre"],
        descripcion=body["descripcion"],
        duracion=body["duracion"]
    )
    db.session.add(tipo_consultaNew)
    db.session.commit()
    return jsonify({"ok": True, "msg": "Se creo el tipo de consulta correctamente"}), 200

# Api para actualizar un tipo de consulta


@api.route("/tipo_consulta/<int:id_tp_c>", methods=["PUT"])
def edit_tipo_consulta(id_tp_c):
    body = request.json
    print(body)
    tipo_consulta = Tipo_consulta.query.filter_by(id=id_tp_c).first()

    if tipo_consulta == None:
        return jsonify({"ok": False, "msg": "Error, no hay un tipo de consulta con este id"}, 400)
    tipo_consulta.id_oficio = body["id_oficio"]
    tipo_consulta.id_profesional = body["id_profesional"]
    tipo_consulta.nombre = body["nombre"]
    tipo_consulta.descripcion = body["descripcion"]
    tipo_consulta.duracion = body["duracion"]

    db.session.commit()
    return jsonify({"ok": True, "msg": "Se Actualizo el tipo de consulta correctamente"}), 200

# Api para borrar un tipo de consulta


@api.route("/tipo_consulta/<int:id_tp_c>", methods=["DELETE"])
def delete_tipo_consulta(id_tp_c):

    tipo_consulta = Tipo_consulta.query.filter_by(id=id_tp_c).first()

    if tipo_consulta == None:
        return jsonify({"ok": False, "msg": "Error, no hay un tipo de consulta con este id"}, 400)

    consultasDelete = Consulta.query.filter_by(id_tipo_consulta=id_tp_c).all()
    # Tambien debemos de borrar todas las consultas que tengan este tipo de consulta
    list(map(lambda item: db.session.delete(item), consultasDelete))
    db.session.delete(tipo_consulta)
    db.session.commit()
    return jsonify({"ok": True, "msg": "Se elimino el tipo de consulta correctamente"}), 200
# Traer todas las consultas de un usuario


@api.route("/consultas/user/<int:idUser>", methods=["GET"])
def Traer_Consultas_user(idUser):

    # Traemos las consultas de un usuario
    consult_user = Consulta.query.filter_by(id_user=idUser).all()
    if len(consult_user) == 0:
        return jsonify({"ok": False, "msg": "Este usuario no tiene ninguna consulta"}), 400
    consult_userS = list(map(lambda item: item.serialize(), consult_user))
    # Ahora lo mapeamos de nuevo para traer la data que nos interesa

    def DataFilter(item):

        id_user = item["id_user"]
        id_prof = item["id_profesional"]
        id_tipo_consulta = item["id_tipo_consulta"]
        # user

        user = User.query.filter_by(id=id_user).first()
        prof = Profesional.query.filter_by(id=id_prof).first()
        tipo_consulta = Tipo_consulta.query.filter_by(
            id=id_tipo_consulta).first()
        userF = user.serialize()
        profF = prof.serialize()
        tipo_consultaF = tipo_consulta.serialize()
        print(tipo_consultaF)
        oficio = Oficio.query.filter_by(id=tipo_consultaF["id_oficio"]).first()

        oficioF = oficio.serialize()
        # Pasamos las fechas a nuestra zona horaria
        hora_extract = item["consultation_date"]
        strhora = str(hora_extract) + " GMT-0300"
        mi_fecha = datetime.strptime(strhora, '%Y-%m-%d %H:%M:%S %Z%z')

        return {
            "id": item["id"],
            "realization_date": item["realization_date"],
            "consultation_date": mi_fecha.strftime('%Y-%m-%d %H:%M:%S %Z%z'),
            "nota": item["nota"],
            "profesional": profF["name"] + " " + profF["last_name"],
            "oficio": oficioF["name"],
            "consulta": tipo_consultaF["nombre"],
            "photoProf": profF["photo"]
        }
    dataFinal = list(map(lambda item: DataFilter(item), consult_userS))
    return jsonify({"ok": True, "data": dataFinal}), 200

# #
# @api.route("/favoritos/<int:user_id>'", methods=["PUT"])
# def ag_fav(user_id):
#     body = request.json
#     print(body)
#     fav = Favoritoss.query.filter_by(id=user_id).first()
#     prof = Profesional.query.filter_by(id=fav[""]).first()

#     if fav == None:
#         return jsonify({"ok": False, "msg": "no hay favoritos"}, 400,


#    db.session.commit()
#     return jsonify({"ok": True, "msg": "Se Actualizo el tipo de consulta correctamente"}), 200


@api.route("/favoritos/prof", methods=["POST"])
def ag_fav():
    # obtiene el body que mando desde posman
    request_body = request.get_json(force=True)

    # filtra por el id especificado para ver si el id ya existe
    user_query = User.query.filter_by(id=request_body["id_user"]).first()
    if user_query is None:  # si el id no aparece el usuario no esta rigistrado
        return jsonify({"msg": "no esta registrado"}), 404

    # preguntar para que es esa parte

        # user_id de la tabla #request body lo que viene del body de posman
    # filtra, no deja pasar los que no coinciden, trae los que coinciden los velores de user_id de la tabla favoritos con lo que pongo en el body
    fav = Favoritoss.query.filter_by(id_user=request_body["id_user"]).filter_by(
        id_prof=request_body["id_prof"]).first()
    # busca un usuario con esa id si hay, chequear si tiene ese id del prof
    # el fav recorre todos los favoritos del user_id
    if fav:
        # retorna q ya se habia agregado
        return jsonify({"msg": "ya esta agregado este favorito"}), 404

    new_prof_fav = Favoritoss(
        id_user=request_body["id_user"], id_prof=request_body["id_prof"])
    db.session.add(new_prof_fav)
    db.session.commit()
    return jsonify({"ok": True, "msg": "favorito agregado"}), 200


@api.route("/user/favoritos/<int:idUser>", methods=["GET"])
def Traer_favoritos(idUser):
    # Traemos
    fav_user = Favoritoss.query.filter_by(id_user=idUser).all()
    if len(fav_user) == 0:
        return jsonify({"ok": False, "msg": "no hay favoritos"}), 400
    fav_userF = list(map(lambda item: item.serialize(), fav_user))
    print(fav_userF)

    def cargardatos(itemfinal):

        new_prof_fav = Profesional.query.filter_by(
            id=itemfinal["id_prof"]).first()
        prof_final = new_prof_fav.serialize()
        return prof_final
    result = list(map(lambda item: cargardatos(item), fav_userF))
    # Ahora lo mapeamos de nuevo para traer la data que nos interesa

    return jsonify({"ok": True, "data": result}), 200


# borrar prof como favorito
@api.route("/user/favoritos", methods=['DELETE'])
# se ejecuta una funcion con el parametro que es el id de planeta
def borrar_favorito_prof():
    request_body = request.get_json(force=True)
    fav = Favoritoss.query.filter_by(
        id_user=request_body["id_user"], id_prof=request_body["id_prof"]).first()
    # obtiene el body que mando desde posman
    if fav is not None:
        db.session.delete(fav)
        db.session.commit()

        request_body = {
            "msg": "se borro",
        }
        return jsonify(request_body), 200,

    # (porpiedad de la tabla = request body que es lo que agregue en el body)
    if len(fav == 0):
        return jsonify({"msg": "no hay favoritos"}), 404


@api.route("/pagos", methods=["POST"])
def CrearPago():
    request_body = request.json

    # Fijarme que el usaurio no tenga ningun otro pago
    pagoExist = Pagos.query.filter_by(
        id_profesional=request_body["id_profesional"]).first()

    if pagoExist != None:
        return jsonify({"ok": False, "msg": "Error, ya tienes un pago"}), 200

    if "id_profesional" in request_body and "id_plan" in request_body:
        # Traemos la info del plan que ingreso para saver la duracion
        infoPlan = Plan.query.filter_by(id=request_body["id_plan"]).first()
        if infoPlan == None:
            return jsonify({"ok": False, "msg": "No existe este plan"}), 400
        infoPlanS = infoPlan.serialize()

        zonahoraria = pytz.timezone('Etc/GMT+3')
        fechaRealizacion = datetime.now(zonahoraria)

        duracion = infoPlanS["duration_in_months"]
        duracionFinal = fechaRealizacion + timedelta(days=30)

        fecha_realizacion_str = fechaRealizacion.strftime(
            '%Y-%m-%d %H:%M:%S %Z%z').replace('-03-0300', '-03:00')
        duracion_final_str = duracionFinal.strftime(
            '%Y-%m-%d %H:%M:%S %Z%z').replace('-03-0300', '-03:00')

        newPago = Pagos(id_profesional=request_body["id_profesional"], realization_date=fecha_realizacion_str,
                        end_date=duracion_final_str, id_plan=request_body["id_plan"])
        db.session.add(newPago)
        db.session.commit()
        return jsonify({"ok": True, "msg": "Pago creado correctamente"}), 200
    return jsonify({"ok": False, "msg": "Faltan datos"}), 400

# Api para obtener todos los planes


@api.route("/planes", methods=["GET"])
def Obtener_Planes():
    planes = Plan.query.all()
    if len(planes) == 0:
        return jsonify({"ok": False, "msg": "No hay planes"}), 400
    planesF = list(map(lambda item: item.serialize(), planes))
    return jsonify({"ok": True, "planes": planesF}), 200

# API para validar si se vencio o no la suscripcion de un profesional


@api.route("/validSuscripcion/<int:id_prof>", methods=["GET"])
def ValidSuscription(id_prof):

    # Traemos su pago
    prof = Profesional.query.filter_by(id=id_prof).first()
    Pago = Pagos.query.filter_by(id_profesional=id_prof).first()
    profF = prof.serialize()
    if Pago == None:
        return jsonify({"ok": False, "msg": "Este usuario no tiene ningun pago", "emailAccess": profF["email"]}), 401
    PagoF = Pago.serialize()
    # Ahora validamos que la fecha de hoy este
    fecha_hoy = datetime.now()
    realizacion = PagoF["realization_date"]
    finalizacion = PagoF["end_date"]
    if fecha_hoy < finalizacion and fecha_hoy > realizacion:
        return jsonify({"ok": True, "statusValid": "valid"}), 200
    db.session.delete(Pago)
    db.session.commit()
    return jsonify({"ok": False, "statusValid": "expired", "emailAccess": profF["email"]}), 401

# Api para cargar el id del usuario en base al email


@api.route("/idByEmail", methods=["POST"])
def idByEmail():

    body = request.json
    print(body)
    user = Profesional.query.filter_by(email=body["email"]).first()
    if user == None:
        return jsonify({"ok": False, "msg": "No hay usuario"}), 400
    userF = user.serialize()
    print("Xddddddddd")
    return jsonify({"ok": True, "id_user": userF["id"]})


@api.route("/preference", methods=["POST"])
def preference():
    body = request.json  # aca trae la info

    total = body["total"]
    email = body["email"]
    # acá vamos a poner más líneas de código
    # Crea un ítem en la preferencia
    preference_data = {
        "items": [{
            "title": "CalendApp",
            "quantity": 1,
            "unit_price": total,
        }],
        "payer": {
            "email": email
        },
        "back_urls": {
            "success": "https://sample-service-name-wf0j.onrender.com/pay_success",
            "failure": "https://sample-service-name-wf0j.onrender.com/pay_failure",
            "pending": "https://sample-service-name-wf0j.onrender.com/pay_pending"
        },
        "auto_return": "approved"
    }
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return preference, 200
