import { Component, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
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
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [
    CommonModule,
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
  readonly nombre = new FormControl('', [Validators.required]);
  readonly apellidos = new FormControl('', [Validators.required]);
  readonly dni = new FormControl('', [
    Validators.required,
    Validators.maxLength(9),
    Validators.minLength(9),
  ]);
  readonly telefono = new FormControl('', [
    Validators.required,
    Validators.maxLength(13),
    Validators.minLength(8),
  ]);
  errorMessage = signal('');
  hide = signal(true);
  check: boolean = false;
  validacion: boolean = false;
  email: string = '';
  pass: string = '';
  nombreValue: string = '';
  apellidosValue: string = '';
  dniValue: string = '';
  telefonoValue: string = '';
  register: boolean = false;
  prueba: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }
  toogleRegister(event: MouseEvent): void {
    event.preventDefault();
    this.register = this.register == false ? true : false;
    this.nombreValue = '';
    this.apellidosValue = '';
    this.dniValue = '';
    this.telefonoValue = '';
    this.mail.reset();
    this.password.reset();
    this.errorMessage.set('');
    this.validacion = false;
  }
  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  updateErrorMessage() {
    if (this.mail.hasError('required')) {
      this.errorMessage.set('Debes introducir un valor correcto');
    } else if (this.mail.hasError('email')) {
      this.errorMessage.set('No es un email válido');
    } else {
      this.errorMessage.set('');
    }
  }
  //Método para el login del usuario
  login() {
    this.email = this.mail.value == null ? '' : this.mail.value;
    this.pass = this.password.value == null ? '' : this.password.value;
    //Si vamos a registrar, guardamos los valores que hay puestos
    if (this.register) {
      this.nombreValue = this.nombre.value == null ? '' : this.nombre.value;
      this.apellidosValue =
        this.apellidos.value == null ? '' : this.apellidos.value;
      this.dniValue = this.dni.value == null ? '' : this.dni.value;
      this.telefonoValue =
        this.telefono.value == null ? '' : this.telefono.value;
    }
    // Validación de los datos
    this.validacion = this.validar();
    if (this.validacion) {
      // Código para el login o registro
      !this.register
        ? this.getUser(this.email, this.pass)
        : this.setUser(
            this.nombreValue,
            this.apellidosValue,
            this.email,
            this.pass,
            0,
            this.dniValue,
            this.telefonoValue
          );
    }
  }

  setUser(
    name: string,
    lastName: string,
    email: string,
    pass: string,
    rol: number,
    dni: string,
    phone: string
  ) {
    this.userService
      .setUser('user', {
        name,
        lastName,
        email,
        pass,
        rol,
        dni,
        phone,
      })
      .subscribe({
        next: (result) => {
          // Maneja el inicio de sesión exitoso
          console.log('Usuario creado con éxito:', result);
          const usuario: UserInterface = this.setUserData(result);
          this.cookieService.set('user', JSON.stringify(usuario));
          // Redirigir a PrincipalComponent
          this.router.navigate(['/principal']);
        },
        error: (error) => {
          // Maneja el error de inicio de sesión
          console.error('Error al registrarse:', error);
          // Puedes mostrar un mensaje de error al usuario
        },
      });
  }
  //Método para obtener un usuario específico por email y contraseña
  getUser(email: string, pass: string) {
    this.userService.getUser('user/byEmailAndPass', { email, pass }).subscribe({
      next: (result) => {
        console.log(result);
        if (result.id != null) {
          const usuario: UserInterface = this.setUserData(result);
          this.cookieService.set('user', JSON.stringify(usuario));
          this.router.navigate(['/principal']);
        } else {
          this.errorMessage.set('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  private setUserData(result: any): UserInterface {
    return {
      id: result.id,
      name: result.name,
      lastName: result.lastName,
      email: result.email,
      pass: '',
      rol: result.rol,
      dni: result.dni,
      phone: result.dni,
    };
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
