import { Component } from '@angular/core';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private drawerService: DrawerService) {}

  openDrawer(drawerKey: string) {
    console.log('Opening drawer with key:', drawerKey);
    this.drawerService.openDrawer(drawerKey);
  }
}
