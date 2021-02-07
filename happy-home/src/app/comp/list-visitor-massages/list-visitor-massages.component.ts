import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {contact} from '../../classes/contactv';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import{HappydataService} from '../../happydata.service'

@Component({
  selector: 'app-list-visitor-massages',
  templateUrl: './list-visitor-massages.component.html',
  styleUrls: ['./list-visitor-massages.component.css']
})
export class ListVisitorMassagesComponent implements OnInit {
  listcontact :contact[];
  constructor(private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
    this.listmassages();
  }
  listmassages(){
    this.homeService.getmassages().subscribe(
      (data: contact[]) => this.listcontact = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
  mydelete(c: contact){
    const id = c.visitor_id;
      this.homeService.deleteProgram(id).subscribe(
        res =>{
          console.log(res);
          this.listmassages();
        },
        err => console.error(err)
      );
  }

}
