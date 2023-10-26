import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { NavegacaoMainEstudanteComponent } from './components/navegacao-main-estudante/navegacao-main-estudante.component';
import { SingleClassComponent } from './components/single-class/single-class.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navegacao', component: NavegacaoMainEstudanteComponent },
  { path: 'aula', component: SingleClassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
