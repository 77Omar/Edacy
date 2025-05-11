from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Livre

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class LivreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Livre
        fields = ["id", "titre", "auteur", "description", "genre", 
                 "date_creation", "date_publication", "utilisateur"]
        extra_kwargs = {
            "utilisateur": {"read_only": True},
            "date_creation": {"read_only": True} 
        }        