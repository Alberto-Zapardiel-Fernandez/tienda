import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInterface } from '../../interfaces/client.interface';
import { InvoiceInterface } from '../../interfaces/invoice.interface';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { DetailInterface } from '../../interfaces/detail.interface';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  dniSearch: string = '';
  invoices: InvoiceInterface[] = [];
  clients: ClientInterface[] = [];
  mostrarCliente: boolean = true;
  terminoBusqueda: string = '';
  clientesFiltrados: ClientInterface[] = [];
  clienteSeleccionado: ClientInterface | undefined;
  fechaDesdeSeleccionada?: Date;
  fechaHastaSeleccionada?: Date;
  detailList: DetailInterface[] = [];

  constructor(
    private clientService: ClientService,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.clientService.getClients('clients').subscribe((clients) => {
      this.clients = clients;
    });
  }

  verDetalle(num_factura: number) {
    this.invoiceService
      .getDetail(`detailByInvoiceId?id=${num_factura}`)
      .subscribe({
        next: (result: DetailInterface[]) => {
          this.detailList = result;
          //TODO En result está la lista de detalle, crear el modal para imprimir
          //Acordarse de sumar los importes para sacar el total y después meter en todo lo del descuento del cliente
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
  }
  buscarFacturas(cliente: any) {
    const fechaDesde = this.fechaDesdeSeleccionada ?? null;
    const fechaHasta = this.fechaHastaSeleccionada ?? null;
    if (cliente == undefined) {
      alert('Selecciona un cliente de la lista');
      return;
    }
    if (!cliente && !fechaDesde && !fechaHasta) {
      alert('Selecciona al menos 1 filtro');
      return;
    }
    const url = `invoices?${cliente ? `dni=${cliente.dni}&` : ''}${
      fechaDesde ? `minDate=${fechaDesde}&` : ''
    }${fechaHasta ? `maxDate=${fechaHasta}` : ''}`;

    this.invoiceService.getInvoices(url).subscribe({
      next: (result: InvoiceInterface[]) => {
        this.invoices = result;
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }
  goToClients() {
    this.router.navigate(['/client']);
  }
  buscarCliente() {
    this.clientesFiltrados = this.clients.filter(
      (cliente) =>
        cliente.name
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        cliente.dni.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }
  borrarCliente() {
    this.clienteSeleccionado = undefined;
    this.mostrarCliente = true;
  }
  seleccionaCliente(cliente: ClientInterface) {
    this.clienteSeleccionado = cliente;
    this.clientesFiltrados = [];
  }
  volver() {
    this.router.navigate(['/principal']);
  }
}
