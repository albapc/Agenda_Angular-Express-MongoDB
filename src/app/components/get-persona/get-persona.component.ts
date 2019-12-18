import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import Persona from '../../classes/persona';
import {PersonasService} from '../../services/personas.service';

@Component({
  selector: 'app-get-persona',
  templateUrl: './get-persona.component.html',
  styleUrls: ['./get-persona.component.css']
})
export class GetPersonaComponent implements OnInit {

  personaData: any = [];
  dataSource: MatTableDataSource<Persona>;
  displayedColumns: string[] = ['dni', 'nombre', 'apellidos', 'opciones'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private ps: PersonasService) {
    this.ps.GetPersonas().subscribe(data => {
      this.personaData = data;
      this.dataSource = new MatTableDataSource<Persona>(this.personaData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit() {
    }

  deletePersona(index: number, e) {
    if (window.confirm('Seguro?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.ps.DeletePersona(e._id).subscribe();
      location.reload();
      }
    }
}
