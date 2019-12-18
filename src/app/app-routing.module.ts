import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddPersonaComponent} from './components/add-persona/add-persona.component';
import {EditPersonaComponent} from './components/edit-persona/edit-persona.component';
import {GetPersonaComponent} from './components/get-persona/get-persona.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'perfil' },
  { path: 'add', component: AddPersonaComponent },
  { path: 'edit/:id', component: EditPersonaComponent },
  { path: 'perfil', component: GetPersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
