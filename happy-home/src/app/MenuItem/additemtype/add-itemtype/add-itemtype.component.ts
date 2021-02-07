import { Component, OnInit } from '@angular/core';
import {HappydataService} from '../../../happydata.service';
import {menuItem} from '../../../classes/menuitem';
import {ItemType} from '../../../classes/itemtype';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-itemtype',
  templateUrl: './add-itemtype.component.html',
  styleUrls: ['./add-itemtype.component.css']
})
export class AddItemtypeComponent implements OnInit {
response
selectedImage : any;
typelist :ItemType[];
public type_name :any;
url;
image;

  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
  }
  log(x){
    console.log(x);
  }
  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
  }

  getitemtype(){
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
      const formData =new FormData();
      formData.append("itemType_image",this.selectedImage);
      formData.append("type_name",f.value.type_name);
      formData.append("id",f.value.id);
      
      this.homeService.additemtype(formData).subscribe(
        (response) =>{this.response =response;
          //this.getitemtype();
       }
      )
 }
 }

}
