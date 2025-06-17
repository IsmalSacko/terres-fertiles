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

  generateFicheTechnique(): string {
    const formData = this.melangeForm.value;
    let ficheTechnique = '';
    
    // Ajouter les spécifications techniques (étape 6) - seulement si c'est du nouveau contenu
    if (formData.fiche_technique && formData.fiche_technique.trim() !== '') {
      // Vérifier que ce n'est pas déjà le résumé complet
      if (!formData.fiche_technique.includes('SPÉCIFICATIONS TECHNIQUES:') && 
          !formData.fiche_technique.includes('NORMES DE CONFORMITÉ:') &&
          !formData.fiche_technique.includes('CONDITIONS D\'UTILISATION:') &&
          !formData.fiche_technique.includes('CONTRÔLE QUALITÉ')) {
        ficheTechnique += `SPÉCIFICATIONS TECHNIQUES:\n${formData.fiche_technique}\n\n`;
      }
    }
    
    // Ajouter les normes de conformité (étape 2)
    if (formData.ordre_conformite && formData.ordre_conformite.trim() !== '') {
      ficheTechnique += `NORMES DE CONFORMITÉ:\n${formData.ordre_conformite}\n\n`;
    }
    
    // Ajouter les conditions d'utilisation (étape 3)
    if (formData.consignes_melange && formData.consignes_melange.trim() !== '') {
      ficheTechnique += `CONDITIONS D'UTILISATION:\n${formData.consignes_melange}\n\n`;
    }
    
    // Ajouter les contrôles qualité (étapes 4 et 5)
    if (formData.controle_1 && formData.controle_1.trim() !== '') {
      ficheTechnique += `CONTRÔLE QUALITÉ +1 MOIS:\n${formData.controle_1}\n\n`;
    }
    
    if (formData.controle_2 && formData.controle_2.trim() !== '') {
      ficheTechnique += `CONTRÔLE QUALITÉ +2 MOIS:\n${formData.controle_2}\n\n`;
    }
    
    // Ajouter la conclusion (étape 6 finale) - seulement le contenu de conclusion, pas le résumé complet
    const conclusionElement = document.getElementById('conclusion_validation') as HTMLTextAreaElement;
    if (conclusionElement && conclusionElement.value.trim() !== '') {
      // Vérifier que le contenu de conclusion ne contient pas déjà le résumé complet
      const conclusionValue = conclusionElement.value.trim();
      if (!conclusionValue.includes('SPÉCIFICATIONS TECHNIQUES:') && 
          !conclusionValue.includes('NORMES DE CONFORMITÉ:') &&
          !conclusionValue.includes('CONDITIONS D\'UTILISATION:') &&
          !conclusionValue.includes('CONTRÔLE QUALITÉ')) {
        ficheTechnique += `CONCLUSION ET VALIDATION:\n${conclusionValue}\n\n`;
      }
    }
    
    return ficheTechnique.trim();
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
    try {
      if (this.melangeForm.invalid) {
        console.error('Formulaire invalide');
        return;
      }

      const formData = this.melangeForm.value;
      console.log('Données du formulaire à sauvegarder:', formData);
      console.log('Valeurs spécifiques:');
      console.log('- ordre_conformite:', formData.ordre_conformite);
      console.log('- consignes_melange:', formData.consignes_melange);
      console.log('- controle_1:', formData.controle_1);
      console.log('- controle_2:', formData.controle_2);
      console.log('- fiche_technique:', formData.fiche_technique);

      // Préparer les données pour l'API
      let melangeData: any = {
        ...formData,
        plateforme: formData.plateforme ? parseInt(formData.plateforme) : null
      };

      // Pour les mélanges existants, ne pas envoyer les champs vides
      if (this.melange.id) {
        melangeData = {};
        
        // Ajouter seulement les champs non vides
        if (formData.nom && formData.nom.trim() !== '') {
          melangeData.nom = formData.nom;
        }
        if (formData.plateforme) {
          melangeData.plateforme = parseInt(formData.plateforme);
        }
        if (formData.fournisseur && formData.fournisseur.trim() !== '') {
          melangeData.fournisseur = formData.fournisseur;
        }
        if (formData.couverture_vegetale && formData.couverture_vegetale.trim() !== '') {
          melangeData.couverture_vegetale = formData.couverture_vegetale;
        }
        if (formData.periode_melange && formData.periode_melange.trim() !== '') {
          melangeData.periode_melange = formData.periode_melange;
        }
        if (formData.date_semis && formData.date_semis.trim() !== '') {
          melangeData.date_semis = formData.date_semis;
        }
        if (formData.references_analyses && formData.references_analyses.trim() !== '') {
          melangeData.references_analyses = formData.references_analyses;
        }
        if (formData.ordre_conformite && formData.ordre_conformite.trim() !== '') {
          melangeData.ordre_conformite = formData.ordre_conformite;
        }
        if (formData.consignes_melange && formData.consignes_melange.trim() !== '') {
          melangeData.consignes_melange = formData.consignes_melange;
        }
        if (formData.controle_1 && formData.controle_1.trim() !== '') {
          melangeData.controle_1 = formData.controle_1;
        }
        if (formData.controle_2 && formData.controle_2.trim() !== '') {
          melangeData.controle_2 = formData.controle_2;
        }
        if (formData.fiche_technique && formData.fiche_technique.trim() !== '') {
          melangeData.fiche_technique = formData.fiche_technique;
        }
      } else {
        // Pour les nouveaux mélanges, inclure les ingrédients
        melangeData.ingredients = this.melange.ingredients || [];
      }

      console.log('Données finales envoyées à l\'API:', melangeData);

      if (!this.melange.id) {
        // Créer un nouveau mélange
        console.log('Création d\'un nouveau mélange:', melangeData);
        console.log('Avant création - this.melange:', this.melange);
        this.melange = await this.melangeService.create(melangeData);
        this.isNew = false;
        console.log('Mélange créé avec succès:', this.melange);
        console.log('État du mélange créé:', this.melange.etat);
        console.log('ID du mélange créé:', this.melange.id);
        
        // Rediriger vers la page de détail du mélange créé
        this.router.navigate(['/melanges', this.melange.id]);
      } else if (this.melange.id) {
        // Mettre à jour un mélange existant
        console.log('Mise à jour du mélange:', this.melange.id, melangeData);
        this.melange = await this.melangeService.update(this.melange.id, melangeData);
        console.log('Mélange mis à jour avec succès:', this.melange);
        console.log('État du mélange mis à jour:', this.melange.etat);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      this.error = 'Erreur lors de la sauvegarde du mélange';
    }
  }

  async saveCurrentStepData(): Promise<void> {
    if (!this.melange?.id) return;
    
    try {
      const formData = this.melangeForm.value;
      console.log('Sauvegarde des données de l\'étape actuelle:', this.melange.etat);
      console.log('Données du formulaire:', formData);
      
      // Préparer les données à mettre à jour selon l'étape actuelle
      const updateData: any = {};
      
      // Ajouter le champ spécifique à l'étape actuelle
      switch (this.melange.etat) {
        case 2: // CONFORMITE
          if (formData.ordre_conformite && formData.ordre_conformite.trim() !== '') {
            updateData.ordre_conformite = formData.ordre_conformite;
          }
          break;
        case 3: // CONSIGNE
          if (formData.consignes_melange && formData.consignes_melange.trim() !== '') {
            updateData.consignes_melange = formData.consignes_melange;
          }
          break;
        case 4: // CONTROLE_1
          if (formData.controle_1 && formData.controle_1.trim() !== '') {
            updateData.controle_1 = formData.controle_1;
          }
          break;
        case 5: // CONTROLE_2
          if (formData.controle_2 && formData.controle_2.trim() !== '') {
            updateData.controle_2 = formData.controle_2;
          }
          break;
        case 6: // VALIDATION
          // Pour l'étape 6, sauvegarder seulement les champs individuels (pas fiche_technique)
          if (formData.ordre_conformite && formData.ordre_conformite.trim() !== '') {
            updateData.ordre_conformite = formData.ordre_conformite;
          }
          if (formData.consignes_melange && formData.consignes_melange.trim() !== '') {
            updateData.consignes_melange = formData.consignes_melange;
          }
          if (formData.controle_1 && formData.controle_1.trim() !== '') {
            updateData.controle_1 = formData.controle_1;
          }
          if (formData.controle_2 && formData.controle_2.trim() !== '') {
            updateData.controle_2 = formData.controle_2;
          }
          
          // Ne pas sauvegarder fiche_technique ici - il sera généré et sauvegardé séparément
          break;
      }
      
      if (Object.keys(updateData).length > 0) {
        console.log('Données à mettre à jour:', updateData);
        this.melange = await this.melangeService.patch(this.melange.id, updateData);
        console.log('Données de l\'étape sauvegardées avec succès');
      } else {
        console.log('Aucune donnée à sauvegarder pour cette étape - champs vides');
        // Ne pas faire d'appel API si aucun champ n'est rempli
        return;
      }
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde des données de l\'étape:', error);
      console.error('Détails de l\'erreur:', error.response?.data);
      console.error('Status:', error.response?.status);
      
      // Si c'est une erreur 400, on peut continuer sans sauvegarder
      if (error.response?.status === 400) {
        console.log('Erreur 400 - continuation sans sauvegarde des données de l\'étape');
      } else {
        throw error; // Relancer l'erreur si ce n'est pas une erreur 400
      }
    }
  }

  async saveAndNextStep(): Promise<void> {
    try {
      console.log('=== saveAndNextStep: Début ===');
      console.log('État initial:', this.melange.etat);
      console.log('isNew:', this.isNew);
      console.log('melange.id:', this.melange?.id);
      
      // D'abord sauvegarder le mélange avec les données actuelles
      await this.saveMelange();
      
      // Ensuite sauvegarder les données spécifiques de l'étape actuelle
      // Seulement si ce n'est pas un nouveau mélange
      if (this.melange?.id && !this.isNew) {
        try {
          await this.saveCurrentStepData();
          
          // Pour l'étape 6, générer et sauvegarder explicitement le résumé complet
          if (this.melange.etat === 6) {
            console.log('=== ÉTAPE 6: Génération du résumé complet ===');
            const ficheTechniqueComplete = this.generateFicheTechnique();
            console.log('Résumé généré:', ficheTechniqueComplete);
            
            if (ficheTechniqueComplete.trim() !== '') {
              await this.melangeService.patch(this.melange.id, {
                fiche_technique: ficheTechniqueComplete
              } as any);
              console.log('Résumé complet sauvegardé dans fiche_technique');
            }
          }
        } catch (stepError: any) {
          // Si c'est une erreur 400, on continue quand même
          if (stepError.response?.status === 400) {
            console.log('Erreur 400 lors de la sauvegarde de l\'étape - continuation...');
          } else {
            throw stepError; // Relancer les autres erreurs
          }
        }
      }
      
      console.log('=== Après saveMelange et saveCurrentStepData ===');
      console.log('État après sauvegarde:', this.melange.etat);
      console.log('melange.id après sauvegarde:', this.melange?.id);
      
      // Si c'est un nouveau mélange qui vient d'être créé, passer directement à l'état 2
      if (this.melange?.id && this.melange.etat === 1) {
        console.log('Passage à l\'état 2 (CONFORMITE)...');
        await this.melangeService.updateEtat(this.melange.id, 2); // Passer à CONFORMITE
        console.log('État mis à jour, rechargement du mélange...');
        await this.loadMelange(this.melange.id);
        console.log('État final après rechargement:', this.melange.etat);
      } else if (this.melange?.id) {
        console.log('Mélange existant, passage à l\'étape suivante...');
        // Pour les mélanges existants, passer à l'étape suivante normalement
        await this.nextStep();
      }
      
      console.log('=== saveAndNextStep: Fin ===');
      console.log('État final du mélange:', this.melange.etat);
      console.log('ID final du mélange:', this.melange.id);
      console.log('Condition workflow progress:', this.melange?.id && this.melange?.etat! >= 2);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde et passage à l\'étape suivante:', error);
      this.error = 'Erreur lors de la sauvegarde et passage à l\'étape suivante';
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

  isWorkflowCompleted(): boolean {
    return this.melange?.etat === 6;
  }
}
