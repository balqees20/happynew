import { Component, OnInit } from '@angular/core';
import {course}from '../../classes/course';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  program_nameList=["برنامج تثقيف الشباب ","برنامج الإرشاد الأسري","البرنامج الإقتصادي ",""]
  response
  public  coures_name	:any;
     public   start_date :any;
       public last_date	:any;
       public description	:any;
       public coures_image :any;
       public program_name :any;
       public target_group :any;
      selectedImage: any;
       
  constructor(private homeService:HappydataService) { }

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
      let c:course = f.value
      this.homeService.addCourses(c).subscribe(
        (response) =>this.response =response
      )
    }
  }


}
