import { CurrencyPipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { EmployeeDTO } from "../models/employee-model";
import { PositionDTO } from "../models/position-model";
import { TypeDocumentDTO } from "../models/type-document-model";
import { EmployeeService } from "../service/employee-service";
import {AlertService} from "../utils/alert/alert.service";
import {last, map, tap} from "rxjs";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,],
  templateUrl: './create-employee.component.html',
  providers: [CurrencyPipe]
})
export class CreateEmployeeComponent implements OnInit {

  
  listTypeDocument: TypeDocumentDTO[] = [];
  listPosition: PositionDTO[] = [];
  path: string = '';
  idEmployeeModificar: number = -1;
  nameFileC:string = '';
  fileBase64: string = '';
  nameFile: string = '';
  extenFile: string = '';
  employeeLoad!: EmployeeDTO;


  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    private alertService: AlertService,
    private employeeService : EmployeeService
    ) {
      this.router = router;
      this.path = this.router.url.split('/')[1]

    }

    public employeeForm: FormGroup = this.formBuilder.group({
    idTypeDocument: ['', Validators.required],
    numberDocument: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    dateAdmission: ['', Validators.required],
    idPosition: ['', Validators.required],
    photoBase64: [''],
    namePhoto: [''],

    

  })

  ngOnInit() {
    this.getTypeDocument();
    this.getPosition();
    this.getIdEmployee();
  }

  getIdEmployee() {
    this._route.params.subscribe((params: Params) => {
      this.idEmployeeModificar = params['idEmployee'];
      if ("null" !== this.idEmployeeModificar.toString()) {
        this.loadEmployee(this.idEmployeeModificar);
      }
    });
  }
  
  loadEmployee(idEmployeeModificar: any){
    this.employeeService.getEmployee(idEmployeeModificar).subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.employeeLoad = result.response;
       
        this.loadForm()
      } else {
        this.alertService.errorModal(result.message);
      }
    });
  }

 
  loadForm(){
    this.employeeForm.get('name')?.setValue(this.employeeLoad.name);
    this.employeeForm.get('numberDocument')?.setValue(this.employeeLoad.numberDocument);
    this.employeeForm.get('lastName')?.setValue(this.employeeLoad.lastName);
    this.employeeForm.get('dateAdmission')?.setValue(formatDate(this.employeeLoad.dateAdmission, 'yyyy-MM-dd', 'en-US'));
    this.employeeForm.get('idPosition')?.setValue(this.employeeLoad.idPosition);
    this.employeeForm.get('idTypeDocument')?.setValue(this.employeeLoad.idTypeDocument);
    var splitted = this.employeeLoad.photo?.split("/"); 
    this.employeeLoad.photo = "assets/"+splitted![splitted!.length-1];
  }

  private getTypeDocument() {
    this.employeeService.listTypeDocument().subscribe((result: any) => {
      if (result.statusCode == 200) {
        this.listTypeDocument = result.response;
      } else {
        this.alertService.errorModal(result.message);
      }
    })
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

  validateField(key: string) {
    return (
      (this.employeeForm.get(key)?.dirty ||
        this.employeeForm.get(key)?.touched) &&
      this.employeeForm.get(key)?.invalid
    );
  }

  volverEmployee() {
    this.employeeForm.reset();
    this.router.navigateByUrl('/'+this.path+'/list-employee');
  }


 
  captureFile(event:any){
   
      this.nameFileC = event.target.files[0].name;
      this.extraerBase64(event.target.files[0]).then((file:any)=>{
        let json={
          fichaBase64: file.base.split(',')[1],
          nombreFicha: this.nameFileC.split('.')[0],
          extensionFicha: '.'+this.nameFileC.split('.')[1]
        }
        this.fileBase64=json.fichaBase64;
      });
  }


  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })

  saveEmployee() {
    let employee: EmployeeDTO = {
      name: this.employeeForm.get("name")?.value,
      numberDocument :this.employeeForm.get("numberDocument")?.value,
      lastName :this.employeeForm.get("lastName")?.value,
      dateAdmission :this.employeeForm.get("dateAdmission")?.value,
      idPosition : this.employeeForm.get("idPosition")?.value,
      idTypeDocument : this.employeeForm.get("idTypeDocument")?.value,
      namePhoto : this.nameFileC,
      photoBase64 : this.fileBase64,
    };

    if(null != this.employeeLoad){
      employee.idEmployee =  this.employeeLoad.idEmployee,
      this.employeeService.updateEmployee(employee).pipe(
      map((result: any) => {
        this.alertService.cerrarModal()
        if (result.statusCode == 200) {
          this.alertService.successModal(result.message);
          this.volverEmployee();
        } else {
          this.alertService.errorModal(result.message);
        }
      })).subscribe();
    }else{
      this.employeeService.createEmployee(employee).pipe(
        map((result: any) => {
          this.alertService.cerrarModal()
          if (result.statusCode == 200) {
            this.alertService.successModal(result.message);
            this.volverEmployee();
          } else {
            this.alertService.errorModal(result.message);
          }
        })).subscribe();
    }
    
  }

  

}
