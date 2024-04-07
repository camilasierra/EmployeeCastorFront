import { Injectable } from '@angular/core';
import {environment} from "../../environments/enviroment.dev";
import {HttpClient} from "@angular/common/http";
import { EmployeeDTO } from "../models/employee-model";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = `${environment.apiUrl}`
  
  constructor(
    private http: HttpClient
  ) {
  }

  /**
   * Metodo que lista los tipo de documento del sistema
   * @return json con tipos de documento obtenidos
   */
  listTypeDocument(){
    return this.http.get(
        `${this.url}/listTypeDocument`
      );
  }

  /**
   * Metodo que lista los cargos del sistema
   * @return json con los cargos obtenidos
   */
  listPosition(){
    return this.http.get(
        `${this.url}/listPosition`
      );
  }

  /**
   * Metodo que guarda un empleado en el sistema
   * @return json con el empleado guardado
   */
  createEmployee(peticion: EmployeeDTO){
    return this.http.post(
      `${this.url}/createEmployee`,
      peticion
    )
  }

  /**
   * Metodo que actualiza un empleado en el sistema
   * @return json con el empleado actualizado
   */
  updateEmployee(peticion: EmployeeDTO){
    return this.http.post(
      `${this.url}/updateEmployee`,
      peticion
    )
  }

  /**
   * Metodo que obtine empleados por filtro en el sistema
   * @return json con los empleados obtenidos
   */
  filterEmployee(filter: any){
    return this.http.post(
      `${this.url}/findEmployee`,
      filter
    )
  }


   /**
   * Metodo que obtine un empleado en el sistema
   * @return json con el empleado obtenido
   */
  getEmployee(idEmployee: any){
    return this.http.get(
      `${this.url}/getEmployeeById/${idEmployee}`
    )
  }

  

  
}