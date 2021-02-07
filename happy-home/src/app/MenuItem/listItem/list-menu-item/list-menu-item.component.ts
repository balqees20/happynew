import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {menuItem} from '../../../classes/menuitem';
import {HappydataService} from '../../../happydata.service';
import { ItemType } from 'src/app/classes/itemtype';


@Component({
  selector: 'app-list-menu-item',
  templateUrl: './list-menu-item.component.html',
  styleUrls: ['./list-menu-item.component.css']
})
export class ListMenuItemComponent implements OnInit {
  menulist:menuItem[];
 itemType :menuItem[];
 itemType_id: any;
  array: any;
 
  constructor(private http:HttpClient, private homeService:HappydataService ,private router:Router,) { }

  ngOnInit(): void {
    this.getmenuitems();
    
    this.homeService.getmenuitem(this.itemType_id).subscribe(
      (data:menuItem[]) => this.menulist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
  getmenuitems(){
    this.homeService.getallitem().subscribe(
      (data:menuItem[]) => this.menulist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
  getmenuitemT(i:menuItem){
   const id = i.itemType_id;
    this.homeService.getmenuitem(id).subscribe(
      (data:menuItem[]) => this.menulist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
  }
 



  
  mydelete(cam: menuItem){
    const id = cam.item_id;
      this.homeService.deletemenuitem(id).subscribe(
        res =>{
          console.log(res);
         this.getmenuitems();
        },
        err => console.error(err)
      );
  }


}
