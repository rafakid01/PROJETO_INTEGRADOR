# from rest_framework.response import Response
from .models import Usuarios
from .serializers import UsuarioSerializer
from django.http.response import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

import logging


# Create your views here.


@api_view(["GET"])
def getusers(request):
    usuarios = Usuarios.objects.all()
    usuario_serializer = UsuarioSerializer(usuarios, many=True)
    return JsonResponse(usuario_serializer.data, safe=False)


@api_view(["POST"])
def postUser(request):
    usuario_data = JSONParser().parse(request)
    usuario_serializer = UsuarioSerializer(data=usuario_data)
    if usuario_serializer.is_valid():
        usuario_serializer.save()
        return JsonResponse(usuario_serializer.data, status=status.HTTP_201_CREATED)
    print(usuario_serializer.errors)

    return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
