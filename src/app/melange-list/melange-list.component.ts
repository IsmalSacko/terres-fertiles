import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MelangeService, Melange, MelangeEtat } from '../services/melange.service';

@Component({
  selector: 'app-melange-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './melange-list.component.html',
  styleUrl: './melange-list.component.css'
})
export class MelangeListComponent implements OnInit {
  melanges: Melange[] = [];
  loading = true;
  error = '';

  constructor(private melangeService: MelangeService) {}

  ngOnInit(): void {
    this.loadMelanges();
  }

  async loadMelanges(): Promise<void> {
    try {
      this.loading = true;
      this.melanges = await this.melangeService.getAll();
    } catch (err) {
      this.error = 'Erreur lors du chargement des mélanges';
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

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

  async previousStep(melange: Melange): Promise<void> {
    if (melange.etat > 1 && melange.id) {
      try {
        await this.melangeService.updateEtat(melange.id, melange.etat - 1);
        await this.loadMelanges();
      } catch (err) {
        console.error('Erreur lors du changement d\'état:', err);
      }
    }
  }

  async nextStep(melange: Melange): Promise<void> {
    if (melange.etat < 6 && melange.id) {
      try {
        await this.melangeService.updateEtat(melange.id, melange.etat + 1);
        await this.loadMelanges();
      } catch (err) {
        console.error('Erreur lors du changement d\'état:', err);
      }
    }
  }
}
