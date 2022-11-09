import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReporteService } from 'src/app/service/reporte.service';
import { Reporte } from 'src/app/model/reporte';

@Component({
  selector: 'app-reporte-creaedita',
  templateUrl: './reporte-creaedita.component.html',
  styleUrls: ['./reporte-creaedita.component.css']
})
export class ReporteCreaeditaComponent implements OnInit {
  reporte : Reporte = new Reporte();
  mensaje: string = "";
  edicion: boolean = false;
  id: number = 0;
  mensaje1: string = "";
  constructor(private reporteService: ReporteService,private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
        this.id = data['id'];
        this.edicion = data['id'] != null;
        this.init();
      });
    }

    aceptar(): void {
      if (this.reporte.nombreReporte.length > 0 && 
        this.reporte.descripcionReporte.length>0 && 
        this.reporte.fechaReporte.length>0 ) { 
        if (this.edicion) {
          this.reporteService.modificar(this.reporte).subscribe(() => {
            this.reporteService.listar().subscribe(data => {
              this.reporteService.setLista(data);
          })
        })
      } else {

        this.reporteService.insertar(this.reporte).subscribe(() => {
          this.reporteService.listar().subscribe(data => {
            this.reporteService.setLista(data);
          });
        }, err => {
          //this.mensaje=err
          console.log(err);
        });
      }
        this.router.navigate(['reporte']);
      } else {
        this.mensaje1 = "Complete los valores requeridos";
      }
    }

    init() {
      if (this.edicion) {
        this.reporteService.listarId(this.id).subscribe(data => {
          this.reporte = data;
          console.log(data);
        })
      }
  
    }

}
