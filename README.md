# Application de Gestion de Livres - EDACY Test

*Application Full Stack (Django + React) avec authentification JWT et CRUD complet*

## Fonctionnalités
- **Utilisateurs** : Inscription/Connexion sécurisée (JWT)
- **Livres** : CRUD complet (Create, Read, Update, Delete)
- **Base de données** : MySQL relationnelle
- **Interface** : React avec Tailwind CSS

## 🛠 Installation
sudo apt install python3-django

### Backend (Django)

# Environnement virtuel :
python3 -m venv env
source env/bin/activate  # Linux/Mac
# ou .\env\Scripts\activate pour Windows

# Création du fichier requirements.txt
echo "django==4.2
djangorestframework==3.14
django-cors-headers==4.3
mysqlclient==2.2
python-dotenv==1.0
djangorestframework-simplejwt==5.3" > requirements.txt

pip install -r requirements.txt

# Initialisation du projet
django-admin startproject backend
cd backend
python manage.py startapp api

# Configuration critique dans settings.py
# backend/settings.py

from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    ...,
    "api",
    "rest_framework",
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

DATABASES = {
      'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'edacy-test', 
        'USER': 'oumar',  
        'PASSWORD': 'root1234',  
        'HOST': 'localhost', 
        'PORT': '3306',  
    }
}


# Migrations :
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

#  Lancer le serveur :
python manage.py runserver


#  Frontend (React)
#Initialiser le projet :
cd ..
npm create vite@latest frontend --template react
cd frontend


# Installer les dépendances :
npm install axios react-router-dom jwt-decode
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


# Structure des fichiers :
mkdir -p src/{pages,components,styles}
touch src/{constants.js,api.js,App.jsx,main.jsx,index.css}

# Configuration Axios (src/api.js) :
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;


Variables d'environnement (.env) :
VITE_API_URL=http://localhost:8000


# Route protégée (src/components/ProtectedRoute.jsx) :
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" />;
  
  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch {
    return <Navigate to="/login" />;
  }
  
  return children;
}



# Démarrer l'application :
npm run dev