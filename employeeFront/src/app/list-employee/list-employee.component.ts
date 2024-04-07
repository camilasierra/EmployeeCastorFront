import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Page } from '../models/page';
import { EmployeeService } from "../service/employee-service";
import { EmployeeDTO } from "../models/employee-model";
import { PositionDTO } from "../models/position-model";
import {RouterService} from "../service/router.service";
import {AlertService} from "../utils/alert/alert.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Params, Router, RouterOutlet, RouterLink,RouterLinkActive} from "@angular/router";

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
     RouterLink,
      RouterLinkActive,
    CommonModule,MatPaginatorModule,NgxPaginationModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  rows: any;
  listEmployee: EmployeeDTO[] = [];
  listPosition: PositionDTO[] = [];
  listaEstados: any;
  totalPaginas: number = 0;
  paginaActual: number = 0;
  totalItems: number = 0;
  pageSize:number=2;

  constructor(
    private formBuilder: FormBuilder,
    private _router: RouterService,
    private route: Router,
    private alertService: AlertService,
    private employeeService : EmployeeService
   ) {

    this.employeeForm = this.formBuilder.group({
      fechaInicial: '',
      fechaFinal : '',
      name : '',
      lastName: '',
      idPosition: '',
      numberDocument: '',
      pagina: 1,
    });

     }

  ngOnInit() {
    this.getPosition();
  }

  private getPosition() {
    this.employeeService.listPosition().subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.listPosition = result.response;
      } else {
        this.alertService.errorModal(result.message);
      }
    })
  }



  filter() {
    
    if(this.employeeForm.get('idPosition')?.value == ''){
      this.employeeForm.get('idPosition')?.setValue(null);
    }
    if(this.employeeForm.get('fechaInicial')?.value == ''){
      this.employeeForm.get('fechaInicial')?.setValue(null);
    }
    if(this.employeeForm.get('fechaFinal')?.value == ''){
      this.employeeForm.get('fechaFinal')?.setValue(null);
    }
    if(this.employeeForm.get('name')?.value == ''){
      this.employeeForm.get('name')?.setValue(null);
    }
    if(this.employeeForm.get('lastName')?.value == ''){
      this.employeeForm.get('lastName')?.setValue(null);
    }
    if(this.employeeForm.get('numberDocument')?.value == ''){
      this.employeeForm.get('numberDocument')?.setValue(null);
    }
    this.employeeService.filterEmployee(this.employeeForm.value).subscribe((result: any) => {
      if (result.statusCode == 200) {
        let page: Page = result.response;
        this.rows = page.rows;
        this.totalPaginas = page.paginasTotales;
        this.totalItems= page.totalElements;
        this.paginaActual = page.paginaActual-1;
      } else {
        this.alertService.errorModal(result.message);
      }
    })
  }



  

  pageChanged(event: PageEvent) {
     console.log("pag "+ event.pageIndex);
    this.employeeForm.get('pagina')?.setValue(event.pageIndex+1);
    this.filter();
  }

  clear() {
    this.employeeForm.reset();
    this.employeeForm.get('pagina')?.setValue(1);
    this.rows.length = 0;
  }


  back() {
    this._router.goBack();
  }

  linkCreateNull() {
    this.route.navigateByUrl('/employee/create-employee/'+ null);
  }

  linkCreateId(idMo:any) {
    console.log(idMo);
    //this.route.navigateByUrl('/employee/create-employee/'+ this.);
  }
}