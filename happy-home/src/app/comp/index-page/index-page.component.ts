import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {news} from '../../classes/news';
import {Router} from '@angular/router';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  newslist : news[];
  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
    this.mynews();
  }
  mynews(){
    this.homeService.getnews().subscribe(
    (data: news[]) => this.newslist = data,
    (error: HttpErrorResponse) => {
      console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
      this.router.navigate(['/index'])
    }
  )
  }

}
