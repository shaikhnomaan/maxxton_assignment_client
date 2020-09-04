import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../../data/candidates-data';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  employee_list = candidate_data;
  department_list = [];
  select_department = "";
  select_experience = "";
  search_employee = "";

  constructor() { }

  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList(){
    this.department_list =  _.uniqBy(candidate_data, 'department');
    console.log(this.department_list);
    

  }

  filterEmployeeListByDepartrment(department){
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

  filterEmployeeListByExperience(experience){
    console.log(this.select_department);
    
    console.log("filterEmployeeListByExperience",experience);
    let arr = candidate_data.slice(0);
    if(experience != "Select"){
      let filtered_department = arr.filter(function(emp) {
        let a = moment( [new Date(emp.joining_date).getFullYear(), new Date(emp.joining_date).getMonth()]);
        let b = moment( [new Date().getFullYear(), new Date().getMonth()]);
        // console.log((b.diff(a,"years")),emp.name);
        return (b.diff(a,"years")) > experience; 
      }.bind(this));

      if(this.select_department && this.select_department.department != "Select"){ //if department filter is applied
        let temp = filtered_department.filter(function(emp) {
          return emp.department == this.select_department.department; 
        }.bind(this));

        this.employee_list = (temp).slice(0);
      }else{
        this.employee_list = (filtered_department).slice(0);
      }
    }else{  //if not any experience filter applied
      if(this.select_department && this.select_department.department != "Select"){   //if department filter is applied
        let temp = arr.filter(function(emp) {
          return emp.department == this.select_department.department; 
        }.bind(this));
        
        this.employee_list = (temp).slice(0);
      }else{  //if not any department filter is applied
        console.log(candidate_data);
        
        this.employee_list = candidate_data;
      }
    }
  }
    
  diffYears(dt2, dt1){
    var diff = ((dt2) - (dt1)) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }

    searchEmployeeName(search_employee) {
      console.log(search_employee);
      
      let arr = candidate_data.slice(0);
      if (!search_employee.trim().length) {
        this.employee_list = arr;
      } else {
        this.employee_list = arr.filter(emp => {
        var words = _.words(emp.name)
        .join(" ")
        .toLowerCase();
        words = words + " " + emp.name.toLowerCase();
        var isSubstring = words.indexOf(search_employee.toLowerCase()) !== -1;
        return isSubstring;
      });
      }
  }

}
