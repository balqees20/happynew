import { Component, OnInit } from '@angular/core';
import {HappydataService} from '../../../happydata.service';
import {menuItem} from '../../../classes/menuitem';
import {ItemType} from '../../../classes/itemtype';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  response 
  typelist:ItemType [];
  //public  item_name :any;
  //public product_image :any;
  //public  price :any;

  selectedImage:any;

  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
  }
  log(x){
   this.getitemtypes();
  }
  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
  }

  getitemtypes(){
    this.homeService.getitemtype().subscribe(
     (data: ItemType[]) => this.typelist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
       this.router.navigate(['/index'])
      }
    )
  }

  submit(f){
    if (f.valid){
      console.log("form value " + JSON.stringify(f.value))
      let i:menuItem= f.value
      this.homeService.additem(i).subscribe(
        (response) =>{this.response =response;
       }
      )
 }
 }
}
