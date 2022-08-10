from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
	owner = serializers.StringRelatedField(read_only=True)

	class Meta:
		model = Task

		fields = ['title','completed','id', 'owner',]

	