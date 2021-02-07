import { Component, OnInit } from '@angular/core';
import {contact}from '../../classes/contactv';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
      let c:contact = f.value
      this.homeService.addvisitorcontact(c).subscribe(
        (response) =>this.response =response
      )
    }
  }



}
