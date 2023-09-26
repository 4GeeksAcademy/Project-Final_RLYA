from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    photo = db.Column(db.String(200), nullable=True)
    registration_date = db.Column(db.DateTime, unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(1000), nullable=False)

    # relacion
    prof = db.relationship('Consulta', backref='user', lazy=True)
    favoritos = db.relationship('Favoritoss', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "age": self.age,
            "photo": self.photo,
            "registration_date": self.registration_date,
            "email": self.email,
            "password": self.password
            # do not serialize the password, its a security breach
        }


class Profesional(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    registration_date = db.Column(db.DateTime, unique=True, nullable=False)
    photo = db.Column(db.String(200), nullable=True)
    descripcion = db.Column(db.String(500), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    id_oficio = db.Column(db.Integer, db.ForeignKey(
        'oficio.id'), nullable=False)

    # relacion
    consulta = db.relationship('Consulta', backref='profesional', lazy=True)
    favoritos = db.relationship('Favoritoss', backref='profesional', lazy=True)

    def __repr__(self):
        return f'<Profesional {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "age": self.age,
            "registration_date": self.registration_date,
            "photo": self.photo,
            "descripcion": self.descripcion,
            "email": self.email,
            "password": self.password,
            "id_oficio": self.id_oficio

        }


class Tipo_consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_profesional = db.Column(db.Integer, db.ForeignKey(
        'profesional.id'), nullable=False)
    id_oficio = db.Column(db.Integer, db.ForeignKey(
        'oficio.id'), nullable=False)
    nombre = db.Column(db.String(120), nullable=False)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)
    duracion = db.Column(db.Float, unique=False, nullable=False)

    # relacion
    consulta = db.relationship('Consulta', backref='tipo_consulta', lazy=True)

    def __repr__(self):
        return f'<Tipo_consulta {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_oficio": self.id_oficio,
            "id_profesional": self.id_profesional,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "duracion": self.duracion
            # do not serialize the password, its a security breach
        }


class Oficio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    # relaciones
    prof = db.relationship('Profesional', backref='oficio', lazy=True)
    tipo_consulta = db.relationship(
        'Tipo_consulta', backref='oficio', lazy=True)

    def __repr__(self):
        return f'<Oficio {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            # do not serialize the password, its a security breach
        }


class Consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    id_profesional = db.Column(db.Integer, db.ForeignKey(
        'profesional.id'), nullable=False)
    id_tipo_consulta = db.Column(db.Integer, db.ForeignKey(
        'tipo_consulta.id'), nullable=False)
    realization_date = db.Column(db.DateTime, nullable=False)
    consultation_date = db.Column(db.DateTime, nullable=False)
    nota = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<Consulta {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_profesional": self.id_profesional,
            "id_tipo_consulta": self.id_tipo_consulta,
            "realization_date": self.realization_date,
            "consultation_date": self.consultation_date,
            "nota": self.nota
            # do not serialize the password, its a security breach
        }


class Favoritoss(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    id_user = db.Column(db.Integer, db.ForeignKey(
        'user.id'), nullable=False)
    id_prof = db.Column(db.Integer, db.ForeignKey(
        'profesional.id'), nullable=False)

    def __repr__(self):
        return f'<Favoritoss {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "id_user": self.id_user,
            "id_prof": self.id_prof,


        }
