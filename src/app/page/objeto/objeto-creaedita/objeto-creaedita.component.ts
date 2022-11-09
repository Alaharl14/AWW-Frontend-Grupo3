import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ObjetoService } from 'src/app/service/objeto.service';
import { Objeto } from 'src/app/model/objeto';

@Component({
  selector: 'app-objeto-creaedita',
  templateUrl: './objeto-creaedita.component.html',
  styleUrls: ['./objeto-creaedita.component.css']
})
export class ObjetoCreaeditaComponent implements OnInit {
  objeto : Objeto = new Objeto();
  mensaje: string = "";
  edicion: boolean = false;
  id: number = 0;
  mensaje1: string = "";

  constructor(private objetoService: ObjetoService,private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
    }

    aceptar(): void {
      if (this.objeto.nombreObjeto.length > 0 &&
        this.objeto.distancia.length>0 &&
        this.objeto.distanciaLimite.length>0 &&
        this.objeto.ubicacion.length>0 &&
        this.objeto.fechaRegistrado.length>0 ) {
        if (this.edicion) {
          this.objetoService.modificar(this.objeto).subscribe(() => {
            this.objetoService.listar().subscribe(data => {
              this.objetoService.setLista(data);
          })
        })
      } else {

        this.objetoService.insertar(this.objeto).subscribe(() => {
          this.objetoService.listar().subscribe(data => {
            this.objetoService.setLista(data);
          });
        }, err => {
          //this.mensaje=err
          console.log(err);
        });
      }
        this.router.navigate(['objeto']);
      } else {
        this.mensaje1 = "Complete los valores requeridos";
      }
    }

    init() {
      if (this.edicion) {
        this.objetoService.listarId(this.id).subscribe(data => {
          this.objeto = data;
          console.log(data);
        })
      }
  
    }

}
