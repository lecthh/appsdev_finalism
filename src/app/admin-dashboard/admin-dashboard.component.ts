import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeAccordion: string | null = null;

  toggleAccordion(accordion: string): void {
    this.activeAccordion = this.activeAccordion === accordion ? null : accordion;
  }
}
