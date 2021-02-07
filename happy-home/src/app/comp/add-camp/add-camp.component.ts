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
   
      const formData =new FormData();
    formData.append("camp_image",this.selectedImage);
    formData.append("camp_name",f.value.camp_name);
    formData.append("target_group",f.value.target_group);
    formData.append("season",f.value.season);
    formData.append("start_date",f.value.start_date);
    formData.append("last_date",f.value.last_date);
    formData.append("description",f.value.description);

      this.homeService.addCamp(formData).subscribe(
        (response) =>this.response =response
      )
      
    }
  }


}
