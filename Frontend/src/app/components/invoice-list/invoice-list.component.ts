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

  constructor(
    private clientService: ClientService,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}
  ngOnInit(): void {
    this.clientService.getClients('clients').subscribe((clients) => {
      this.clients = clients;
    });
    // Obtener las facturas desde el API
    // this.invoiceService.getInvoices().subscribe((invoices) => {
    //   this.invoices = invoices;
    //   this.filteredInvoices = [...this.invoices];
    // });
  }

  verDetalle(num_factura: number, fecha: Date, dni: string) {
    throw new Error('Method not implemented.');
  }
  buscarFacturas(cliente: any) {
    this.invoices = [];
    const fechaDesde = this.fechaDesdeSeleccionada ?? null;
    const fechaHasta = this.fechaHastaSeleccionada ?? null;
    if (!fechaDesde && !fechaHasta && !cliente) {
      alert('Selecciona algún filtro');
    }
    if (cliente && fechaDesde && fechaHasta) {
      this.invoiceService
        .getInvoices(
          `invoices?dni=${cliente.dni}&minDate=${fechaDesde}&maxDate=${fechaHasta}`
        )
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    } else if (cliente && fechaDesde) {
      this.invoiceService
        .getInvoices(`invoices?dni=${cliente.dni}&minDate=${fechaDesde}`)
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    } else if (cliente && fechaHasta) {
      this.invoiceService
        .getInvoices(`invoices?dni=${cliente.dni}&maxDate=${fechaHasta}`)
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    }
    if (fechaDesde && fechaHasta) {
      this.invoiceService
        .getInvoices(`invoices?minDate=${fechaDesde}&maxDate=${fechaHasta}`)
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    }
    if (fechaDesde) {
      this.invoiceService
        .getInvoices(`invoices?minDate=${fechaDesde}`)
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    }
    if (fechaHasta) {
      this.invoiceService
        .getInvoices(`invoices?maxDate=${fechaHasta}`)
        .subscribe({
          next: (result: InvoiceInterface[]) => {
            console.log(result);
            this.invoices = result;
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });
      return;
    }
    if (cliente) {
      this.invoiceService.getInvoices(`invoices?dni=${cliente.dni}`).subscribe({
        next: (result: InvoiceInterface[]) => {
          console.log(result);
          this.invoices = result;
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
      return;
    }
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
