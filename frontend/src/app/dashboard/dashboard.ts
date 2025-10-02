import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Activity, Plus, Clock, TrendingUp, Calendar, Dumbbell, Target } from 'lucide-angular';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { LucideAngularModule } from 'lucide-angular';

interface Stat {
  icon: any;
  title: string;
  value: string;
  color: string;
}

interface Session {
  id: number;
  type: string;
  duration: string;
  calories: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, LucideAngularModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  stats = [
    { icon: Activity, title: 'Total séances', value: '24', color: 'blue' },
    { icon: Clock, title: 'Heures ce mois', value: '18.5h', color: 'green' },
    { icon: Dumbbell, title: 'Poids actuel', value: '75 kg', color: 'purple' },
    { icon: Target, title: 'Objectif', value: '70 kg', color: 'orange' },
  ];

  // Graph data (poids)
  progressData = [
    { date: '01/09', weight: 78 },
    { date: '03/09', weight: 77.5 },
    { date: '05/09', weight: 77 },
    { date: '07/09', weight: 76.2 },
    { date: '08/09', weight: 75 },
  ];

  weeklyActivity = [
    { day: 'Lun', sessions: 2 },
    { day: 'Mar', sessions: 1 },
    { day: 'Mer', sessions: 3 },
    { day: 'Jeu', sessions: 2 },
    { day: 'Ven', sessions: 1 },
    { day: 'Sam', sessions: 4 },
    { day: 'Dim', sessions: 2 },
  ];

  recentSessions: Session[] = [
    { id: 1, type: 'Course', duration: '45 min', calories: 420, date: "Aujourd'hui" },
    { id: 2, type: 'Musculation', duration: '60 min', calories: 380, date: 'Hier' },
    { id: 3, type: 'Yoga', duration: '30 min', calories: 150, date: 'Il y a 2 jours' },
  ];

  // Graph.js config example
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.progressData.map((d) => d.date),
    datasets: [
      {
        data: this.progressData.map((d) => d.weight),
        label: 'Poids',
        fill: false,
        borderColor: '#8B5CF6',
        tension: 0.3,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
  };
}
