import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MelangeService, Melange, MelangeEtat, MelangeIngredient, Gisement, Plateforme } from '../services/melange.service';
import { GisementService } from '../services/gisement.service';

@Component({
  selector: 'app-melange-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './melange-detail.component.html',
  styleUrl: './melange-detail.component.css'
})
export class MelangeDetailComponent implements OnInit {
  melange: Melange = {
    nom: '',
    date_creation: new Date().toISOString().split('T')[0],
    reference_produit: '',
    plateforme: null,
    fournisseur: '',
    couverture_vegetale: null,
    periode_melange: '',
    date_semis: new Date().toISOString().split('T')[0],
    references_analyses: null,
    etat: MelangeEtat.COMPOSITION,
    ordre_conformite: null,
    consignes_melange: null,
    controle_1: null,
    controle_2: null,
    fiche_technique: null,
    ingredients: []
  };
  loading = true;
  error = '';
  isNew = false;

  melangeForm: FormGroup;
  ingredientForm: FormGroup;

  gisements: Gisement[] = [];
  plateformes: Plateforme[] = [];
  availableGisements: Gisement[] = [];

  showIngredientForm = false;
  editingIngredient: MelangeIngredient | null = null;
  selectedGisements: { gisementId: number, pourcentage: number }[] = [];

