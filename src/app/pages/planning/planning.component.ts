import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningService } from '../../services/planning/planning.service';
import { MelangeModel } from './melange.model';
import { PlanningFormComponent } from '../planning-form/planning-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PlanningComponent implements OnInit {
  constructor(private planningService: PlanningService, private dialog: MatDialog) {}

  melanges: MelangeModel[] = [];
  selectedMelanges: MelangeModel[] = [];
  loading = true;
  error: string | null = null;
  currentYear: number = new Date().getUTCFullYear();
  allMelanges: MelangeModel[] = [];
  months: string[] = [
    'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
    'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'
  ];

  weeksInMonth: { [month: string]: number[] } = {};
  interventions: {
    responsable: string;
    melange: string;
    week: number;
    month: string;
    note: string;
    date: string;
  }[] = [];

  years: number[] = [];
  hoveredNote: string | null = null;
  hoveredIntervention: any | null = null;

  async ngOnInit() {
    const currentYear = new Date().getUTCFullYear();
    for (let i = currentYear - 3; i <= currentYear + 5; i++) {
      this.years.push(i);
    }

    this.buildWeeksInMonth();

    try {
      this.allMelanges = await this.planningService.getPlannings();
      this.melanges = this.allMelanges.filter(m => new Date(m.date_debut).getUTCFullYear() === this.currentYear);
      this.updateInterventions();
    } catch (err) {
      console.error(err);
      this.error = 'Erreur lors du chargement des plannings';
    } finally {
      this.loading = false;
    }
  }

  onYearChange() {
    // forcer la conversion en number avec + ou parseInt
    const yearNum = +this.currentYear; // OU parseInt(this.currentYear, 10)

    this.melanges = this.allMelanges.filter(m => {
      const d = new Date(m.date_debut);
      console.log('Date:', m.date_debut, 'Local year:', d.getFullYear(), 'UTC year:', d.getUTCFullYear());
      return d.getUTCFullYear() === yearNum;
    });
    console.log(`Année changée: ${yearNum}, nombre de plannings filtrés: ${this.melanges.length}`);
    this.buildWeeksInMonth();
    this.updateInterventions();
  }

  daysInWeekMonth: { [month: string]: { [week: number]: string[] } } = {};

  buildWeeksInMonth() {
    this.weeksInMonth = {};
    this.daysInWeekMonth = {};

    this.months.forEach((month, index) => {
      const firstDay = new Date(this.currentYear, index, 1);
      const lastDay = new Date(this.currentYear, index + 1, 0);

      const weeks = new Set<number>();
      const daysByWeek: { [week: number]: string[] } = {};

      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        const [_, week] = this.getWeekNumber(new Date(d));
        weeks.add(week);

        if (!daysByWeek[week]) {
          daysByWeek[week] = [];
        }
        // Format jour en "01", "02", etc.
        daysByWeek[week].push(d.getDate().toString().padStart(2, '0'));
      }

      this.weeksInMonth[month] = Array.from(weeks);
      this.daysInWeekMonth[month] = daysByWeek;
    });
  }

  updateInterventions() {
    this.interventions = this.melanges
        .filter(m => {
          const year = new Date(m.date_debut).getUTCFullYear();
          return year === this.currentYear;
        })
        .map(m => {
          const date = new Date(m.date_debut);
          const [_, week] = this.getWeekNumber(date);
          const month = this.months[date.getMonth()];
          return {
            melange: m.melange_nom,
            responsable: m.responsable || 'N/A',
            week,
            month,
            note: m.titre,
            date: m.date_debut
          };
        });
    console.log('Interventions mises à jour:', this.interventions.length);
  }

  getWeekNumber(date: Date): [number, number] {
    const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
  }

  getPlateformesFromInterventions(): string[] {
    const nomsUniques = new Set(this.melanges.map(m => m.melange_nom));
    return Array.from(nomsUniques);
  }

  hasAnyIntervention(melange: string): boolean {
    return this.interventions.some(i => i.melange === melange);
  }



  getNote(melange: string, week: number, month: string): string | null {
    const found = this.interventions.find(i =>
        i.melange === melange && i.week === week && i.month === month
    );
    return found ? found.note : null;
  }

  onCellHover(plateforme: string, week: number, month: string): void {
    const intervention = this.interventions.find(i =>
        i.melange === plateforme &&
        i.week === week &&
        i.month === month
    );
    this.hoveredIntervention = intervention ?? null;
  }

  onCellLeave(): void {
    this.hoveredIntervention = null;
  }

