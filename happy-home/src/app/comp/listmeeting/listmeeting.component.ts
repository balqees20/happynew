import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {meeting} from '../../classes/meeting';
import {HappydataService}from '../../happydata.service';


@Component({
  selector: 'app-listmeeting',
  templateUrl: './listmeeting.component.html',
  styleUrls: ['./listmeeting.component.css']
})
export class ListmeetingComponent implements OnInit {
 meetlist :meeting[];
   constructor(private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
   this.getmeeting();
  }
  getmeeting(){
    this.homeService.getMeeting().subscribe(
      (data:meeting[]) => this.meetlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
    
  }

  mydelete(cam: meeting){
    const id = cam.meeting_id;
      this.homeService.deletemeeting(id).subscribe(
        res =>{
          console.log(res);
          this.getmeeting();
        },
        err => console.error(err)
      );
  }

}
