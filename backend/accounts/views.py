from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, MyTokenObtainPairSerializer, UserSerializerWithToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
import pyotp
from accounts.models import OTP
from accounts.serializers import *
from django.conf import settings
from django.core.mail import send_mail
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from accounts.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserPasswordResetSerializer,UserProfileSerializer
from django.contrib.auth import authenticate
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from accounts.renderers import UserRenderer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getUserProfile(request): # user should be logged in
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        if User.objects.filter(username=data["username"]).exists():
            message = {"detail": "User with this username already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=data["email"]).exists():
            message = {"detail": "User with this email already exists"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        otp_key = pyotp.random_base32()
        otp_instance = pyotp.TOTP(otp_key, digits=6)
        otp_code = otp_instance.now()

        user = User.objects.create(
            username=data.get('username'),
            email=data.get('email'),
            password=make_password(data.get('password')),
            is_active=False
        )

        otp = OTP.objects.create(
            user=user,
            otp_secret=otp_key
        )
        send_otp_email(data["email"], otp_code)
        serializer = UserSerializerWithToken(user, many=False)
        
        response_data = {
            "detail": "User created successfully",
            "user_id": user.id,
            "otp_id": otp.id,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    except Exception as e:
        message = {'detail': str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST'])
def verify_otp(request):
    data = request.data
    try:
        user_id = data["user_id"]
        otp_id = data["otp_id"]
        otp_code = data["otp_code"]

        user = User.objects.get(id=user_id)
        otp = OTP.objects.get(id=otp_id, user=user)

        print(otp_code)
        print(otp.otp_secret)
        totp = pyotp.TOTP(otp.otp_secret)
        if totp.verify(otp_code, valid_window=7):
            user.is_active = True
            user.save()

            otp.is_verified = True
            otp.save()
            
            return Response({"detail": "OTP verified successfully"}, status=status.HTTP_200_OK)
        
        else:
            raise Exception("Invalid OTP code")
    except Exception as e:
        message = {"detail": str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

def send_otp_email(email, otp_code):
    subject = "OTP Verification"
    message = f"Your OTP code is: {otp_code}"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    send_mail(subject, message, email_from, recipient_list)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    # permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer= UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    



class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access
    authentication_classes = [JWTAuthentication]

    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]
    def post(self,request, uid, token , format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context = {'uid':uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':"Password Reset Succesfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)