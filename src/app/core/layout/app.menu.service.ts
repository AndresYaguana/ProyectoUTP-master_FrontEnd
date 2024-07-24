import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from './interface/menuchangeevent';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject<void>();
  private overlayOpenSource = new Subject<void>();
  private tabOpenSource = new Subject<any>();
  private tabCloseSource = new Subject<any>();

  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();
  overlayOpen$ = this.overlayOpenSource.asObservable();
  tabOpen$ = this.tabOpenSource.asObservable();
  tabClose$ = this.tabCloseSource.asObservable();

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next();
  }

  openOverlay() {
    this.overlayOpenSource.next();
  }

  openTab(tab: any) {
    this.tabOpenSource.next(tab);
  }

  closeTab(index: number) {
    this.tabCloseSource.next({ index });
  }
}
