import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
  }

  irA(numero: number) {
    switch (numero) {
      case 1:
        this.router.navigate(['/login/1']);
        break;
      case 2:
        this.router.navigate(['/client']);
        break;
      case 3:
        this.router.navigate(['/product']);
        break;
      case 4:
        this.router.navigate(['/invoice']);
        break;
      case 5:
        this.router.navigate(['/invoice-list']);
        break;
      case 6:
        this.router.navigate(['/login/2']);
        break;
      default:
        this.router.navigate(['/principal']); // Por defecto, ir a la página 1 si el número introducido no es válido.
        break;
    }
  }
}
