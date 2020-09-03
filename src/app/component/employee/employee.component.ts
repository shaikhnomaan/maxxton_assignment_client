import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../../data/candidates-data';
import * as _ from 'lodash';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employee_list = candidate_data;
  department_list = [];
  select_department = "";

  constructor() { }

  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList(){
    this.department_list =  _.uniqBy(candidate_data, 'department');
    console.log(this.department_list);
    

  }

  filterEmployeeListByDepartrment(department){
    console.log(department);
    if(department != "Select"){
      let arr = candidate_data.slice(0);
      let filtered_department = arr.filter(function(emp) {
         return emp.department == department.department; 
      }.bind(this));
      console.log("filterEmployeeListByDepartrment" ,filtered_department);
      this.employee_list = (filtered_department).slice(0);
    }else{
      this.employee_list = candidate_data;
    }
  }
    

}
