import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { ProduitVenteService, ProduitVente } from '../services/produit-vente.service';

@Component({
  selector: 'app-produit-vente-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  templateUrl: './produit-vente-list.component.html',
  styleUrls: ['./produit-vente-list.component.css']
})
export class ProduitVenteListComponent implements OnInit {
  produits: ProduitVente[] = [];
  filteredProduits: ProduitVente[] = [];
  displayedColumns: string[] = [
    'reference_produit',
    'nom_site',
    'chantier_origine',
    'fournisseur',
    'volume_initial',
    'volume_disponible',
    'statut',
    'date_disponibilite'
  ];

  // Pagination
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  loading = false;

  // Filtres
  searchTerm = '';
  selectedStatut = '';

  constructor(private produitService: ProduitVenteService) {}

  async ngOnInit(): Promise<void> {
    await this.loadProduits();
  }

  private async loadProduits(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.produitService.getProduits(this.currentPage + 1, this.pageSize);
      this.produits = response.results || [];
      this.totalItems = response.count;
      this.filteredProduits = [...this.produits];
      this.filterByStatut();
    } catch (error: unknown) {
      console.error('Erreur lors du chargement des produits:', error);
      this.produits = [];
      this.filteredProduits = [];
    } finally {
      this.loading = false;
    }
  }

  async applyFilter(): Promise<void> {
    if (this.searchTerm) {
      try {
        const response = await this.produitService.searchProduits(this.searchTerm);
        this.produits = response.results || [];
        this.filterByStatut();
      } catch (error: unknown) {
        console.error('Erreur lors de la recherche:', error);
        this.produits = [];
        this.filteredProduits = [];
      }
    } else {
      this.filterByStatut();
    }
  }

  private filterByStatut(): void {
    if (!this.produits) {
      this.filteredProduits = [];
      return;
    }

    this.filteredProduits = this.produits.filter(produit => {
      if (!this.selectedStatut) return true;
      
      const statut = this.getStatutProduit(produit).toLowerCase();
      return statut === this.selectedStatut;
    });
  }

  async onPageChange(event: PageEvent): Promise<void> {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.loadProduits();
  }

  sortData(sort: Sort): void {
    const data = this.filteredProduits.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredProduits = data;
      return;
    }

    this.filteredProduits = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'reference_produit':
          return this.compare(a.reference_produit, b.reference_produit, isAsc);
        case 'nom_site':
          return this.compare(a.nom_site, b.nom_site, isAsc);
        case 'melange':
          return this.compare(a.melange.toString(), b.melange.toString(), isAsc);
        case 'volume_disponible':
          return this.compare(parseFloat(a.volume_disponible), parseFloat(b.volume_disponible), isAsc);
        case 'statut':
          return this.compare(this.getStatutProduit(a), this.getStatutProduit(b), isAsc);
        case 'date_disponibilite':
          return this.compare(new Date(a.date_disponibilite), new Date(b.date_disponibilite), isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getStatutProduit(produit: ProduitVente): string {
    if (produit.volume_vendu && produit.volume_initial && 
        parseFloat(produit.volume_vendu) >= parseFloat(produit.volume_initial)) {
      return 'Vendu';
    } else if (produit.volume_vendu && parseFloat(produit.volume_vendu) > 0) {
      return 'Partiellement vendu';
    } else {
      return 'Disponible';
    }
  }

  getStatutColor(produit: ProduitVente): string {
    const statut = this.getStatutProduit(produit);
    switch (statut) {
      case 'Vendu':
        return '#f44336';
      case 'Partiellement vendu':
        return '#ff9800';
      default:
        return '#4caf50';
    }
  }
}
