import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {news} from '../../classes/news';
import {Router} from '@angular/router';
import {HappydataService} from '../../happydata.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  newslist : news[];

  constructor(private homeService:HappydataService,private router:Router) { }

  ngOnInit(): void {
    this.get_news();
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
