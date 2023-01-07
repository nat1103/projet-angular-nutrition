import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/userService/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  registerForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
    confirmPassword: [''],
    username: ['']
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  SignUpWithGoogle() {
    this.userService.SignUpWithGoogle();
  }

  Register(email: string, password: string) {
    this.userService.Signup(email, password)
  }

  onSubmit() {
    console.log(this.registerForm.value.password);
    this.Register(this.registerForm.value.email, this.registerForm.value.password);
  }
}
