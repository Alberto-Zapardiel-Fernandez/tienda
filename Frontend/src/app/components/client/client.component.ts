import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { ClientInterface } from '../../interfaces/client.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
import { Router } from '@angular/router';
@Component({
  selector: 'app-client',
  standalone: true,
  providers: [ClientService],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientList: ClientInterface[] = [];
  dataSource: any;
  verClientes: boolean = false;
  register: boolean = true;
  update: boolean = false;
  validacion: boolean = false;
  dniValue: string = '';
  readonly mail = new FormControl('', [Validators.required, Validators.email]);
  readonly nombre = new FormControl('', [Validators.required]);
  readonly apellidos = new FormControl('', [Validators.required]);
  readonly direccion = new FormControl('', [Validators.required]);
  readonly descuento = new FormControl(0);
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
  clickedRows = new Set<ClientInterface>();
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'dni',
    'phone',
    'address',
    'discount',
  ];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private clientService: ClientService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    await this.getClients();
  }

  @ViewChild(MatSort)
  sort: MatSort | null = null;

  ngAfterViewInit() {
    if (this.sort == null) {
      this.dataSource.sort = this.sort;
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.address) {
      this._liveAnnouncer.announce(`Sorted ${sortState.address}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  getClients() {
    this.clientService.getClients('clients').subscribe({
      next: (result) => {
        console.log(result);
        this.clientList = result;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });

    this.dataSource = new MatTableDataSource(this.clientList);
    this.dataSource.sort = this.sort;
  }
  //Método para hacer delete del cliente
  deleteClient(row: any) {
    let resultado = confirm(
      '¿Estás seguro de borrar el cliente?' + row.name + ' ' + row.lastName
    );
    if (resultado) {
      this.clientService.deleteClient('client', row.id).subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigate(['principal']);
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    }
  }

  //Metodo para crear o hacer update del cliente
  createOrUpdateClient() {
    let nombreValue = this.nombre.value == null ? '' : this.nombre.value;
    let apellidosValue =
      this.apellidos.value == null ? '' : this.apellidos.value;
    let direccionValue =
      this.direccion.value == null ? '' : this.direccion.value;
    let mailValue = this.mail.value == null ? '' : this.mail.value;
    let dniValue = this.dni.value == null ? '' : this.dni.value;
    let telefonoValue = this.telefono.value == null ? '' : this.telefono.value;
    let discountValue = this.descuento.value == null ? 0 : this.descuento.value;
    if (this.register) {
      this.setClient(
        nombreValue,
        apellidosValue,
        mailValue,
        direccionValue,
        dniValue,
        telefonoValue,
        discountValue
      );
    } else if (this.update) {
      this.updateClient(
        nombreValue,
        apellidosValue,
        mailValue,
        direccionValue,
        dniValue,
        telefonoValue,
        discountValue
      );
    } else {
      this.errorMessage.set('Debes seleccionar una acción');
    }
  }
  //Método para crear el cliente
  setClient(
    name: string,
    lastName: string,
    email: string,
    address: string,
    dni: string,
    phone: string,
    discount: number
  ) {
    this.clientService
      .setClient('client', {
        name,
        lastName,
        email,
        address,
        dni,
        phone,
        discount,
      })
      .subscribe({
        next: (result) => {
          console.log('Cliente creado con éxito ', result);
          this.router.navigate(['principal']);
        },
        error: (err) => {
          console.error('Error al insertar:', err);
        },
        complete: () => {
          this.validacion = true;
        },
      });
  }
  //Método para hacer update del cliente
  updateClient(
    name: string,
    lastName: string,
    email: string,
    address: string,
    dni: string,
    phone: string,
    discount: number
  ) {
    this.clientService
      .updateClient('client', {
        name,
        lastName,
        email,
        address,
        dni,
        phone,
        discount,
      })
      .subscribe({
        next: (result) => {
          console.log('Cliente creado con éxito ', result);
          this.router.navigate(['principal']);
        },
        error: (err) => {
          console.error('Error al insertar:', err);
        },
        complete: () => {
          this.validacion = true;
        },
      });
  }
  toogleRegister(event: MouseEvent): void {
    event.preventDefault();
    this.register = this.register == false ? true : false;
    this.update = this.update == false ? true : false;
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
  volver() {
    this.router.navigate(['principal']);
  }
  //Método para hacer toogle de la vista de la lista de clientes
  verListaClientes() {
    this.getClients();
    this.verClientes = this.verClientes == false ? true : false;
  }
}
