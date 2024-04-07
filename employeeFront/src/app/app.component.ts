import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CreateEmployeeComponent } from "../app/create-employee/create-employee.component";
import { ListEmployeeComponent } from "../app/list-employee/list-employee.component";
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,FormsModule,
    ReactiveFormsModule,
     HttpClientModule, CreateEmployeeComponent, 
    CommonModule,  ListEmployeeComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employeeFront';
}
