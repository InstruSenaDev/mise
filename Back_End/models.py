# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthenticationUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    email = models.CharField(unique=True, max_length=254)
    name = models.CharField(max_length=30)
    is_active = models.IntegerField()
    is_staff = models.IntegerField()
    is_superuser = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'authentication_user'


class Coordinador(models.Model):
    id_coordinador = models.IntegerField(primary_key=True)
    nombres_coordinador = models.TextField()
    apellidos_coordinador = models.TextField()
    contrase±a = models.TextField()
    correo = models.TextField()
    programa = models.TextField()
    celular = models.IntegerField()
    documento = models.IntegerField()
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')

    class Meta:
        managed = False
        db_table = 'coordinador'


class Director(models.Model):
    id_director = models.IntegerField(primary_key=True)
    nombres_director = models.TextField()
    apellidos_director = models.TextField()
    correo = models.IntegerField()
    documento = models.IntegerField()
    celular = models.IntegerField()
    contrase±a = models.TextField()
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario')

    class Meta:
        managed = False
        db_table = 'director'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Empresas(models.Model):
    nit = models.IntegerField(db_column='NIT', primary_key=True)  # Field name made lowercase.
    nombre_empresa = models.TextField()
    celular = models.IntegerField()
    razon_social = models.TextField()
    direccion = models.TextField()
    act_economica = models.TextField()
    gerente = models.TextField()
    producto_servicio = models.TextField(db_column='producto/servicio')  # Field renamed to remove unsuitable characters.
    correo = models.TextField()
    pagina_web = models.TextField()
    fecha_creacion = models.DateField()
    ventas_ult_a±o = models.IntegerField()
    costos_ult_a±o = models.IntegerField()
    empleados_perm = models.IntegerField()
    sector = models.TextField()
    estado = models.TextField()
    id_programa = models.ForeignKey('Programas', models.DO_NOTHING, db_column='id_programa')
    id_postulante = models.ForeignKey('Postulante', models.DO_NOTHING, db_column='id_postulante')

    class Meta:
        managed = False
        db_table = 'empresas'


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
    nombre_modulo = models.TextField()
    escala = models.TextField()
    descripcion = models.TextField()
    observaciones = models.TextField()
    nivel_basico = models.TextField()
    estado_actual = models.TextField()
    nivel_ideal = models.TextField()

    class Meta:
        managed = False
        db_table = 'modulos'


class Postulante(models.Model):
    id_postulante = models.IntegerField(primary_key=True)
    nombres_postulante = models.TextField()
    apellidos_postulante = models.TextField()
    celular = models.IntegerField()
    genero = models.TextField()
    correo = models.TextField()
    municipio = models.TextField()
    no_documento = models.IntegerField()
    tipo_documento = models.TextField()
    id_rol = models.ForeignKey('Rol', models.DO_NOTHING, db_column='id_rol')

    class Meta:
        managed = False
        db_table = 'postulante'


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


class Sueos(models.Model):
    id_sue±o = models.IntegerField(primary_key=True)
    nombre_sue±o = models.IntegerField()
    contenido = models.IntegerField()
    alcance = models.IntegerField()
    nit = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='NIT')  # Field name made lowercase.
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'sue±os'


class Talleres(models.Model):
    id_taller = models.IntegerField(primary_key=True)
    nombre_taller = models.TextField()
    criterio = models.TextField()
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'talleres'


class Usuario(models.Model):
    id_usuario = models.IntegerField(primary_key=True)
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol')
    descripcion = models.TextField()
    estado = models.TextField()
    correo = models.TextField()
    celular = models.IntegerField()
    documento = models.IntegerField()
    programa = models.TextField()
    contrase±a = models.TextField()
    nombres = models.TextField()
    apellidos = models.TextField()

    class Meta:
        managed = False
        db_table = 'usuario'
