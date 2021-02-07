import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {camp} from '../../classes/camp';
import{HappydataService}from '../../happydata.service';
import{Router} from '@angular/router';



@Component({
  selector: 'app-list-camp',
  templateUrl: './list-camp.component.html',
  styleUrls: ['./list-camp.component.css']
})
export class ListCampComponent implements OnInit {
 camplist :camp[];
 camp_id:number;
  constructor(private homeService:HappydataService ,private router:Router) { }
 
  ngOnInit(): void {
    this.getcamps();
    
  }
  getcamps(){
    this.homeService.getCamp().subscribe(
      (data: camp[]) => this.camplist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
  mydelete(cam: camp){
    const id = cam.camp_id;
      this.homeService.deletecamp(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      
      this.getcamps();

  }

}