/*  onCellClick(melangeNom: string, week: number, month: string) {
    const melangeObj = this.melanges.find(m => m.melange_nom === melangeNom);
    if (!melangeObj) {
      console.error('Mélange introuvable pour le nom:', melangeNom);
      return;
    }
    const melangeId = melangeObj.melange;

    this.selectedMelanges = this.melanges.filter(m => {
      const date = new Date(m.date_debut);
      const [_, w] = this.getWeekNumber(date);
      const mth = this.months[date.getMonth()];
      return m.melange === melangeId && w === week && mth === month;
    });

    if (this.selectedMelanges.length === 0) {
      const monthIndex = this.months.indexOf(month);
      const firstDayOfMonth = new Date(Date.UTC(this.currentYear, monthIndex, 1));
      const dayOffset = (week - this.getWeekNumber(firstDayOfMonth)[1]) * 7;
      const dateDebut = new Date(firstDayOfMonth);
      dateDebut.setUTCDate(firstDayOfMonth.getUTCDate() + dayOffset);

      const dialogRef = this.dialog.open(PlanningFormComponent, {
        width: '500px',
        data: {
          melange: {
            id: 0,
            titre: '',
            date_debut: dateDebut.toISOString().substring(0, 10),
            duree_jours: 1,
            statut: 'pending',
            melange: melangeId,
            melange_nom: melangeNom
          }
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.planningService.createPlanning(result)
              .then(() => this.planningService.getPlannings())
              .then(plannings => {
                this.melanges = plannings;
                this.updateInterventions();
              })
              .catch(err => {
                console.error('Erreur lors de la création du planning:', err);
              });
        }
      });
    }
  }*/

  onCellClick(melangeNom: string, week: number, month: string) {
    const melangeObj = this.melanges.find(m => m.melange_nom === melangeNom);
    if (!melangeObj) {
      console.error('Mélange introuvable pour le nom:', melangeNom);
      return;
    }
    const melangeId = melangeObj.melange;

    // Trouver l'intervention existante sur cette cellule
    const existingIntervention = this.melanges.find(m => {
      const date = new Date(m.date_debut);
      const [_, w] = this.getWeekNumber(date);
      const mth = this.months[date.getMonth()];
      return m.melange === melangeId && w === week && mth === month;
    });

    // Calcul date début de la semaine/mois sélectionné pour création si nécessaire
    const monthIndex = this.months.indexOf(month);
    const firstDayOfMonth = new Date(Date.UTC(this.currentYear, monthIndex, 1));
    const dayOffset = (week - this.getWeekNumber(firstDayOfMonth)[1]) * 7;
    const dateDebut = new Date(firstDayOfMonth);
    dateDebut.setUTCDate(firstDayOfMonth.getUTCDate() + dayOffset);

    // Ouvrir la modale avec les données existantes ou nouvelle intervention
    const dialogRef = this.dialog.open(PlanningFormComponent, {
      width: '500px',
      data: {
        melange: existingIntervention ? { ...existingIntervention } : {
          id: 0,
          titre: '',
          date_debut: dateDebut.toISOString().substring(0, 10),
          duree_jours: 1,
          statut: 'pending',
          melange: melangeId,
          melange_nom: melangeNom
        }
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          if (result.id && result.id !== 0) {
            // Modification ou suppression
            if (result.statut === 'deleted') {
              await this.planningService.deletePlanning(result.id);
            } else {
              await this.planningService.updatePlanning(result);
            }
          } else {
            // Création
            await this.planningService.createPlanning(result);
          }
          // Recharger plannings et rafraîchir l'affichage
          this.allMelanges = await this.planningService.getPlannings();
          this.melanges = this.allMelanges.filter(m => {
            const d = new Date(m.date_debut);
            return d.getUTCFullYear() === this.currentYear;
          });
          this.updateInterventions();
        } catch (err) {
          console.error('Erreur lors de la sauvegarde du planning:', err);
        }
      }
    });
  }


  getNomMelangeById(id: number): string {
    const found = this.melanges.find(m => m.melange === id);
    return found ? found.melange_nom || '' : '';
  }

  hasIntervention(melange: string, week: number, month: string): boolean {
    return this.interventions.some(i =>
        i.melange === melange && i.week === week && i.month === month
    );
  }
}

