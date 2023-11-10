import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { NavegacaoMainEstudanteComponent } from './components/navegacao-main-estudante/navegacao-main-estudante.component';
import { SingleClassComponent } from './components/single-class/single-class.component';
import { StudentDashComponent } from './components/student-dash/student-dash.component';
import { MonitorDashComponent } from './components/monitor-dash/monitor-dash.component';

const routes: Routes = [
  { path: '', component: InitialPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navegacao', component: NavegacaoMainEstudanteComponent },
  { path: 'aula', component: SingleClassComponent },
  { path: 'aluno-dash', component: StudentDashComponent },
  { path: 'monitor-dash', component: MonitorDashComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
