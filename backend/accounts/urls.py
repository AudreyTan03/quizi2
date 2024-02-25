from django.urls import path
from .views import *

urlpatterns = [
    path('', get_user, name='profile'),
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('register/', registerUser, name='register'),
    path('verify-otp/', verify_otp, name='verify_otp'),
]