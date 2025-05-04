import { Component, inject } from '@angular/core';
import { CloudflareApiService } from '../../core/services/cloudflare-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly apiService = inject(CloudflareApiService);
  private readonly router = inject(Router);

  data = [];

  async getData(): Promise<void> {
    const data = await this.apiService.getUsersRegisteredToday();
    console.log(data);
  }

  toEmpty(): void {
    this.router.navigateByUrl('/page/EMPTY');
  }
}
