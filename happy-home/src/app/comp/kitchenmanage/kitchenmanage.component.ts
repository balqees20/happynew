import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {menuItem} from '../../classes/menuitem';
import{HappydataService} from '../../happydata.service';
import { ItemType } from 'src/app/classes/itemtype';


@Component({
  selector: 'app-kitchenmanage',
  templateUrl: './kitchenmanage.component.html',
  styleUrls: ['./kitchenmanage.component.css']
})
export class KitchenmanageComponent implements OnInit {
  menulist:menuItem[];
  itemType :menuItem[];

  constructor(private homeService:HappydataService ,private router:Router) { }
  typelist:ItemType [];

  ngOnInit(): void {
    this.getitemtype();
    this.getmenuitems();
 
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
  
  itemTypedelete(t:ItemType){
    const id = t.id;
      this.homeService.deleteitemtype(id).subscribe(
        res =>{
          console.log(res);
        },
        err => console.error(err)
      );
      this.getitemtype();

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
