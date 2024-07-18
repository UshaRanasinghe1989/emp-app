import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-emp',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './manage-emp.component.html',
  styleUrl: './manage-emp.component.css'
})
export class ManageEmpComponent {
  constructor(private http:HttpClient){}

  public employee = {
    firstName : undefined,
    lastName : undefined,
    email : undefined,
    depId : undefined,
    roleId : undefined
  }

  public saveEmployee(){
    this.http.post("http://localhost:8080/emp-controller/add-employee", this.employee).subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
}
