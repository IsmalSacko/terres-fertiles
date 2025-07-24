import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningComponent } from './planning.component';
import { PlotlyModule } from 'angular-plotly.js';

@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    PlotlyModule
  ],
  exports: [PlanningComponent]
})
export class PlanningModule { } 