  constructor(
    private melangeService: MelangeService,
    private gisementService: GisementService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.melangeForm = this.fb.group({
      nom: [''],
      plateforme: [null],
      fournisseur: ['', Validators.required],
      couverture_vegetale: [''],
      periode_melange: ['', Validators.required],
      date_semis: ['', Validators.required],
      references_analyses: [''],
      ordre_conformite: [''],
      consignes_melange: [''],
      controle_1: [''],
      controle_2: [''],
      fiche_technique: ['']
    });

    this.ingredientForm = this.fb.group({
      gisement: [null, Validators.required],
      pourcentage: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.loading = true;
      await Promise.all([
        this.loadGisements(),
        this.loadPlateformes()
      ]);
      this.availableGisements = this.gisements;
      const id = this.route.snapshot.paramMap.get('id');
      if (id === 'new') {
        this.isNew = true;
        this.initializeNewMelange();
      } else if (id) {
        await this.loadMelange(parseInt(id));
      }
    } catch (err) {
      this.error = 'Erreur lors du chargement des données';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  async loadGisements(): Promise<void> {
    try {
      this.gisements = await this.gisementService.getAll();
    } catch (error) {
      console.error('Erreur lors du chargement des gisements:', error);
      throw error;
    }
  }

  async loadPlateformes(): Promise<void> {
    try {
      this.plateformes = await this.melangeService.getPlateformes();
    } catch (error) {
      console.error('Erreur lors du chargement des plateformes:', error);
      throw error;
    }
  }

  async loadMelange(id: number): Promise<void> {
    this.melange = await this.melangeService.getById(id);
    this.updateAvailableGisements();
    this.patchForm();
  }

  initializeNewMelange(): void {
    this.melange = {
      nom: '',
      date_creation: new Date().toISOString().split('T')[0],
      reference_produit: '',
      plateforme: null,
      fournisseur: '',
      couverture_vegetale: null,
      periode_melange: '',
      date_semis: new Date().toISOString().split('T')[0],
      references_analyses: null,
      etat: MelangeEtat.COMPOSITION,
      ordre_conformite: null,
      consignes_melange: null,
      controle_1: null,
      controle_2: null,
      fiche_technique: null,
      ingredients: []
    };
    this.updateAvailableGisements();
  }

  updateAvailableGisements(): void {
    if (!this.melange) return;
    const usedGisementIds = this.melange.ingredients?.map(i => i.gisement) || [];
    this.availableGisements = this.gisements.filter(g => !usedGisementIds.includes(g.id));
  }

  patchForm(): void {
    if (!this.melange) return;
    this.melangeForm.patchValue({
      nom: this.melange.nom,
      plateforme: this.melange.plateforme,
      fournisseur: this.melange.fournisseur,
      couverture_vegetale: this.melange.couverture_vegetale,
      periode_melange: this.melange.periode_melange,
      date_semis: this.melange.date_semis,
      references_analyses: this.melange.references_analyses,
      ordre_conformite: this.melange.ordre_conformite,
      consignes_melange: this.melange.consignes_melange,
      controle_1: this.melange.controle_1,
      controle_2: this.melange.controle_2,
      fiche_technique: this.melange.fiche_technique
    });
  }

  getVisibleFieldName(): string | null {
    switch (this.melange.etat) {
      case MelangeEtat.CONFORMITE:
        return 'ordre_conformite';
      case MelangeEtat.CONSIGNE:
        return 'consignes_melange';
      case MelangeEtat.CONTROLE_1:
        return 'controle_1';
      case MelangeEtat.CONTROLE_2:
        return 'controle_2';
      case MelangeEtat.VALIDATION:
        return 'fiche_technique';
      default:
        return null;
    }
  }

  isFieldVisible(fieldName: string): boolean {
    return this.getVisibleFieldName() === fieldName;
  }

  getTacheMessage(): string {
    switch (this.melange.etat) {
      case MelangeEtat.COMPOSITION:
        return 'Veuillez composer le mélange avec les gisements.';
      case MelangeEtat.CONFORMITE:
        return 'Veuillez renseigner un ordre de conformité.';
      case MelangeEtat.CONSIGNE:
        return 'Veuillez fournir les consignes de mélange.';
      case MelangeEtat.CONTROLE_1:
        return 'Un contrôle de réduction +1 mois est requis.';
      case MelangeEtat.CONTROLE_2:
        return 'Un contrôle +2 mois est requis.';
      case MelangeEtat.VALIDATION:
        return 'Fiche technique obligatoire.';
      default:
        return '';
    }
  }

  // Helper methods
  getEtatLabel(etat: MelangeEtat): string {
    return this.melangeService.getEtatLabel(etat);
  }

  getEtatColor(etat: MelangeEtat): string {
    return this.melangeService.getEtatColor(etat);
  }

  getTacheActuelle(etat: MelangeEtat): string {
    return this.melangeService.getTacheActuelle(etat);
  }

  getProgressPercentage(etat: MelangeEtat): number {
    return (etat / 6) * 100;
  }

  getGisementName(gisementId: number): string {
    const gisement = this.gisements.find(g => g.id === gisementId);
    return gisement?.nom || 'Gisement inconnu';
  }

  getPlateformeName(plateformeId: number | null | undefined): string {
    if (!plateformeId) return 'Non spécifiée';
    const plateforme = this.plateformes.find(p => p.id === plateformeId);
    return plateforme?.nom || 'Plateforme inconnue';
  }

  getTotalPercentage(): number {
    if (!this.melange?.ingredients) return 0;
    return this.melange.ingredients.reduce((sum, ing) => sum + ing.pourcentage, 0);
  }

  getTotalSelectedPercentage(): number {
    return this.selectedGisements.reduce((sum, s) => sum + s.pourcentage, 0);
  }

  // Navigation methods
  async nextStep(): Promise<void> {
    if (!this.melange?.id || this.melange.etat >= 6) return;
    try {
      await this.melangeService.updateEtat(this.melange.id, this.melange.etat + 1);
      await this.loadMelange(this.melange.id);
    } catch (err) {
      console.error('Erreur lors du passage à l\'étape suivante:', err);
    }
  }

  async previousStep(): Promise<void> {
    if (!this.melange?.id || this.melange.etat <= 1) return;
    try {
      await this.melangeService.updateEtat(this.melange.id, this.melange.etat - 1);
      await this.loadMelange(this.melange.id);
    } catch (err) {
      console.error('Erreur lors du retour à l\'étape précédente:', err);
    }
  }

  async saveMelange(): Promise<void> {
    if (this.melangeForm.invalid || !this.melange) return;
  
    try {
      const formData = this.melangeForm.value;
      console.log('Form data:', formData);
  
      // Préparer les ingrédients au format attendu par le backend Django
      const ingredients = this.selectedGisements.map(s => ({
        gisement: s.gisementId,  // ✅ ID simple (integer)
        pourcentage: parseFloat(s.pourcentage.toString())
      }));
  
      // Construire le payload en gérant les valeurs null/undefined
      const createData = {
        nom: formData.nom || 'Mélange sans nom',
        fournisseur: formData.fournisseur,
        periode_melange: formData.periode_melange,
        date_semis: formData.date_semis,
        plateforme: formData.plateforme ? parseInt(formData.plateforme) : null,
        couverture_vegetale: formData.couverture_vegetale || null,
        references_analyses: formData.references_analyses || null,
        ingredients: ingredients
      };
  
      console.log('Payload envoyé au backend :', JSON.stringify(createData, null, 2));
  
      if (this.isNew || !this.melange.id) {
        this.melange = await this.melangeService.create(createData);
        this.isNew = false;
        this.router.navigate(['/melanges', this.melange.id]);
      } else {
        this.melange = await this.melangeService.update(this.melange.id, createData);
      }
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde:', err);
      console.error('Response data:', err.response?.data);
      console.error('Response status:', err.response?.status);
      this.error = `Erreur lors de la sauvegarde: ${err.response?.data?.detail || err.message}`;
    }
  }
  

  // Ingredient management methods
  editIngredient(ingredient: MelangeIngredient): void {
    this.editingIngredient = ingredient;
    this.ingredientForm.patchValue({
      gisement: ingredient.gisement,
      pourcentage: ingredient.pourcentage
    });
    this.showIngredientForm = true;
  }

  async deleteIngredient(ingredientId: number): Promise<void> {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet ingrédient ?')) return;
    try {
      await this.melangeService.deleteIngredient(ingredientId);
      if (this.melange?.id) {
        await this.loadMelange(this.melange.id);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  }

  resetIngredientForm(): void {
    this.ingredientForm.reset();
    this.editingIngredient = null;
    this.showIngredientForm = false;
  }

  // Multi-selection methods
  isGisementSelected(gisementId: number): boolean {
    return this.selectedGisements.some(s => s.gisementId === gisementId);
  }

  onGisementCheckboxChange(gisementId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedGisements.push({ gisementId, pourcentage: 0 });
    } else {
      this.selectedGisements = this.selectedGisements.filter(s => s.gisementId !== gisementId);
    }
  }

  getSelectedGisementName(gisementId: number): string {
    const gisement = this.gisements.find(g => g.id === gisementId);
    return gisement?.nom || 'Gisement inconnu';
  }

  onPercentageChange(gisementId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const selection = this.selectedGisements.find(s => s.gisementId === gisementId);
    if (selection) {
      selection.pourcentage = +target.value;
    }
  }

  removeGisementFromSelection(gisementId: number): void {
    this.selectedGisements = this.selectedGisements.filter(s => s.gisementId !== gisementId);
  }

  async saveMultipleIngredients(): Promise<void> {
    if (!this.melange?.id || this.selectedGisements.length === 0) return;
    
    try {
      for (const selection of this.selectedGisements) {
        await this.melangeService.addIngredient({
          melange: this.melange.id,
          gisement: selection.gisementId,
          pourcentage: selection.pourcentage
        });
      }
      await this.loadMelange(this.melange.id);
      this.selectedGisements = [];
      this.showIngredientForm = false;
    } catch (err) {
      console.error('Erreur lors de l\'ajout des ingrédients:', err);
    }
  }
}
