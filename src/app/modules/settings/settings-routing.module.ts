import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { UserLevelComponent } from './user-level/user-level.component';

const routes: Routes = [
  // { path: '', redirectTo: 'settings' },

  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'permission', component: PermissionComponent },
  { path: 'user-Level', component: UserLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
