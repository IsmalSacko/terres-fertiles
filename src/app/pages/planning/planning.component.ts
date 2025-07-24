import { Component } from '@angular/core';
import { PlotlyModule } from 'angular-plotly.js';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent {
  timelineData = [
    {
      type: 'timeline',
      x: [
        ['2025-08-05', '2025-08-12'],
        ['2025-08-15', '2025-08-18'],
        ['2025-08-01', '2025-08-05'],
        ['2025-08-20', '2025-08-22'],
        ['2025-08-10', '2025-08-15'],
      ],
      y: [
        'Plateforme A',
        'Plateforme A',
        'Plateforme B',
        'Plateforme B',
        'Plateforme C'
      ],
      text: [
        'Intervention 1',
        'Intervention 2',
        'Intervention 1',
        'Intervention 2',
        'Intervention'
      ],
      mode: 'markers+lines',
      marker: { color: 'rgba(100, 100, 255, 0.5)' }
    }
  ];

  layout = {
    title: 'Calendrier des interventions',
    yaxis: { automargin: true }
  };
} 