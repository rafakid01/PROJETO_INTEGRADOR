import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HowWorksComponent } from './components/how-works/how-works.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { NavegacaoMainEstudanteComponent } from './components/navegacao-main-estudante/navegacao-main-estudante.component';
import { SingleClassComponent } from './components/single-class/single-class.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { InputSearchComponent } from './components/input-search/input-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MonitorsService } from './services/monitors.service';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { MonitorDashboardComponent } from './components/monitor-dashboard/monitor-dashboard.component';

const dbConfig: DBConfig = {
  name: 'myDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'usuarios',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'nome', keypath: 'nome', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: true } },
        { name: 'senha', keypath: 'senha', options: { unique: false } },
        { name: 'curso', keypath: 'curso', options: { unique: false } },
        {
          name: 'contato_numero1',
          keypath: 'contato_numero1',
          options: { unique: false },
        },
        {
          name: 'contato_numero2',
          keypath: 'contato_numero2',
          options: { unique: false },
        },
        {
          name: 'foto_perfil',
          keypath: 'foto_perfil',
          options: { unique: false },
        },
        {
          name: 'monitor',
          keypath: 'monitor.descricao',
          options: { unique: false },
        },
        {
          name: 'monitor.nota_avaliacao',
          keypath: 'monitor.nota_avaliacao',
          options: { unique: false },
        },
        {
          name: 'monitor.assuntos',
          keypath: 'monitor.assuntos',
          options: { unique: false },
        },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HowWorksComponent,
    ContactComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    InitialPageComponent,
    NavegacaoMainEstudanteComponent,
    SingleClassComponent,
    FooterNavComponent,
    InputSearchComponent,
    ProfileComponent,
    AdminDashboardComponent,
    MonitorDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [MonitorsService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
