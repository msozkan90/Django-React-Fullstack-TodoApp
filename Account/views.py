import json
from django.http import JsonResponse
from .serializers import UserSerializer,UsernameCheckSerializer,TokenCheckSerializer
from rest_framework.generics import GenericAPIView
from rest_framework import response, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework import viewsets
from django.http import HttpResponse
from Account import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import Token
@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		'Login':'/login/',
		'Username Check':'/username_check/',
		'Users':'/users/',
		'Register':'/register/',
		'Current User':'/current_user/',
		'Current User':'/todolist/',
		'Current User':'/createItem/',


		}

	return Response(api_urls)



@api_view(['POST'])
def TokenCheckAPIView(request):
	tasks = Token.objects.filter(key=request.data)
	serializer = TokenCheckSerializer(tasks, many=True)
	if request.method == 'POST':
		return Response(serializer.data)
	return Response(serializer.data)



@api_view(['GET'])
def UsernameCheckAPIView(request):
	tasks = User.objects.all().order_by('-id')
	serializer = UsernameCheckSerializer(tasks, many=True)
	return Response(serializer.data)


@api_view(['GET','POST'])
def current_user(request):
    user = request.user
	
    return Response({
      'username' : user.username,
    })




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
