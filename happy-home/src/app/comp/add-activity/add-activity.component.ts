import { Component, OnInit,Output,EventEmitter,ElementRef, ViewChild } from '@angular/core';
import{HappydataService}from '../../happydata.service';
import{active}from '../../classes/activity';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})

export class AddActivityComponent implements OnInit {
  program_nameList=["برنامج تثقيف الشباب ","برنامج الإرشاد الأسري","البرنامج الإقتصادي "];
    act_typeList=["ترفيهي","ثقافي"];
 public act_name:any; public act_place:any;  public act_type :any;
 public act_date	:any;  public act_image	:string ='';  public program_name	:any; public description :any;
  response;
  selectedImage:any;

  
  constructor(public homeService:HappydataService,private http: HttpClient) { }
   
  ngOnInit(): void {
  }
  
  log(x){
    console.log(x);
  }
  //onFileSelected(event){
  //  this.selectedFile=<File>event.target.files[0];
  //}

  onselectedImage(event){
    this.selectedImage =event.target.files[0];
    console.log(this.selectedImage)
  }

  
    submit(f){
      if (f.valid){
        console.log("form value " + JSON.stringify(f.value))
        const formData =new FormData();
        formData.append("act_image",this.selectedImage);
        formData.append("act_name",f.value.act_name);
        formData.append("act_date",f.value.act_date);
        formData.append("act_place",f.value.act_place);
        formData.append("act_type",f.value.act_type);
        formData.append("description",f.value.description);
        this.homeService.addActivity(formData).subscribe(
          (response) => this.response = response
        )
      }
    }
}
