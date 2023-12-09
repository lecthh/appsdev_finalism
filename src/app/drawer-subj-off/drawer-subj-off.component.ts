import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'app-drawer-subj-off',
  templateUrl: './drawer-subj-off.component.html',
  styleUrls: ['./drawer-subj-off.component.css']
})
export class DrawerSubjOffComponent implements OnDestroy{
  private subscription: Subscription;

  constructor(private drawerService: DrawerService) {
    this.subscription = this.drawerService.getDrawerState('drawer-subj-off').subscribe((isOpen) => {
      // Handle the drawer state change (open/close) for drawer 1
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
