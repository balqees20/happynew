import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {menuItem} from '../../../classes/menuitem';
import {HappydataService} from '../../../happydata.service';
import { ItemType } from 'src/app/classes/itemtype';

@Component({
  selector: 'app-list-itemtype',
  templateUrl: './list-itemtype.component.html',
  styleUrls: ['./list-itemtype.component.css']
})
export class ListItemtypeComponent implements OnInit {
  typelist:ItemType [];
  constructor(private http:HttpClient, private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
    this.getitemtype();
  }

  getitemtype(){
    this.homeService.getitemtype().subscribe(
      (data:ItemType[]) => this.typelist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
  
  mydelete(t:ItemType){
    const id = t.id;
      this.homeService.deleteitemtype(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      this.getitemtype();

  }

}
