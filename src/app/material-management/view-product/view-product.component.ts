import { Component, OnInit, Input } from '@angular/core';
import { MaterialModel } from './../../shared/material-management.model';
@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  @Input() productData: MaterialModel;
  constructor() { }

  ngOnInit() {
  }

}
