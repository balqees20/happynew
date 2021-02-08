import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Program} from '../../classes/program';
import {Router} from '@angular/router';
import{HappydataService} from '../../happydata.service';
import { meeting } from '../../classes/meeting';
import { course } from '../../classes/course';
import { news } from '../../classes/news';
import { camp } from '../../classes/camp';
import { active } from '../../classes/activity';
import {ABOUT} from '../../classes/about';


@Component({
  selector: 'app-admain-page',
  templateUrl: './admain-page.component.html',
  styleUrls: ['./admain-page.component.css']
})
export class AdmainPageComponent implements OnInit {
  programlist:Program[];
  meetlist:meeting[];
  courseslist:course[];
  newslist:news[];
  camplist:camp[];
  actlist:active[];
  act_id:number;
  ablist: ABOUT[];
  constructor(private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
    this.listmeeting();
    this.myprograms();
    this.listAct();
    this.getcamps();
    this.listcourse();
    this.list_news();
    this.aboutlist();
  }
  myprograms(){
    this.homeService.getProgram().subscribe(
      (data: Program[]) => this.programlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )

  }
  aboutlist(){
    this.homeService.getabout().subscribe(
      (data: ABOUT[]) => this.ablist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/activity'])
      }
    )
  }

  listmeeting(){
    this.homeService.getMeeting().subscribe(
      (data: meeting[]) => this.meetlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }

  listcourse(){
    this.homeService.getCourses().subscribe(
      (data: course[]) => this.courseslist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
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
  listAct(){
    this.homeService.getActivity().subscribe(
      (data: active[]) => this.actlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
       // this.router.navigate(['/activity'])
      }
    )
  }
  pdelete(acti: active | number){
    const id = typeof acti === 'number' ? acti : acti.act_id;

      this.homeService.deleteactivity(this.act_id).subscribe(
        res =>{
          console.log(res);
          this.listAct;
        },
        err => console.error(err)
      );
  }

  list_news(){
    this.homeService.getnews().subscribe(
      (data: news[]) => this.newslist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
       //this.router.navigate(['/news'])
      }
    )
  }

  Cdelete(cam: camp){
    const id = cam.camp_id;
      this.homeService.deletecamp(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      this.getcamps();
  }
  deletemeet(m: meeting){
    const id = m.meeting_id;
      this.homeService.deletemeeting(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      this. listmeeting();
  }

  actdelete(acti: active){
    const id = acti.act_id;
      this.homeService.deleteactivity(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      this.listAct();

  }
  newsdelete(cam: news){
    const id = cam.news_id;
      this.homeService.deletenews(id).subscribe(
        res =>{
          console.log(res);
        },  
        err => console.error(err)
      );
      this.list_news();
  }
 
  coursedelete(cam: course){
    const id = cam.coures_id;
      this.homeService.deletecourse(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
       );
       this.listcourse();
      }

     aboutdelete(ab:ABOUT){
        const id = ab.about_id;
          this.homeService.deleteaboutitem(id).subscribe(
            res =>{
              console.log(res);
            },
            err => console.error(err)
           );
           this.listcourse();
          }

  
}
