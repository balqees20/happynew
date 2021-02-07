import { Component, OnInit } from '@angular/core';
import {ABOUT} from '../../classes/about';
import {news} from '../../classes/news';
import { HttpErrorResponse } from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import {HappydataService} from '../../happydata.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  ablist :ABOUT[];
  newslist: news[];
  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
    this.gabout();
    this.get_news();
  }
  gabout(){
    this.homeService.getabout().subscribe(
      (data: ABOUT[]) => this.ablist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/activity'])
      }
    )
  }
  get_news(){
    this.homeService.getnews().subscribe(
      (data: news[]) => this.newslist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
       this.router.navigate(['/index'])
      }
    )
  }

}
