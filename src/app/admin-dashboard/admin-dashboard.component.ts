import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  //subject offer
  isSubjOfferOpen = false;

  openSubjOffer() {
    this.isSubjOfferOpen = true;
  }

  closeSubjOffer() {
    this.isSubjOfferOpen = false;
  }
}
