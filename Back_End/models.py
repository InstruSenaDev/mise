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


class Autoevaluacion(models.Model):
    id_autoevaluacion = models.AutoField(primary_key=True)
    fecha = models.DateField()
    comentarios = models.TextField(blank=True, null=True)
    nit = models.ForeignKey('Empresas', models.DO_NOTHING, db_column='nit')

    class Meta:
        managed = False
        db_table = 'autoevaluacion'


class CalificacionModulo(models.Model):
    id_calificacion = models.AutoField(primary_key=True)
    calificacion = models.IntegerField()
    comentarios = models.TextField(blank=True, null=True)
    id_autoevaluacion = models.ForeignKey(Autoevaluacion, models.DO_NOTHING, db_column='id_autoevaluacion')
    id_modulo = models.ForeignKey('ModuloAutoevaluacion', models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'calificacion_modulo'


class Calificaciones(models.Model):
    id = models.BigAutoField(primary_key=True)
    calificacion = models.DecimalField(max_digits=5, decimal_places=2)
    calificacion_final = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    id_pregunta = models.ForeignKey('Preguntas', models.DO_NOTHING, db_column='id_pregunta')
    nit = models.ForeignKey('Empresas', models.DO_NOTHING, db_column='nit')
    criterio = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calificaciones'


class DiagnosticoEmpresarial(models.Model):
    id_diagnostico = models.AutoField(primary_key=True)
    nit = models.ForeignKey('Empresas', models.DO_NOTHING, db_column='nit', blank=True, null=True)
    id_modulo = models.ForeignKey('Modulos', models.DO_NOTHING, db_column='id_modulo', blank=True, null=True)
    calificacion_promedio = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    criterio = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnostico_empresarial'


class Diagnosticoempresarial(models.Model):
    empresa = models.ForeignKey('Empresas', models.DO_NOTHING)
    modulo = models.ForeignKey('Modulos', models.DO_NOTHING)
    calificacion_promedio = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'diagnosticoempresarial'


class Diagnosticosuenos(models.Model):
    diagnostico = models.ForeignKey(Diagnosticoempresarial, models.DO_NOTHING)
    sueno = models.ForeignKey('Suenos', models.DO_NOTHING)
    estado = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'diagnosticosuenos'
        unique_together = (('diagnostico', 'sueno'),)


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
    nit = models.IntegerField(primary_key=True)
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
    id_programa = models.ForeignKey('Programas', models.DO_NOTHING, db_column='id_programa')
    id_postulante = models.ForeignKey('Postulante', models.DO_NOTHING, db_column='id_postulante')
    diagnostico_value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'empresas'


class Escalas(models.Model):
    id_escala = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    id_modulo = models.ForeignKey('Modulos', models.DO_NOTHING)
    rango_maximo = models.DecimalField(max_digits=5, decimal_places=2)
    rango_minimo = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'escalas'


class Evaluaciones(models.Model):
    id_evaluacion = models.AutoField(primary_key=True)
    nit = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='nit')
    id_modulo = models.ForeignKey('Modulos', models.DO_NOTHING, db_column='id_modulo')
    id_pregunta = models.ForeignKey('Preguntas', models.DO_NOTHING, db_column='id_pregunta')
    id_escala = models.ForeignKey(Escalas, models.DO_NOTHING, db_column='id_escala')
    observaciones = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evaluaciones'


class MisePrueba(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    done = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'mise_prueba'


class ModuloAutoevaluacion(models.Model):
    id_modulo = models.IntegerField(primary_key=True)
    nombre = models.TextField()
    descripcion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'modulo_autoevaluacion'


class Modulos(models.Model):
    id_modulo = models.AutoField(primary_key=True)
    nombre = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    objetivo = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    observaciones = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    alcance = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    estado_actual = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    nivel_ideal = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    estado = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'modulos'


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


class Preguntas(models.Model):
    id_pregunta = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo', blank=True, null=True)
    estado = models.IntegerField(blank=True, null=True)

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
    id = models.BigAutoField(primary_key=True)
    id_modulo = models.IntegerField()
    nivel = models.CharField(max_length=50, blank=True, null=True)
    sue±o = models.TextField(blank=True, null=True)
    medicion = models.TextField(blank=True, null=True)
    evidencia = models.TextField(blank=True, null=True)
    estado = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'suenos'


class SuenosConcretados(models.Model):
    id = models.BigAutoField(primary_key=True)
    id_sueno = models.ForeignKey(Suenos, models.DO_NOTHING, db_column='id_sueno')
    fecha = models.DateField()
    observaciones = models.TextField(blank=True, null=True)
    estado = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'suenos_concretados'


class Talleres(models.Model):
    id_taller = models.IntegerField(primary_key=True)
    nombre_taller = models.TextField()
    criterio = models.TextField()
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')

    class Meta:
        managed = False
        db_table = 'talleres'


class Temas(models.Model):
    id_modulo = models.ForeignKey(Modulos, models.DO_NOTHING, db_column='id_modulo')
    titulo_formacion = models.CharField(max_length=255)
    num_sesion = models.IntegerField(blank=True, null=True)
    objetivo = models.TextField(blank=True, null=True)
    alcance = models.TextField(blank=True, null=True)
    contenido = models.TextField(blank=True, null=True)
    conferencista = models.CharField(max_length=255, blank=True, null=True)
    ubicacion = models.CharField(max_length=255, blank=True, null=True)
    estado = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'temas'


class TemasAsignados(models.Model):
    id_tema = models.ForeignKey(Temas, models.DO_NOTHING, db_column='id_tema')
    nit = models.ForeignKey(Empresas, models.DO_NOTHING, db_column='nit')
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    estado = models.IntegerField()
    criterio = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'temas_asignados'


class TemasPreguntas(models.Model):
    id_pregunta = models.ForeignKey(Preguntas, models.DO_NOTHING, db_column='id_pregunta')
    id_tema = models.ForeignKey(Temas, models.DO_NOTHING, db_column='id_tema')

    class Meta:
        managed = False
        db_table = 'temas_preguntas'


class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    id_rol = models.ForeignKey(Rol, models.DO_NOTHING, db_column='id_rol')
    estado = models.TextField()
    correo = models.TextField()
    celular = models.BigIntegerField()
    documento = models.BigIntegerField()
    programa = models.TextField()
    contrasena = models.TextField()
    nombres = models.TextField()
    apellidos = models.TextField()

    class Meta:
        managed = False
        db_table = 'usuario'
