import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonasService} from '../../services/personas.service';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  personasForm: FormGroup;

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
      public fb: FormBuilder,
      private router: Router,
      private ngZone: NgZone,
      private actRoute: ActivatedRoute,
      private ps: PersonasService
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.ps.GetPersona(id).subscribe(data => {
      this.personasForm = this.fb.group({
        nombre: [data.nombre, [Validators.required]],
        apellidos: [data.apellidos, [Validators.required]],
        edad: [data.edad, [Validators.required]],
        dni: [data.dni, [Validators.required]],
        cumpleanhos: [data.cumpleanhos, [Validators.required]],
        colorFav: [data.colorFav, [Validators.required]],
        sexo: [data.sexo]
      });
    });
  }

  updateBookForm() {
    this.personasForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      cumpleanhos: ['', Validators.required],
      colorFav: ['', Validators.required],
      sexo: ['No especificado']
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.personasForm.controls[controlName].hasError(errorName);
  };

  /* Update book */
  updatePersonasForm() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Seguro que quieres actualizar?')) {
      this.ps.UpdatePersona(id, this.personasForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/perfil'));
      });
    }
  }

  close() {
    this.router.navigateByUrl('/perfil');
  }

  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.personasForm.get('cumpleanhos').setValue(convertDate, {
      onlyself: true
    });
  }
}
