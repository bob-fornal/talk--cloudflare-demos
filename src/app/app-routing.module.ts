import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageComponent } from './pages/page/page.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import { SplitTestComponent } from './pages/split-test/split-test.component';
import { CookieComponent } from './pages/cookie/cookie.component';

const routes: Routes = [
  { path: 'cookie', component: CookieComponent },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'page/EMPTY', component: PageComponent },
  { path: 'page/:user-id', component: PageComponent },

  { path: 'redirect', component: RedirectComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'split-test', component: SplitTestComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
