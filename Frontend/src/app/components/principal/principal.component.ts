import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  constructor(private cookieService: CookieService) {}

  prueba: number = 7;
  textoCard1: string = 'Hola1';
  textoCard2: string = 'Hola2';
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
    console.log(this.user);
  }
}
