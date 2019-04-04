
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainmenuComponent  } from './mainmenu/mainmenu.component';
const routes: Routes = [
  {
    path: 'menu',
    component: MainmenuComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
