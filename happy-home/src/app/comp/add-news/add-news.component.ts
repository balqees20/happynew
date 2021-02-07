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
  constructor(private homeService:HappydataService) { }

  ngOnInit(): void {
  }
  log(x){
    console.log(x);
  }


  submit(f){
    if (f.valid){
      console.log("form value " + JSON.stringify(f.value))
      let n:news = f.value
      this.homeService.addnews(n).subscribe(
        (response) =>this.response =response
      )
    }
  }


}
