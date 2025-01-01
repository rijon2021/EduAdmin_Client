import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './account/auth/login/login.component';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
// import { SubscriptionLayoutComponent } from './account/subscription/subscription-layout/subscription-layout.component';
// import { StudentSubscriptionComponent } from './account/subscription/student-subscription/student-subscription.component';
// import { Page404Component } from './extrapages/page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: 'LoginComponent', pathMatch: 'full'},
  // { path: 'subscription', component: StudentSubscriptionComponent },
  // { path: 'subscription', component: SubscriptionLayoutComponent, loadChildren: () => import('./account/subscription/subscription.module').then(m => m.SubscriptionModule) },
  { path: 'login', component: LoginComponent, },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), },

  // tslint:disable-next-line: max-line-length
  // { path: 'dashboard', component: LayoutComponent, loadChildren: () => import('./modules/feature/dashboard/dashboards.module').then(m => m.DashboardsModule), canActivate: [AuthGuard] },
  { path: '', component: LayoutComponent, loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule), canActivate: [AuthGuard] },
  { path: 'settings', component: LayoutComponent, loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'feature', component: LayoutComponent, loadChildren: () => import('./modules/feature/feature.module').then(m => m.FeatureModule) },
  // { path: 'pages', loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), canActivate: [AuthGuard] },
  // { path: 'crypto-ico-landing', component: CyptolandingComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
