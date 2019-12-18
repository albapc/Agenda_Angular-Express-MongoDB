import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE} from '@angular/material';
import {AddPersonaComponent} from './components/add-persona/add-persona.component';
import { GetPersonaComponent } from './components/get-persona/get-persona.component';
import { EditPersonaComponent } from './components/edit-persona/edit-persona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PersonasService } from './services/personas.service';

@NgModule({
  declarations: [
    AppComponent,
    AddPersonaComponent,
    GetPersonaComponent,
    EditPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'en-AU'},
    PersonasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
