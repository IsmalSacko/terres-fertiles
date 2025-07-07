import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:8000/api/auth/'; // à adapter si besoin

  // Méthode d'authentification
  async login(username: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.loginUrl}token/login/`, { username, password });
      if (response.data.auth_token) {
        localStorage.setItem('token', response.data.auth_token);
        console.log('Connexion réussie ! 🎉');

        // Récupérer et sauvegarder les informations de l'utilisateur
        try {
          const userResponse = await axios.get(`${this.loginUrl}users/`, {
            headers: { Authorization: `Token ${response.data.auth_token}` }
          });
          localStorage.setItem('currentUser', JSON.stringify(userResponse.data));
          console.log('Informations utilisateur sauvegardées:', userResponse.data);
        } catch (userError) {
          console.error('Erreur lors de la récupération des informations utilisateur:', userError);
        }

        return response.data;
      } else {
        throw new Error('Échec de l\'authentification');
      }
    } catch (error: any) {
      console.error('Nom d\'utilisateur ou mot de passe incorrect ❌');
      throw error.response ? error.response.data.message : 'Erreur de connexion';
    }
  }

  // Méthode pour récupérer l'utilisateur connecté
  async getCurrentUser(): Promise<any> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Aucun token trouvé');
      }

      console.log('Appel API getCurrentUser avec token:', token);
      const response = await axios.get(`${this.loginUrl}users/`, {
        headers: { Authorization: `Token ${token}` }
      });
      console.log('Réponse API getCurrentUser:', response.data);

      // L'API retourne un tableau, prendre le premier utilisateur
      let userData;
      if (Array.isArray(response.data) && response.data.length > 0) {
        userData = response.data[0];
      } else {
        userData = response.data;
      }

      // Sauvegarder dans localStorage pour fallback
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return response.data; // Retourner la réponse complète pour que le composant puisse la traiter
    } catch (error: any) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      throw error.response ? error.response.data.message : 'Erreur de récupération utilisateur';
    }
  }
  logout(){
    localStorage.removeItem('token');

  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
