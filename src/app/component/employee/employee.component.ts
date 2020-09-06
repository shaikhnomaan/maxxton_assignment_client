import { Component, OnInit } from '@angular/core';
import { candidate_data } from '../../data/candidates-data';
import * as _ from 'lodash';
import * as moment from 'moment';
import { faTrash,faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  faTrash = faTrash;
  faSearch = faSearch;

  employee_list = candidate_data;
  department_list = [];
  select_department = "";
  select_experience = "";
  search_employee = "";
  is_name_sorting = false;
  is_joining_date_sorting = false;
  is_development_department_select = false;

  constructor() { }

  ngOnInit(): void {
    this.getDepartmentList();
  }

  getDepartmentList(){
    this.department_list =  _.uniqBy(candidate_data, 'department');
  }

  // ----------------------------------- filterEmployeeListByDepartrment ---------------------------------
  filterEmployeeListByDepartrment(department){
    console.log(this.select_experience);
    
    let arr = candidate_data.slice(0);
    if(department != "Select"){
      let filtered_department = arr.filter(function(emp) {
         return emp.department == department.department; 
      }.bind(this));
      console.log("filterEmployeeListByDepartrment" ,filtered_department);

      if(this.select_experience != "Select" && this.select_experience){
        let temp = filtered_department.filter(function(emp) {
          let a = moment( [new Date(emp.joining_date).getFullYear(), new Date(emp.joining_date).getMonth()]);
          let b = moment( [new Date().getFullYear(), new Date().getMonth()]);
          // console.log((b.diff(a,"years")),emp.name);
          return (b.diff(a,"years")) > this.select_experience; 
       }.bind(this));
       this.employee_list = (temp).slice(0);
      }else{
        this.employee_list = (filtered_department).slice(0);
      }
    }else{
      if(this.select_experience != "Select" && this.select_experience){
        let temp = arr.filter(function(emp) {
          let a = moment( [new Date(emp.joining_date).getFullYear(), new Date(emp.joining_date).getMonth()]);
          let b = moment( [new Date().getFullYear(), new Date().getMonth()]);
          // console.log((b.diff(a,"years")),emp.name);
          return (b.diff(a,"years")) > this.select_experience; 
        }.bind(this));

        this.employee_list = temp;
      }else{
        this.employee_list = candidate_data;
      }
    }
  }

  //  ----------------------------------------- filterEmployeeListByExperience -------------------------------
  filterEmployeeListByExperience(experience){
    
    let arr = candidate_data.slice(0);
    if(experience != "Select"){
      let filtered_department = arr.filter(function(emp) {
        let a = moment( [new Date(emp.joining_date).getFullYear(), new Date(emp.joining_date).getMonth()]);
        let b = moment( [new Date().getFullYear(), new Date().getMonth()]);
        // console.log((b.diff(a,"years")),emp.name);
        return (b.diff(a,"years")) > experience; 
      }.bind(this));
      
      if(this.select_department != "Select" && this.select_department){ //if department filter is applied
        console.log(this.select_department);
        console.log("filterEmployeeListByExperience",experience);
        let temp = filtered_department.filter(function(emp) {
          return emp.department == this.select_department.department; 
        }.bind(this));

        this.employee_list = (temp).slice(0);
      }else{
        this.employee_list = (filtered_department).slice(0);
      }
    }else{  //if not any experience filter applied
      if(this.select_department != "Select" && this.select_department){   //if department filter is applied
        let temp = arr.filter(function(emp) {
          return emp.department == this.select_department.department; 
        }.bind(this));
        
        this.employee_list = (temp).slice(0);
      }else{  //if not any department filter is applied
        this.employee_list = candidate_data;
      }
    }
  }
   
  // ------------------------------------- diffYears ------------------------------------------
  diffYears(dt2, dt1){
    var diff = ((dt2) - (dt1)) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff/365.25));
  }

  // ----------------------------------- searchEmployeeName --------------------------------------
  searchEmployeeName(search_employee) {
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
  
  // ------------------------------------- sortByName ---------------------------------------
  sortByName(){
    let arr = candidate_data.slice(0);  //get shadow copy candidate_data
    this.employee_list = _.sortBy(arr, [function(emp) { return emp.name; }]);
    this.is_name_sorting = true;
    this.is_joining_date_sorting = false;
    console.table( this.employee_list);
  }
  
  // ---------------------------------- sortByJoiningDate ----------------------------------
  sortByJoiningDate(){
    let arr = candidate_data.slice(0);  //get shadow copy candidate_data
    this.employee_list = _.sortBy(arr, [function(emp) { return emp.joining_date; }]);
    this.is_joining_date_sorting = true;
    this.is_name_sorting = false;
    console.table( this.employee_list);
  }
  
  // ------------------------------------ revertSorting ----------------------------------
  revertSorting(sorting_type){
    if(sorting_type == 'sort_by_name'){}
    this.employee_list = candidate_data.slice(0);
    if(this.is_joining_date_sorting ){
      this.is_joining_date_sorting = false;
    } else if(this.is_name_sorting){
      this.is_name_sorting = false;
    }
  }

  // -------------------------------------- removeEmplyeeFromList -----------------------------------
  removeEmplyeeFromList(index){
    alert("Are you sure you want to delete");
    this.employee_list.splice(index,1);
    console.log(index);
    
  }
}
