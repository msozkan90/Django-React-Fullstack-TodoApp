from django.urls import  path,include
from .views import TaskViewSet
from . import views
from . import views as api_views
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register('todo', TaskViewSet)

urlpatterns = [
    path('api/', include(router.urls)),

    path('createItem/', views.createItem,name="createItem"),
    path('getItem/', views.getItem,name="getItem"),



 ]
