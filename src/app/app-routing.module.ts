import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', component: FileUploadComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
