from django.db import models, connection
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager    
from django.http import JsonResponse
import bcrypt


class Empresas(models.Model):
    nit = models.IntegerField(db_column='nit', primary_key=True)
    nombre_empresa = models.TextField()
    celular = models.BigIntegerField()
    razon_social = models.TextField()
    direccion = models.TextField()
    act_economica = models.TextField()
    gerente = models.TextField()
    producto_servicio = models.TextField(db_column='producto/servicio')
    correo = models.TextField()
    pagina_web = models.TextField()
    fecha_creacion = models.DateField()
    ventas_ult_ano = models.BigIntegerField()
    costos_ult_ano = models.BigIntegerField()
    empleados_perm = models.BigIntegerField()
    sector = models.TextField()
    estado = models.IntegerField()
    diagnostico_value = models.IntegerField()  # Renamed field
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


class Programas(models.Model):
    id_programa = models.IntegerField(primary_key=True)
    nombre_programa = models.TextField()
    descripcion = models.TextField()
    id_director = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'programas'





class Rol(models.Model):
    id_rol = models.IntegerField(primary_key=True)
    descripcion = models.TextField()

    class Meta:
        managed = False
        db_table = 'rol'

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

class Modulos(models.Model):
    id_modulo = models.AutoField(primary_key=True)
    nombre = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    objetivo = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    observaciones = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    alcance = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    estado_actual = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    nivel_ideal = models.TextField(db_collation='utf8mb4_0900_ai_ci', blank=True, null=True)
    id_tema = models.ForeignKey(Temas, on_delete=models.DO_NOTHING, db_column='id_tema')  # Relación con Temas

    class Meta:
        managed = False
        db_table = 'modulos'


class Escalas(models.Model):
    id_escala = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    rango_minimo = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    rango_maximo = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # Valor predeterminado
    id_modulo = models.ForeignKey(Modulos, on_delete=models.CASCADE, default=1)

    class Meta:
        db_table = 'escalas'



class Preguntas(models.Model):
    id_pregunta = models.AutoField(primary_key=True)
    descripcion = models.TextField()
    criterio = models.TextField()
    id_modulo = models.ForeignKey(Modulos, on_delete=models.DO_NOTHING, db_column='id_modulo')
    id_escala = models.ForeignKey(Escalas, on_delete=models.DO_NOTHING, db_column='id_escala')  # Nueva relación con la tabla Escalas

    class Meta:
        managed = False
        db_table = 'preguntas'


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

class Calificaciones(models.Model):
    id = models.AutoField(primary_key=True)
    nit = models.ForeignKey(Empresas, on_delete=models.CASCADE, db_column='nit')
    id_pregunta = models.ForeignKey(
        'Preguntas',
        on_delete=models.CASCADE,
        related_name='calificaciones'
    )
    calificacion = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        db_table = 'calificaciones'




class Evaluaciones(models.Model):
    id_evaluacion = models.AutoField(primary_key=True)
    nit = models.ForeignKey(Empresas, on_delete=models.CASCADE, db_column='nit')
    id_modulo = models.ForeignKey(Modulos, on_delete=models.CASCADE, db_column='id_modulo')
    id_pregunta = models.ForeignKey(Preguntas, on_delete=models.CASCADE, db_column='id_pregunta')
    id_escala = models.ForeignKey(Escalas, on_delete=models.CASCADE, db_column='id_escala')
    observaciones = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'evaluaciones'


class Diagnostico(models.Model):
    id = models.AutoField(primary_key=True)
    nit = models.ForeignKey(Empresas, on_delete=models.CASCADE, db_column='nit')
    id_modulo = models.ForeignKey(
        'Modulos',
        on_delete=models.CASCADE,
        related_name='diagnosticos'
    )
    promedio = models.DecimalField(max_digits=5, decimal_places=2)
    estado = models.CharField(max_length=50)

    class Meta:
        db_table = 'diagnostico'



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



class Modulo1(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Pregunta1(models.Model):
    modulo1 = models.ForeignKey(Modulo1, related_name='preguntas1', on_delete=models.CASCADE)
    texto = models.TextField()

    def __str__(self):
        return self.texto

class Escala1(models.Model):
    descripcion = models.TextField()
    nivel = models.CharField(max_length=50, choices=[
        ('No Desarrollado', 'No Desarrollado'),
        ('Parcialmente Desarrollado', 'Parcialmente Desarrollado'),
        ('Ampliamente Desarrollado', 'Ampliamente Desarrollado'),
        ('No Aplica', 'No Aplica')
    ])

    def __str__(self):
        return self.nivel

class Diagnostico1(models.Model):
    empresa = models.ForeignKey('Empresas', on_delete=models.CASCADE)
    modulo1 = models.ForeignKey(Modulo1, on_delete=models.CASCADE)
    fecha = models.DateField()
    observaciones = models.TextField()

    @property
    def promedio_modulo(self):
        respuestas = Respuesta1.objects.filter(diagnostico=self, pregunta__modulo1=self.modulo1)
        if not respuestas.exists():
            return 0
        total_calificacion = sum(r.calificacion for r in respuestas)
        return total_calificacion / respuestas.count()

    def __str__(self):
        return f"Diagnóstico para {self.empresa} en {self.modulo1} el {self.fecha}"

class Respuesta1(models.Model):
    diagnostico = models.ForeignKey(Diagnostico1, related_name='respuestas1', on_delete=models.CASCADE)
    pregunta = models.ForeignKey(Pregunta1, related_name='respuestas1', on_delete=models.CASCADE)
    escala = models.ForeignKey(Escala1, on_delete=models.CASCADE)
    calificacion = models.IntegerField()  # Calificación numérica entre 0 y 100
    comentarios = models.TextField()

    def __str__(self):
        return f"Respuesta a {self.pregunta} con calificación {self.calificacion}"
