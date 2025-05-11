from django.db import models
from django.contrib.auth.models import User

class Livre(models.Model):
    titre = models.CharField(max_length=100)
    auteur = models.CharField(max_length=100)  
    description = models.TextField(blank=True) 
    
    date_creation = models.DateTimeField(auto_now_add=True)  
    date_publication = models.DateField(blank=True, null=True) 
    
    utilisateur = models.ForeignKey(User, on_delete=models.CASCADE)  
    
    GENRES = [
        ('ROMAN', 'Roman'),
        ('SCIENCE', 'Science-Fiction'),
        ('JEUNESSE', 'Jeunesse'),
    ]
    genre = models.CharField(max_length=20, choices=GENRES, blank=True)
    
    def __str__(self):
        return self.titre