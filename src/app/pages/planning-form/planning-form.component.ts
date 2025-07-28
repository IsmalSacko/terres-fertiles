import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MelangeModel } from '../planning/melange.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {PlanningService} from '../../services/planning/planning.service';

@Component({
  selector: 'app-planning-form',
  templateUrl: './planning-form.component.html',
  styleUrls: ['./planning-form.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PlanningFormComponent {

  melange!: {
    id: number;
    titre: string;
    date_debut: string;
    duree_jours: number;
    statut: string;
    melange: number;
    melange_nom: string
  };
  constructor(
    public dialogRef: MatDialogRef<PlanningFormComponent>,
    private service : PlanningService,
    @Inject(MAT_DIALOG_DATA) public data: { melange: MelangeModel }
  ) {
    this.melange = { ...data.melange };

  }

  onSave() {
    // Tu peux faire une vérification ici si nécessaire
    this.dialogRef.close(this.melange); // envoie les données au parent
  }
  onDelete() {
    this.data.melange.statut = 'deleted';
    this.service.deletePlanning(
      this.data.melange.id
    ).then(() => {
      console.log('Planning supprimé avec succès');
    }).catch(error => {
      console.error('Erreur lors de la suppression du planning:', error);
    });

    this.dialogRef.close(this.data.melange);
  }

  onCancel() {
    this.dialogRef.close(); // annule
  }
}
