import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ClientInterface } from '../../interfaces/client.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-client',
  standalone: true,
  providers: [ClientService],
  imports: [MatTableModule, MatSortModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientList: ClientInterface[] = [];
  dataSource: any;

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
    this.dataSource = new MatTableDataSource(this.clientList);
    this.dataSource.sort = this.sort;
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
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
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

  volver() {
    this.router.navigate(['principal']);
  }
}
