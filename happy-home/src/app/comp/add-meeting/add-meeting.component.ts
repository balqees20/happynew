import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {meeting} from '../../classes/meeting';
import {Program} from '../../classes/program';
import {HappydataService} from '../../happydata.service';
import {Router} from '@angular/router';
import { compileComponentFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {
  programlist:Program[];

  meeting_typeList=["ترفيهي " ,"ثقافي "]
  program_nameList=["برنامج تثقيف الشباب ","برنامج الإرشاد الأسري","البرنامج الإقتصادي ",""]
    response
       public meeting_id :any;	
       public  meeting_name :any;	
       public meeting_place :any;
       public  meeting_type :any;
       public  meeting_date :any;
       public  program_name :any;
       public meeting_image :any;
       public   description :any;
       selectedImage: any;
       
  constructor(private homeService:HappydataService ,private router:Router ) { }

  ngOnInit(): void {
  }
  log(x){
    console.log(x);
  }

 
  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
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

  submit(f){
    if (f.valid){
      console.log("form value " +JSON.stringify(f.value))
      const formData =new FormData();
    formData.append('meeting_image',this.selectedImage);
    formData.append("meeting_name",f.value.meeting_name);
    formData.append("meeting_place",f.value.meeting_place);
    formData.append("meeting_type",f.value.meeting_type);
    formData.append("meeting_date",f.value.meeting_date);
    formData.append("program_name",f.value.program_name);
    formData.append("description",f.value.description);
          let m:meeting = f.value
      this.homeService.addMeeting(m).subscribe(
        (response) =>this.response =response
      )
    }
    

  }


}
