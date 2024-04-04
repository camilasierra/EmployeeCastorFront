import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateEmployeeComponent } from "../app/create-employee/create-employee.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateEmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employeeFront';
}
