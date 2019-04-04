import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavheaderService } from './../../shared/navheader/navheader.service';
import { AccountService } from './../../account/account.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFailed = false;
  constructor(public navheaderService: NavheaderService, private accountService: AccountService, private fb: FormBuilder,
    private router: Router) {
    this.navheaderService.makeMenuTrans();
  }
  onLoginForm: FormGroup;
  login: LogIn;
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.onLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginSubmit() {
    this.login = new LogIn();
    this.login.userName = this.onLoginForm.controls.userName.value;
    this.login.password = this.onLoginForm.controls.password.value;
    this.accountService.logIn(this.login).subscribe(data => {
      if (data.length !== 0
      ) {
        localStorage.setItem('loginUser', 'true');
        localStorage.setItem('menus', JSON.stringify(data[0].userdetails));
        localStorage.setItem('role', data[0].role);
        localStorage.setItem('userId', data[0]._id);
        if (localStorage.getItem('role') !== 'admin') {
          this.router.navigate(['./task/viewtask', data[0]._id]);
        } else {
          this.router.navigate(['./lead/leadview']);
        }
      } else {
        this.loginFailed = true;
      }
    }, error => {
      this.loginFailed = true;
      console.log(error);
    });
  }
}
