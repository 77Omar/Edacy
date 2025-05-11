from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LivreSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Livre



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Vue pour lister et créer des livres
class LivreListCreate(generics.ListCreateAPIView):
    serializer_class = LivreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Livre.objects.filter(utilisateur=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(utilisateur=self.request.user)
        else:
            print(serializer.errors)  

# Vue pour supprimer un livre 
class LivreDelete(generics.DestroyAPIView):
    serializer_class = LivreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Livre.objects.filter(utilisateur=user)   
    
#Ajoutez une vue pour la mise à jour
class LivreUpdate(generics.UpdateAPIView):
    serializer_class = LivreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Livre.objects.filter(utilisateur=self.request.user)        