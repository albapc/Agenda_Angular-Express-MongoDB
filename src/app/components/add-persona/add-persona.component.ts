import {Component, NgZone, OnInit} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {PersonasService} from '../../services/personas.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-persona',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})

export class AddPersonaComponent implements OnInit {
  personasForm: FormGroup;

  ngOnInit() {
    this.createForm();
  }

  constructor(public fb: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private ps: PersonasService) {}

  createForm() {
    this.personasForm = this.fb.group({
      nombre: ['', [Validators.required] ],
      apellidos: ['', [Validators.required] ],
      edad: ['', [Validators.required]],
      dni: ['', [Validators.required] ],
      cumpleanhos: ['', [Validators.required]],
      colorFav: ['', [Validators.required]],
      sexo: ['No especificado']
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.personasForm.controls[controlName].hasError(errorName);
  }


  submitPersonasForm() {
    if (this.personasForm.valid) {
      this.ps.AddPersona(this.personasForm.value).subscribe(res => {
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
