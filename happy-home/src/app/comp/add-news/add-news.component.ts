import { Component, OnInit } from '@angular/core';
import {news} from '../../classes/news';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  public news_title:any;
  public  date:any;
   public description:any;
   response 
   selectedImage : any;
  url;
  image;
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
      const formData =new FormData();
      formData.append("N_image",this.selectedImage);
      formData.append("news_title",f.value.news_title);
      formData.append("description",f.value.description);
      formData.append("date",f.value.date);

       this.homeService.addnews(formData).subscribe(
        (response) =>this.response =response
      )
    }
  }


}
