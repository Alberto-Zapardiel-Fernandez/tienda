import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  dataFromMyComponent: any;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.dataFromMyComponent = params;
      console.log('Data from Previous Component:', this.dataFromMyComponent);
    });
  }
}
