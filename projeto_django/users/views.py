# from rest_framework.response import Response
from .models import Usuarios, Monitores, Administrador
from .serializers import UsuarioSerializer, MonitorSerializer, AdministradorSerializer
from django.http.response import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

# Create your views here.


@api_view(["GET"])
def getUsers(self, request):
    usuarios = Usuarios.objects.all()
    usuario_serializer = UsuarioSerializer(usuarios, many=True)
    return JsonResponse(usuario_serializer.data, safe=False)


@api_view(["GET"])
def getUser(self, request, *args, **kwargs):
    email = self.kwargs.get("email")
    senha = self.kwargs.get("senha")

    try:
        usuario = Usuarios.objects.get(email=email, senha=senha)
        # Você pode personalizar os campos que deseja incluir na resposta JSON
        data = {
            "id_usuario": usuario.id_usuario,
            "nome": usuario.nome,
            "email": usuario.email,
            # Adicione outros campos conforme necessário
        }
        return JsonResponse(data)
    except Usuarios.DoesNotExist:
        return JsonResponse({"error": "Usuário não encontrado"}, status=404)


@api_view(["PUT"])
def updateUser(request, pk):
    usuario = Usuarios.objects.get(pk=pk)
    usuario_data = JSONParser().parse(request)
    usuario_serializer = UsuarioSerializer(usuario, data=usuario_data)
    if usuario_serializer.is_valid():
        usuario_serializer.save()
        return JsonResponse(usuario_serializer.data)
    return JsonResponse(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def postUser(request):
    usuario_data = JSONParser().parse(request)
    usuario_serializer = UsuarioSerializer(data=usuario_data)
    if usuario_serializer.is_valid():
        usuario = usuario_serializer.save()

        if usuario.categoria == "monitor":
            Monitores.objects.create(id_monitor=usuario)

        return JsonResponse(usuario_serializer.data, status=status.HTTP_201_CREATED)
    print(usuario_serializer.errors)

    return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
