import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-guard',
  templateUrl: './guard.component.html',
  styleUrls: ['./guard.component.css']
})
export class GuardComponent implements OnInit {
  Employee: string;
  EmployeeName: string;
  EmployeeAge: number;
  EmployeeAddress: string;
  EmployeeCity: string
  message: string
  constructor(public firebaseCrud: FirebaseService) { }
  createEmployee() {
    alert(this.EmployeeName)
    let record = {};
    record['name'] = this.EmployeeName
    record['age'] = this.EmployeeAge
    record['address'] = this.EmployeeAddress
    record['city'] = this.EmployeeCity
    this.firebaseCrud.createNewEmployee(record).then(res => {
      this.EmployeeName = ""
      this.EmployeeAge = undefined
      this.EmployeeAddress = ""
      this.EmployeeCity = ""
      console.log(res)
      this.message = "Employee data saved"
    }).catch(error => { console.log(error) })
  }
  ngOnInit(): void {
  }

}




