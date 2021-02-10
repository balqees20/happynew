import { Component, OnInit } from '@angular/core';
import {HappydataService} from '../../happydata.service';
import {discount} from '../../classes/discount';
import {ItemType} from '../../classes/itemtype';
import {Router,ActivatedRoute} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.component.html',
  styleUrls: ['./adddiscount.component.css']
})
export class AdddiscountComponent implements OnInit {
  response
  selectedImage : any;
  typelist :ItemType[];
  public type_name :any;
  url;
  image;
  
  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
  }
  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
  }
  submit(f){
    if (f.valid){
      console.log("form value " + JSON.stringify(f.value))
      const formData =new FormData();
      formData.append("image",this.selectedImage);
      formData.append("item_name",f.value.item_name);
      formData.append("disDate",f.value.disDate);
      formData.append("disday",f.value.disday);
      formData.append("oldprice",f.value.oldprice);
      formData.append("dicprice",f.value.dicprice);
      this.homeService.adddiscount(formData).subscribe(
        (response) =>{this.response =response;
       }
      )
 }
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

}
