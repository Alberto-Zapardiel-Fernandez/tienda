import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  constructor(private cookieService: CookieService) {}
  user: any;
  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('user'));
    console.log(this.user);
  }
}
