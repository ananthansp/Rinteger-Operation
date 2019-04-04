import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
/* import { LogIn } from '../../shared/'; */
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { Key } from 'protractor';
import { NavheaderService } from '../../shared/navheader/navheader.service';
@Component({
  selector: 'app-view-all-task',
  templateUrl: './view-all-task.component.html',
  styleUrls: ['./view-all-task.component.css']
})
export class ViewAllTaskComponent implements OnInit {
  taskholder: any;
  UnitName: any;
  taskRoleName: any;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  private dataSource;
  count;
  all;
  userid;
  userRole;
  filterWise;
  deadcount;
  studios; BSSs; technologys;
  units = [{ name: 'Studio', counts: 0 }, { name: 'BSS', counts: 0 }, { name: 'Technologies', counts: 0 }];
  @ViewChild('MatPaginator') paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);


  userId;

  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private navheaderService: NavheaderService) { }

  ngOnInit() {
    /* this.getRole(); */this.getRole();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      /*  this.userRole = params.get('role'); */
    });
    if (this.userRole === 'admin') {
      this.getAllTask();
    } else {
      this.CompareUserId();
    }
    this.navheaderService.hideMenuTrans();
    this.navheaderService.menuItems();
  }

  getAllTask() {
    this.taskManagementService.getAllTaskData().subscribe(data => {
      this.taskholder = data;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => { console.log(error); }
    );
  }
  getRole() {
    this.userRole = localStorage.getItem('role');
  }

  getUnitWiseName() {
    this.taskManagementService.getUnitWiseName().subscribe(data => {
      this.UnitName = data;
    });
  }
  /*
    getunitwiseTask(name) {
      this.taskManagementService.getunitwiseTask(name).subscribe(data => {
        this.taskholder = data;
        this.taskholder = new MatTableDataSource<any>(data);
        this.taskholder.paginator = this.paginator;
        this.taskholder = data;
        this.filterWise = this.taskholder;
        this.array = data;
        this.totalSize = this.array.length;
      }, error => {
        console.log(error);
      }
      );
    } */

  getunitwiseTask(value) {
    this.taskholder = this.filterWise.filter(data =>
      data.units === value);
  }

  filterWiseTest() {

    this.studios = this.filterWise.filter(data => data.units === 'Studio');
    this.BSSs = this.filterWise.filter(data => data.units === 'BSS');
    this.technologys = this.filterWise.filter(data => data.units === 'Technologies');
    this.units[0].counts = this.studios.length;
    this.units[1].counts = this.BSSs.length;
    this.units[2].counts = this.technologys.length;
  }

  deadlinedTask() {
    this.taskManagementService.deadlinedTask().subscribe(data => {
      this.taskholder = data;
      this.deadcount = this.taskholder.length;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
    }, error => {
      console.log(error);
    });
  }

  delete(value) {
    this.taskManagementService.DeleteTask(value).subscribe(data => {
      this.taskholder = data;
    });
  }




  /*  uniqTicket(data) {

     this.ts.uniqTicket(data).subscribe(data =>{this.ticketholder=data;
       console.log(this.ticketholder);
   },error =>{console.log(error);}
   );
   } */
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.taskholder = part;
  }

  /*  getRole() {
    localStorage.setItem('id', )
     } */

  CompareUserId() {
    /*   JSON.parse(localStorage.getItem('loginUser')); */
    this.taskManagementService.compareUserId(this.userId).subscribe(data => {
      this.taskholder = data;
      this.taskholder = new MatTableDataSource<any>(data);
      this.taskholder.paginator = this.paginator;
      this.taskholder = data;
      this.all = this.taskholder.length;
      this.filterWise = this.taskholder;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.filterWiseTest();
    }, error => { console.log(error); }
    );
  }

}
