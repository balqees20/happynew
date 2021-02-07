import { Component, OnInit } from '@angular/core';
import {Program} from '../../classes/program';
import {HappydataService} from '../../happydata.service';

@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.css']
})
export class AddprogramComponent implements OnInit {
  public pname:any;	
  public description :any;
  response
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
      let Pro: Program = f.value
      this.homeService.addProgram(Pro).subscribe(
        (response) =>this.response =response
      )
    }
  }


}
