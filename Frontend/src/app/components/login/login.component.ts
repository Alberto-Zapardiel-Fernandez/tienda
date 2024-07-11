import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userList: UserInterface[] = [];
  readonly mail = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  errorMessage = signal('');
  hide = signal(true);
  email: string = '';
  pass: string = '';
  check: boolean = false;
  validacion: boolean = false;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  updateErrorMessage() {
    if (this.mail.hasError('required')) {
      this.errorMessage.set('Debes introducir un email correcto');
    } else if (this.mail.hasError('email')) {
      this.errorMessage.set('No es un email válido');
    } else {
      this.errorMessage.set('');
    }
  }
  //Método para el login del usuario
  login() {
    console.log(this.email, this.pass);
    // Validación de los datos
    this.validacion = this.validar();
    if (this.validacion) {
      // Código para el login
      this.getUser(this.email, this.pass);
    }
  }
  //Método para obtener un usuario específico por email y contraseña
  getUser(email: string, pass: string) {
    this.userService.getUser('user/byEmailAndPass', { email, pass }).subscribe({
      next: (result) => {
        console.log(result === 1 ? 'Encontrado' : 'No encontrado');
        //TODO Ver el checkbox para guardar en el storage y tirar adelante
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  //Método para validar el login del usuario
  validar(): boolean {
    if (this.email === '' || this.pass === '') {
      alert('Debes llenar todos los campos');
      return false;
    }
    // Validación del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Debes ingresar un email válido');
      return false;
    }
    return true;
  }
  //Método para cambiar el estado del checkbox
  onCheckboxChange() {
    this.check = this.check ? true : false;
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
