
from rest_framework import serializers
from .models import Coordinador, Director, Empresas, Modulos, Postulante, Preguntas, Programas, Registros, Rol, Suenos, Talleres, Usuario
class CoordinadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coordinador
        fields = '__all__'

class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'

class EmpresasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresas
        fields = '__all__'

class ModulosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulos
        fields = '__all__'

class PostulanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulante
        fields = '__all__'

class PreguntasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preguntas
        fields = '__all__'

class ProgramasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programas
        fields = '__all__'

class RegistrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registros
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class SuenosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suenos
        fields = '__all__'

class TalleresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talleres
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = '__all__'
        #extra_kwargs = {'contrasena': {'write_only': True}} (LA CONTRASEÑA NO SEA ENVIADA)
    
    def create(self, validated_data):
        usuario = Usuario(**validated_data)
        usuario.set_password(validated_data['contrasena'])
        usuario.save()
        
        return usuario
    
    def update(self, instance, validated_data):
        
        if 'contrasena' in validated_data:
            instance.set_password(validated_data['contrasena'])
            validated_data.pop('contrasena', None)
            
        return super().update(instance, validated_data)