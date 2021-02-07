import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {active} from '../../classes/activity';
import {Router,ActivatedRoute} from '@angular/router';
import {HappydataService} from '../../happydata.service';


import { from } from 'rxjs';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {
  actlist :active[];
  act_id:number;

  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
    this.getAct();
  }
  getAct(){
    this.homeService.getActivity().subscribe(
      (data: active[]) => this.actlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/activity'])
      }
    )
  }
  
 

}
