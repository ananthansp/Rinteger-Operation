import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../shared/task-management.model';
import { TaskManagementService } from './../task-management.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskholder: TaskModel[];
  taskEdit: any;
  taskForm: FormGroup;
  id;
  units = ['studio', 'BSS', 'technology'];
  priority = ['low', 'medium', 'high', 'critical'];
  department = ['studio', 'BSS', 'technology'];
  assignedBy = ['teamleader1', 'teamleader2'];
  assignedTo = ['worker1', 'worker2'];
  userId: string;
  userRole: string;
  editview;
  constructor(private taskManagementService: TaskManagementService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
      this.createtask();
      this.getAllTask();
  }

  createtask() {
    this.taskForm = this.fb.group({
    taskNo: [''],
    dateTime: [''],
    taskTitle: [''],
    taskDescription: [''],
    priority: [''],
    units: [''],
    department: [''],
    assignedTo: [''],
    assignedBy: [''],
    status: [''],
    toCloseDate: [''],
    closedDate: ['']
    });
  }



  getAllTask() {

    this.taskManagementService.getAllTaskData().subscribe(data => {
    this.taskholder = data;
    this.taskholder.forEach((customer) => {
      if (this.id === customer._id) {
        this.taskEdit = customer;

      console.log(this.taskEdit);
// tslint:disable-next-line: no-unused-expression
    } error => {
      console.log(error);
    };

  });
});
} 
updateTask(value) {
  this.taskManagementService.UpdateTask(value).subscribe(data => {
    this.taskEdit = data;
    this.router.navigate(['task/viewtask', this.editview]);
  }, error => {
    console.log(error);
  });
}

cancel() {
  this.router.navigate(['task/viewtask', this.editview]);
}
}
