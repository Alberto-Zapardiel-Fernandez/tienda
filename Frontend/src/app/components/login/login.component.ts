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
import { MatSelectModule } from '@angular/material/select';
import { CookieService } from 'ngx-cookie-service';

import { Router, ActivatedRoute } from '@angular/router';

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
    MatSelectModule,
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
  readonly rol = new FormControl('', [Validators.required]);
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
  update: boolean = false;
  validacion: boolean = false;
  email: string = '';
  pass: string = '';
  nombreValue: string = '';
  apellidosValue: string = '';
  dniValue: string = '';
  rolValue: string = '0';
  telefonoValue: string = '';
  register: boolean = false;
  prueba: any;
  id: string = '';
  user: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    //Miro a ver si vengo con parámetro, si vengo es porque vengo a actualizar usuario
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id == '1') {
        this.update = true;
      }
    });
    this.user = this.cookieService.get('user');
    if (this.user == '') {
      console.log('Vacio');
    } else if (this.id != '1' && this.id != '2') {
      this.user = JSON.parse(this.user);
      this.router.navigate(['/principal']);
    }
    //Al entrar, si vengo para hacer el update borro la cookie
    if (this.update) {
      this.cookieService.delete('user');
    }
    //Obtengo los usuarios
    this.getUsers();
  }
  toogleRegister(event: MouseEvent): void {
    event.preventDefault();
    this.register = this.register == false ? true : false;
    this.router.navigate(['/login']);
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
    if (this.register || this.update) {
      this.nombreValue = this.nombre.value == null ? '' : this.nombre.value;
      this.apellidosValue =
        this.apellidos.value == null ? '' : this.apellidos.value;
      this.dniValue = this.dni.value == null ? '' : this.dni.value;
      this.telefonoValue =
        this.telefono.value == null ? '' : this.telefono.value;
      if (!this.register || this.update) {
        this.rolValue = this.rol.value == null ? '' : this.rol.value;
      }
    }
    // Validación de los datos
    this.validacion = this.validar();
    if (this.validacion) {
      if (this.update) {
        this.updateUser(
          this.nombreValue,
          this.apellidosValue,
          this.email,
          this.pass,
          this.rolValue,
          this.dniValue,
          this.telefonoValue
        );
        // Redirigir a PrincipalComponent
        this.router.navigate(['/login']);
        return;
      }
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
  updateUser(
    name: string,
    lastName: string,
    email: string,
    pass: string,
    rol: string,
    dni: string,
    phone: string
  ) {
    this.userService
      .updateUser('user', {
        name: name,
        lastName: lastName,
        email: email,
        pass: pass,
        rol: parseInt(rol),
        dni: dni,
        phone: phone,
      })
      .subscribe({
        next: (result) => {
          // Maneja el inicio de sesión exitoso
          console.log('Usuario actualizado con éxito:', result);
          const usuario: UserInterface = this.setUserData(result);
          this.cookieService.delete('user');
          this.cookieService.set('user', JSON.stringify(usuario));
          // Redirigir a PrincipalComponent
        },
        error: (error) => {
          // Maneja el error de inicio de sesión
          console.error('Error al actualizar el usuario:', error);
          // Puedes mostrar un mensaje de error al usuario
        },
      });
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
          this.cookieService.delete('user');
          //Borramos la cookie si la hubiera para guardar el nuevo user, entonces reedirigimos
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
          this.cookieService.delete('user');
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

  verUsuarios() {
    this.getUsers();
    this.router.navigate(['/user-list']);
  }
}
