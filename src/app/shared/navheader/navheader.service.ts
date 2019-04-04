import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavheaderService {

  menuHide: string;
  getItems: any;
  constructor() {
  }

  makeMenuTrans() {
    this.menuHide = 'menuTransparent';
  }

  hideMenuTrans() {
    this.menuHide = '';
  }
  menuItems() {
    this.getItems = JSON.parse(localStorage.getItem('menus'));
  }
}
