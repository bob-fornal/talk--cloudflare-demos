import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CloudflareApiService } from '../../core/services/cloudflare-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly apiService = inject(CloudflareApiService);
  private readonly router = inject(Router);

  public emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public usernameFormControl: FormControl = new FormControl('', [Validators.required]);

  isDisabled(): boolean {
    return !this.emailFormControl.valid || !this.usernameFormControl.valid;
  }

  async save(): Promise<void> {
    const username: string = this.usernameFormControl.value;
    const email: string = this.emailFormControl.value;
    await this.apiService.postUserData(username, email);
    
    this.router.navigateByUrl('/dashboard');
  }
}
