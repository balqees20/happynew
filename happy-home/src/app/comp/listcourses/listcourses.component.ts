import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {course} from '../../classes/course';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-listcourses',
  templateUrl: './listcourses.component.html',
  styleUrls: ['./listcourses.component.css']
})
export class ListcoursesComponent implements OnInit {
 courseslist :course[];
  constructor(private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
    this.getcourse();
  }

  getcourse(){
    this.homeService.getCourses().subscribe(
      (data: course[]) => this.courseslist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
       this.router.navigate(['/index'])
      }
    )
  }
  mydelete(cam: course){
    const id = cam.coures_id;
      this.homeService.deletecourse(id).subscribe(
        res =>{
          console.log(res);
          this.getcourse();

        },
        err => console.error(err)
       );
      }

  

}
