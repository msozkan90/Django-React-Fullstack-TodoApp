import json
from urllib import request
from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from .models import Task
from rest_framework.authtoken.views import Token
from django.core import serializers
from .serializers import TaskSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets

from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly




class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(['POST'])
def getItem(request):
    owner_id=request.data
    owner=User.objects.filter(id=owner_id).first()
    todos=Task.objects.filter(owner=owner)
    todo_list={'id':[]}
    for i in todos:
        todo_list['id'].append(({'id':i.id , 'title' : i.title ,'completed' : i.completed}))

    if owner:
        return JsonResponse(todo_list,safe=False)
    return Response('Something Wrong!')



@api_view(['POST'])
def createItem(request):
    owner_id=request.data

    get_user= Token.objects.filter(key=request.data["token"]['mytoken']).first()

    owner= User.objects.filter(username=get_user.user).first()
    createTodo= Task.objects.create(title=request.data["title"],completed=request.data["completed"],owner=owner)
    createTodo.save()
    return Response('Item succsesfully create!')








