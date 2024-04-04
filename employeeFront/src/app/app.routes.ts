import { Routes } from '@angular/router';
import { CreateEmployeeComponent } from "../app/create-employee/create-employee.component";

export const routes: Routes = [

    {
        path: ':employee',
        children: [
          {
            path: 'create-employee',
            component: CreateEmployeeComponent
          },
          {
            path: 'list-employee',
            component: CreateEmployeeComponent
          },
          {
            path: '**',
            redirectTo: 'Home'
          },
        ]
      },
      {
        path: '**',
        redirectTo: '/epssanitas'
      }
];
