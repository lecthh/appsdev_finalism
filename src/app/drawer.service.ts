import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawerStates: { [key: string]: Subject<boolean> } = {};

  getDrawerState(drawerKey: string) {
    if(!this.drawerStates[drawerKey]) {
      this.drawerStates[drawerKey] = new Subject<boolean>();
    }
    return this.drawerStates[drawerKey].asObservable();
  }

  openDrawer(drawerKey: string) {
    if(this.drawerStates[drawerKey]) {
      this.drawerStates[drawerKey].next(true);
    }
  }

  closeDrawer(drawerKey: string) {
    if(this.drawerStates[drawerKey]) {
      this.drawerStates[drawerKey].next(false);
    }
  }
  constructor() { }
}
