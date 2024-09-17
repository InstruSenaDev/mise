from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager    
import bcrypt


class Empresas(models.Model):
    nit = models.IntegerField(db_column='NIT', primary_key=True)  # Field name made lowercase.
    nombre_empresa = models.TextField()
    celular = models.BigIntegerField()
    razon_social = models.TextField()
    direccion = models.TextField()
    act_economica = models.TextField()
    gerente = models.TextField()
    producto_servicio = models.TextField(db_column='producto/servicio')  # Field renamed to remove unsuitable characters.
    correo = models.TextField()
    pagina_web = models.TextField()
    fecha_creacion = models.DateField()
    ventas_ult_ano = models.BigIntegerField()
    costos_ult_ano = models.BigIntegerField()
    empleados_perm = models.BigIntegerField()
    sector = models.TextField()
    estado = models.IntegerField()
    diagnostico_value = models.IntegerField()
    id_programa = models.ForeignKey('Programas', models.DO_NOTHING, db_column='id_programa')
    id_postulante = models.ForeignKey('Postulante', models.DO_NOTHING, db_column='id_postulante')

    class Meta:
        managed = False
        db_table = 'empresas'



class Postulante(models.Model):
    id_postulante = models.AutoField(primary_key=True)
    nombres_postulante = models.TextField()
    apellidos_postulante = models.TextField()
    celular = models.BigIntegerField()
    genero = models.TextField()
    correo = models.TextField()
    municipio = models.TextField()
    no_documento = models.BigIntegerField()
    tipo_documento = models.TextField()
    educacion = models.TextField()
    cargo = models.TextField()
    id_rol = models.ForeignKey('Rol', models.DO_NOTHING, db_column='id_rol')

    class Meta:
        managed = False
        db_table = 'postulante'





class MisePrueba(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    done = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mise_prueba'


class Modulos(models.Model):
    id_modulo = models.IntegerField(primary_key=True)
    nombre = models.TextField()
    objetivo = models.TextField()
    observaciones = models.TextField()
    alcance = models.TextField()
    estado_actual = models.TextField()
    nivel_ideal = models.TextField()

    class Meta:
        managed = False
        db_table = 'modulos'



class Preguntas(models.Model):
    id_pregunta = models.IntegerField(primary_key=True)
    descripcion = models.TextField()
    criterio = models.TextField()
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'preguntas'


class Programas(models.Model):
    id_programa = models.IntegerField(primary_key=True)
    nombre_programa = models.TextField()
    descripcion = models.TextField()
    id_director = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'programas'


class Registros(models.Model):
    id_registro = models.IntegerField(primary_key=True)
    hora = models.IntegerField()
    fecha = models.DateField()
    comentarios = models.TextField()
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'registros'


class Rol(models.Model):
    id_rol = models.IntegerField(primary_key=True)
    descripcion = models.TextField()

    class Meta:
        managed = False
        db_table = 'rol'


class Suenos(models.Model):
    id_sueno = models.IntegerField(primary_key=True)
    nombre_sueno = models.TextField()
    contenido = models.TextField()
    alcance = models.TextField()
    nit = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='NIT')  # Field name made lowercase.
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'suenos'

class Talleres(models.Model):
    id_taller = models.IntegerField(primary_key=True)
    nombre_taller = models.TextField()
    criterio = models.TextField()
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'talleres'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol')
    estado = models.TextField()
    correo = models.TextField()
    celular = models.BigIntegerField()
    documento = models.BigIntegerField()
    programa = models.TextField()
    contrasena = models.TextField(db_collation='utf8mb4_0900_ai_ci')
    nombres = models.TextField()
    apellidos = models.TextField()

    class Meta:
        managed = False
        db_table = 'usuario'
        
    def set_password(self, raw_password):
    #HASH DE CONTRASEÑA
        self.contrasena = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #FUNCION QUE ME PERMITE VALIDAR MI CONTRASEÑA
    def check_password(self, raw_password):        
        return bcrypt.checkpw(raw_password.encode('utf-8'), self.contrasena.encode('utf-8'))


class Autoevaluacion(models.Model):
    id_autoevaluacion = models.AutoField(primary_key=True)
    fecha = models.DateField()
    comentarios = models.TextField(blank=True, null=True)
    nit = models.ForeignKey('Empresas', models.DO_NOTHING, db_column='NIT')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'autoevaluacion'



        
class ModuloAutoevaluacion(models.Model):
    id_modulo = models.AutoField(primary_key=True)
    nombre = models.TextField()
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'modulo_autoevaluacion'

class CalificacionModulo(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    calificacion = models.IntegerField()
    comentarios = models.TextField(blank=True, null=True)
    id_autoevaluacion = models.ForeignKey(Autoevaluacion, models.DO_NOTHING, db_column='id_autoevaluacion')
    id_modulo = models.ForeignKey(ModuloAutoevaluacion, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'calificacion_modulo'

class Temas(models.Model):
    id_tema = models.IntegerField(primary_key=True)
    area = models.TextField()
    titulo = models.TextField()
    contenido = models.TextField()
    fecha = models.DateField()
    horario = models.DateField()
    ubicacion = models.TextField()

    class Meta:
        managed = False
        db_table = 'temas'
