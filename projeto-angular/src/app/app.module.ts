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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MonitorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
