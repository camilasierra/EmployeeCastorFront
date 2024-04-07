import { Routes } from '@angular/router';
import { CreateEmployeeComponent } from "../app/create-employee/create-employee.component";
import { ListEmployeeComponent } from "../app/list-employee/list-employee.component";


export const routes: Routes = [

    {
        path: ':employee',
        children: [
          {
            path: 'create-employee/:idEmployee',
            component: CreateEmployeeComponent
          },
          {
            path: 'list-employee',
            component: ListEmployeeComponent
          },
          {
            path: '**',
            redirectTo: 'Home'
          },
        ]
      },
      {
        path: '**',
        redirectTo: '/employee/list-employee'
      }
];
