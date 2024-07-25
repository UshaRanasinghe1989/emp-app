import { NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-emp',
  standalone: true,
  imports: [HttpClientModule, NgFor, FormsModule],
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

  public deleteEmployee(employee:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8080/emp-controller/delete-emp/${employee.id}`, {responseType:'text'}).subscribe(res => {
          this.getAllEmp();
        })  
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });      
  }

  public selectedEmployee = {
    firstName : undefined,
    lastName : undefined,
    email : undefined,
    depId : undefined,
    roleId : undefined
  }

  public getSelectedEmployee(employee:any){
    this.selectedEmployee = employee;
  }

  public editEmployee(employee:any){
    this.http.post(`http://localhost:8080/emp-controller/update-employee/${employee.id}`, this.selectedEmployee).subscribe(
      (data) => {
        Swal.fire({
          title: "Updated Employee",
          text: "Employee record updated successfully !",
          icon: "success"
        });
      }
    )
  }
}
