from django.urls import  path,include
from . import views
from . import views as api_views
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register('user', UserViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.apiOverview, name="api-overview"),
    path('username_check/', api_views.UsernameCheckAPIView,name="username_check"),
    path('token_check/', api_views.TokenCheckAPIView,name="token_check"),
    path('current_user/', api_views.current_user,name="current_user"),

]
