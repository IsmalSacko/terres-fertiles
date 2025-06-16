import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Plateforme {
  id: number;
  nom: string;
}

export interface Gisement {
  id: number;
  nom: string;
  commune: string;
  materiau: string;
  volume_terrasse: number;
}

// Utilisé pour créer un ingrédient
export interface MelangeIngredientInput {
  gisement: number;
  pourcentage: number;
}

// Utilisé pour lecture (GET)
export interface MelangeIngredient {
  id?: number;
  melange: number;
  gisement: number;
  pourcentage: number;
  gisement_details?: Gisement;
}

export enum MelangeEtat {
  COMPOSITION = 1,
  CONFORMITE = 2,
  CONSIGNE = 3,
  CONTROLE_1 = 4,
  CONTROLE_2 = 5,
  VALIDATION = 6
}

export interface Melange {
  id?: number;
  nom: string;
  date_creation: string;
  reference_produit: string;
  plateforme: number | null;
  plateforme_details?: Plateforme;
  fournisseur: string;
  couverture_vegetale: string | null;
  periode_melange: string;
  date_semis: string;
  references_analyses: string | null;
  etat: MelangeEtat;
  ordre_conformite: string | null;
  consignes_melange: string | null;
  controle_1: string | null;
  controle_2: string | null;
  fiche_technique: string | null;
  ingredients: MelangeIngredient[];
}

// Pour POST uniquement (plateforme = ID, ingredients = tableau)
export interface PartialMelange {
  nom: string;
  fournisseur: string;
  couverture_vegetale?: string | null;
  periode_melange: string;
  date_semis: string;
  references_analyses?: string | null;
  plateforme?: number | null;
  ingredients?: MelangeIngredientInput[];
}

@Injectable({
  providedIn: 'root'
})
export class MelangeService {
  private apiUrl = 'http://127.0.0.1:8000/api/melanges/';
  private ingredientsApiUrl = 'http://127.0.0.1:8000/api/melange-ingredients/';
  private plateformesApiUrl = 'http://127.0.0.1:8000/api/plateformes/';

  constructor() {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Token ${token}` } };
  }

  async getAll(): Promise<Melange[]> {
    const response = await axios.get<Melange[]>(this.apiUrl, this.getHeaders());
    return response.data;
  }

  async getById(id: number): Promise<Melange> {
    const response = await axios.get<Melange>(`${this.apiUrl}${id}/`, this.getHeaders());
    return response.data;
  }

  async create(melange: PartialMelange): Promise<Melange> {
    try {
      console.log('Données envoyées pour création :', melange);
      const response = await axios.post<Melange>(this.apiUrl, melange, this.getHeaders());
      return response.data;
    } catch (error: any) {
      console.error('Erreur lors de la création du mélange :', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      throw error;
    }
  }

  async update(id: number, melange: PartialMelange): Promise<Melange> {
    const response = await axios.put<Melange>(`${this.apiUrl}${id}/`, melange, this.getHeaders());
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axios.delete(`${this.apiUrl}${id}/`, this.getHeaders());
  }

  async updateEtat(id: number, etat: MelangeEtat): Promise<Melange> {
    const response = await axios.patch<Melange>(`${this.apiUrl}${id}/`, { etat }, this.getHeaders());
    return response.data;
  }

  async getIngredients(melangeId: number): Promise<MelangeIngredient[]> {
    const response = await axios.get<MelangeIngredient[]>(
      `${this.ingredientsApiUrl}?melange=${melangeId}`,
      this.getHeaders()
    );
    return response.data;
  }

  async addIngredient(ingredient: MelangeIngredientInput & { melange: number }): Promise<MelangeIngredient> {
    const response = await axios.post<MelangeIngredient>(
      this.ingredientsApiUrl,
      ingredient,
      this.getHeaders()
    );
    return response.data;
  }

  async updateIngredient(id: number, ingredient: Partial<MelangeIngredient>): Promise<MelangeIngredient> {
    const response = await axios.put<MelangeIngredient>(
      `${this.ingredientsApiUrl}${id}/`,
      ingredient,
      this.getHeaders()
    );
    return response.data;
  }

  async deleteIngredient(id: number): Promise<void> {
    await axios.delete(`${this.ingredientsApiUrl}${id}/`, this.getHeaders());
  }

  async getPlateformes(): Promise<Plateforme[]> {
    const response = await axios.get<Plateforme[]>(this.plateformesApiUrl, this.getHeaders());
    return response.data;
  }

  getEtatLabel(etat: MelangeEtat): string {
    const labels = {
      [MelangeEtat.COMPOSITION]: 'Composition',
      [MelangeEtat.CONFORMITE]: 'Ordre de conformité',
      [MelangeEtat.CONSIGNE]: 'Consignes de mélange',
      [MelangeEtat.CONTROLE_1]: 'Contrôle +1 mois',
      [MelangeEtat.CONTROLE_2]: 'Contrôle +2 mois',
      [MelangeEtat.VALIDATION]: 'Validation finale'
    };
    return labels[etat] || 'Inconnu';
  }

  getTacheActuelle(etat: MelangeEtat): string {
    const taches = {
      [MelangeEtat.COMPOSITION]: 'Veuillez composer le mélange avec les gisements.',
      [MelangeEtat.CONFORMITE]: 'Veuillez renseigner un ordre de conformité.',
      [MelangeEtat.CONSIGNE]: 'Veuillez fournir les consignes de mélange.',
      [MelangeEtat.CONTROLE_1]: 'Un contrôle de réduction +1 mois est requis.',
      [MelangeEtat.CONTROLE_2]: 'Un contrôle +2 mois est requis.',
      [MelangeEtat.VALIDATION]: 'Fiche technique obligatoire.'
    };
    return taches[etat] || '';
  }

  getEtatColor(etat: MelangeEtat): string {
    const colors = {
      [MelangeEtat.COMPOSITION]: 'primary',
      [MelangeEtat.CONFORMITE]: 'warning',
      [MelangeEtat.CONSIGNE]: 'info',
      [MelangeEtat.CONTROLE_1]: 'secondary',
      [MelangeEtat.CONTROLE_2]: 'secondary',
      [MelangeEtat.VALIDATION]: 'success'
    };
    return colors[etat] || 'light';
  }
}
