import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PageComponent } from './pages/page/page.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { SplitTestComponent } from './pages/split-test/split-test.component';
import { SetupComponent } from './pages/split-test/setup/setup.component';
import { CookieComponent } from './pages/cookie/cookie.component';

@NgModule({
  declarations: [
    AppComponent,

    DashboardComponent,
    RegisterComponent,
    PageComponent,
    RedirectComponent,
    SplitTestComponent,
    SetupComponent,
    CookieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
