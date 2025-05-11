from django.urls import path
from .views import LivreListCreate, LivreUpdate, LivreDelete

urlpatterns = [
    path('livres/', LivreListCreate.as_view(), name='livre-list-create'),
    path('livres/<int:pk>/update/', LivreUpdate.as_view(), name='livre-update'),
    path('livres/<int:pk>/delete/', LivreDelete.as_view(), name='livre-delete'),
]