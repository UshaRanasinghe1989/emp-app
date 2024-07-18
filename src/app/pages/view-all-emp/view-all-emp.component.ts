import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all-emp',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  templateUrl: './view-all-emp.component.html',
  styleUrl: './view-all-emp.component.css'
})
export class ViewAllEmpComponent implements OnInit {
  public empList:any;

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.getAllEmp();
  }

  public getAllEmp(){
    this.http.get("http://localhost:8080/emp-controller/get-all").subscribe(
      res => {
        this.empList = res;
      }
    )
  }
}
