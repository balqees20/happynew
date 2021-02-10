import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import {discount} from '../../classes/discount';
import {HappydataService}from '../../happydata.service';

@Component({
  selector: 'app-discountitem',
  templateUrl: './discountitem.component.html',
  styleUrls: ['./discountitem.component.css']
})
export class DiscountitemComponent implements OnInit {
  discountlist:discount[];
  constructor(private homeService:HappydataService ,private router:Router) { }

  ngOnInit(): void {
    this.showdiscount();
  }
  showdiscount(){
    this.homeService.getdiscount().subscribe(
      (data:discount[]) => this.discountlist = data,
      (error: HttpErrorResponse) => {
        console.log(">>>>>>" + error.status + " " + JSON.stringify(error));
        //this.router.navigate(['/index'])
      }
    )
    
  }

}
