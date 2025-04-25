import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudflareApiService {
  private readonly api_key: string = process.env['AUTH_KEY'] || '';
  private readonly api_path: string = 'https://database-tool.bob-fornal.workers.dev/api';

  public async getUsersRegisteredToday() {
    const result = await fetch(`${this.api_path}/get-users-registered-today`, {
      method: 'GET',
      headers: {
        'x-api-key': this.api_key,
      },
    });
  }

  public async postUserData(username: string, email: string) {
    const result = await fetch(`${this.api_path}/post-user-data`, {
      method: 'POST',
      headers: {
        'x-api-key': this.api_key,
      },
      body: JSON.stringify({ username, email }),
    });
  }
}
