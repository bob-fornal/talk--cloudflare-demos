import { Component, inject } from '@angular/core';
import { CloudflareApiService } from '../../core/services/cloudflare-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly apiService = inject(CloudflareApiService);

  data = [];

  async getData(): Promise<void> {
    const data = await this.apiService.getUsersRegisteredToday();
    console.log(data);
  }
}
