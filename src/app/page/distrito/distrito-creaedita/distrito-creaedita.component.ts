import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Distrito } from 'src/app/model/distrito';
import { DistritoService } from 'src/app/service/distrito.service';

@Component({
  selector: 'app-distrito-creaedita',
  templateUrl: './distrito-creaedita.component.html',
  styleUrls: ['./distrito-creaedita.component.css']
})
export class DistritoCreaeditaComponent implements OnInit {
  distrito : Distrito = new Distrito();
  mensaje: string = "";
  edicion: boolean = false;
  id: number = 0;
  mensaje1: string = "";

  constructor(private distritoService: DistritoService,private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
    }

    aceptar(): void {
      if (this.distrito.nombreDistrito.length > 0 ) { 
        if (this.edicion) {
          this.distritoService.modificar(this.distrito).subscribe(() => {
            this.distritoService.listar().subscribe(data => {
              this.distritoService.setLista(data);
          });
        });
      } else {
        this.distritoService.insertar(this.distrito).subscribe(() => {
          this.distritoService.listar().subscribe(data => {
            this.distritoService.setLista(data);
          });
        }, err => {
          //this.mensaje=err
          console.log(err);
        });      
      }
        this.router.navigate(['distrito']);
      } else {
        this.mensaje1 = "Complete los valores requeridos";
      }
    }

    init() {
      if (this.edicion) {
        this.distritoService.listarId(this.id).subscribe(data => {
          this.distrito = data;
          console.log(data);
        })
      }
  
    }

}
