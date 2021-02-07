import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Program} from '../../classes/program';
import {Router} from '@angular/router';
import { from } from 'rxjs';
import{HappydataService} from '../../happydata.service'
@Component({
  selector: 'app-list-program',
  templateUrl: './list-program.component.html',
  styleUrls: ['./list-program.component.css']
})
export class ListProgramComponent implements OnInit {
  programlist:Program[];
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
  mydelete(cam: Program){
    const id = cam.program_id;
      this.homeService.deleteProgram(id).subscribe(
        res =>{
          console.log(res);
          this.myprograms();
        },
        err => console.error(err)
      );
  }

}
