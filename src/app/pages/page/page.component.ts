import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  private readonly router = inject(Router);

  imagePath: string = '';

  back(): void {
    this.router.navigateByUrl('/dashboard');
  };
}
