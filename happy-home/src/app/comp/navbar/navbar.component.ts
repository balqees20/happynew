import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Program} from '../../classes/program';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import{HappydataService} from '../../happydata.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  programlist:Program[];
  admin=localStorage.getItem('name');
  
  constructor(private homeService:HappydataService ,private router:Router ) { }

  ngOnInit(): void {
    this.myprograms()
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

}


