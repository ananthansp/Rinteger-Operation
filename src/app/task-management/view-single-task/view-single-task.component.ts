import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-view-single-task',
  templateUrl: './view-single-task.component.html',
  styleUrls: ['./view-single-task.component.css']
})
export class ViewSingleTaskComponent implements OnInit {
  taskholder: TaskModel[];
  id: string;
  single: string;
  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router) {


  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.single = params.get('single');
      }
    );
    this.getSingleTask();
  }


  getSingleTask() {

    this.taskManagementService.getSingleData(this.id).subscribe(data => {
      this.taskholder = data;
      console.log(this.taskholder);
    }, error => { console.log(error); }
    );
  }
  updateTask(data) {
    this.router.navigate(['task/edittask', data._id]);
  }
  Back() {
    this.router.navigate(['task/viewtask', this.single]);
  }

}
