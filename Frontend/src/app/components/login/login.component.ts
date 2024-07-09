import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userList: UserInterface[] = [];

  name = new FormControl('', [Validators.required]);
  pass = new FormControl('', [Validators.required]);
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }

  onSubmit() {
    console.log(`Usuario: ${this.name}, Contraseña: ${this.pass}`);
  }
  //Método pàra hacer login
  hacerLogin(name: any, pass: any) {
    console.log(name, pass);
  }

  //Método para obtener los usuarios
  getUsers() {
    this.userService.getUsers('users').subscribe({
      next: (result) => {
        console.log(result);
        this.userList = result;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
}
