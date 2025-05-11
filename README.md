# Application de Gestion de Livres - EDACY Test

*Application Full Stack (Django + React) avec authentification JWT et CRUD complet*

## Fonctionnalités
- **Utilisateurs** : Inscription/Connexion sécurisée (JWT)
- **Livres** : CRUD complet (Create, Read, Update, Delete)
- **Base de données** : MySQL relationnelle
- **Interface** : React avec Tailwind CSS

## 🛠 Installation

### Backend (Django)

# Environnement virtuel :
python -m venv env
source env/bin/activate  # Linux/Mac
env\Scripts\activate     # Windows

# Dépendances :
pip install -r requirements.txt

#  Base de données :

Configurer MySQL puis modifier settings.py :
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
python manage.py migrate

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