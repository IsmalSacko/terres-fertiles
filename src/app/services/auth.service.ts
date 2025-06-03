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
        return response.data;
      } else {
        throw new Error('Échec de l\'authentification');
      }
    } catch (error: any) {
      console.error('Nom d\'utilisateur ou mot de passe incorrect ❌');
      throw error.response ? error.response.data.message : 'Erreur de connexion';
    }
  }
}
