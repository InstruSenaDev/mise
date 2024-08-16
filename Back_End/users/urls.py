from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from users import views
from .views import CoordinadorListCreate, CoordinadorRetrieveUpdateDestroy, DirectorListCreate, DirectorRetrieveUpdateDestroy, EmpresasListCreate, EmpresasRetrieveUpdateDestroy, ModulosListCreate, ModulosRetrieveUpdateDestroy, PostulanteListCreate, PostulanteRetrieveUpdateDestroy, PreguntasListCreate, PreguntasRetrieveUpdateDestroy, ProgramasListCreate, ProgramasRetrieveUpdateDestroy, RegistrosListCreate, RegistrosRetrieveUpdateDestroy, RolListCreate, RolRetrieveUpdateDestroy, SuenosListCreate, SuenosRetrieveUpdateDestroy, TalleresListCreate, TalleresRetrieveUpdateDestroy, UsuarioListCreate, UsuarioRetrieveUpdateDestroy

router = routers.DefaultRouter()

urlpatterns = [
    path('login', views.login),
    path('user', views.user),

    path('coordinador/', CoordinadorListCreate.as_view(), name='coordinador-list-create'),
    path('coordinador/<int:pk>/', CoordinadorRetrieveUpdateDestroy.as_view(), name='coordinador-retrieve-update-destroy'),

    path('director/', DirectorListCreate.as_view(), name='director-list-create'),
    path('director/<int:pk>/', DirectorRetrieveUpdateDestroy.as_view(), name='director-retrieve-update-destroy'),

    path('empresas/', EmpresasListCreate.as_view(), name='empresas-list-create'),
    path('empresas/<int:pk>/', EmpresasRetrieveUpdateDestroy.as_view(), name='empresas-retrieve-update-destroy'),

    path('modulos/', ModulosListCreate.as_view(), name='modulos-list-create'),
    path('modulos/<int:pk>/', ModulosRetrieveUpdateDestroy.as_view(), name='modulos-retrieve-update-destroy'),

    path('postulante/', PostulanteListCreate.as_view(), name='postulante-list-create'),
    path('postulante/<int:pk>/', PostulanteRetrieveUpdateDestroy.as_view(), name='postulante-retrieve-update-destroy'),

    path('preguntas/', PreguntasListCreate.as_view(), name='preguntas-list-create'),
    path('preguntas/<int:pk>/', PreguntasRetrieveUpdateDestroy.as_view(), name='preguntas-retrieve-update-destroy'),

    path('programas/', ProgramasListCreate.as_view(), name='programas-list-create'),
    path('programas/<int:pk>/', ProgramasRetrieveUpdateDestroy.as_view(), name='programas-retrieve-update-destroy'),

    path('registros/', RegistrosListCreate.as_view(), name='registros-list-create'),
    path('registros/<int:pk>/', RegistrosRetrieveUpdateDestroy.as_view(), name='registros-retrieve-update-destroy'),

    path('rol/', RolListCreate.as_view(), name='rol-list-create'),
    path('rol/<int:pk>/', RolRetrieveUpdateDestroy.as_view(), name='rol-retrieve-update-destroy'),

    path('suenos/', SuenosListCreate.as_view(), name='suenos-list-create'),
    path('suenos/<int:pk>/', SuenosRetrieveUpdateDestroy.as_view(), name='suenos-retrieve-update-destroy'),

    path('talleres/', TalleresListCreate.as_view(), name='talleres-list-create'),
    path('talleres/<int:pk>/', TalleresRetrieveUpdateDestroy.as_view(), name='talleres-retrieve-update-destroy'),

    path('usuario/', UsuarioListCreate.as_view(), name='usuario-list-create'),
    path('usuario/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view(), name='usuario-retrieve-update-destroy'),
]