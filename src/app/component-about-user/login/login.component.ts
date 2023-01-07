import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != 'null') {
      this.router.navigate(['home']);
    }
  }

  async LoginWithGoogle() {
    if (await this.userService.LoginWithGoogle() == 'success') {
      this.router.navigate(['home']);
      window.location.reload();
    }
  }

  Login(email: string, password: string) {
   
    this.userService.Login(email, password).then((res) => {
      console.log(res);
    });
  }

  onSubmit() {
    this.Login(this.loginForm.value.email, this.loginForm.value.password);
  }

}
