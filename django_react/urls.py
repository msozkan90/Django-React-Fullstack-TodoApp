from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Todo.urls')),
    path('account/', include('Account.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('auth/', obtain_auth_token)
]
