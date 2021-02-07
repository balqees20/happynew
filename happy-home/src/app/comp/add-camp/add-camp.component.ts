import { Component, OnInit } from '@angular/core';
import {camp} from '../../classes/camp';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {
  seasonList=["شتوي " ,"صيفي "]
  response
       public camp_name :any;
       public season :any;
       public start_date :any;
       public last_date :	any;
       public  target_group :any;
       public program_name :any;
       public description :	any;
        camp_image  :any;
      

  constructor(private homeService:HappydataService) { }
  selectedImage:any;

  ngOnInit(): void {
  }

  log(x){
    console.log(x);
  }
 
  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
  }
  

  submit(f){
    if (f.valid){
      console.log("form value " + JSON.stringify(f.value))
      let c:camp = f.value
      this.homeService.addCamp(c).subscribe(
        (response) =>this.response =response
      )
      
    }
  }


}
