import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderService } from './shared/navheader/navheader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public navheaderService: NavheaderService) {
  }
  title = 'rinteger-operation';
  ngOnInit() {
    this.navheaderService.menuItems();
  }

}
