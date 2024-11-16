import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserInterface } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userList: UserInterface[] = [];
  dataSource: any;

  clickedRows = new Set<UserInterface>();
  displayedColumns: string[] = ['name', 'lastName', 'email', 'dni', 'phone'];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private userService: UserService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    //Tomo los usuarios y me aseguro de que haya con await
    await this.getUsers();
    this.dataSource = new MatTableDataSource(this.userList);
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
    if (sortState.address) {
      this._liveAnnouncer.announce(`Sorted ${sortState.address}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //Método para obtener los usuarios
  getUsers() {
    this.userService.getUsers('users').subscribe({
      next: (result) => {
        this.userList = result;
        if (this.userList.length > 0) {
          this.dataSource = new MatTableDataSource(this.userList);
        } else {
          console.error('No se encontraron usuarios');
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      },
    });
  }

  //Método para hacer delete del usuario
  deleteUser(row: any) {
    let resultado = confirm(
      '¿Estás seguro de borrar el usuario?' + row.name + ' ' + row.lastName
    );
    if (resultado) {
      this.userService.deleteUser('user', row.id).subscribe({
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
    this.router.navigate(['login/1']);
  }
}
