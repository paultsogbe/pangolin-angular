import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PangolinListComponent } from './pangolin-list/pangolin-list.component';
import { PangolinComponent } from './pangolin/pangolin.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { PangolinEditComponent } from './pangolin-edit/pangolin-edit.component';

const routes: Routes = [
  { path: '', component: PangolinListComponent },
  { path: 'pangolins/:id', component: PangolinComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin/pangolins/:id', component: PangolinEditComponent },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
