import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudflareApiService {
  private readonly http = inject(HttpClient);

  private readonly api_key: string = process.env['AUTH_KEY'] || '';
  private readonly api_path: string = 'https://cloudflare-talk-api.bob-fornal.workers.dev/api';

  public async getUsersRegisteredToday() {
    const path: string = `${this.api_path}/get-users-registered-today`;
    const urlObject = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'x-api-key': this.api_key,
      },
    };

    try {
      const result: any = await firstValueFrom(this.http.get(path, urlObject));
      return result;
    } catch (error: any) {
      console.log(error);
    }
  }

  public async postUserData(username: string, email: string) {
    const path: string = `${this.api_path}/post-user-data`;
    const body: any = { username, email };
    const urlObject = {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'x-api-key': this.api_key,
      },
    };

    try {
      await firstValueFrom(this.http.post(path, body, urlObject));
    } catch (error: any) {
      console.log(error);
    }
  }
}
