import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{SitManger} from '../../classes/sitManger';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response : any
  body : any
  message
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }
  submit(f){
    if (f.valid){
      console.log("value " + f.value.mangerName)
      this.loginService.login(f.value.mangerName, f.value.password).subscribe(
        response => {
          this.body = response
          console.log(this.body)
          if (this.body.name){
            localStorage.setItem("name", this.body.name)
            if(this.body.name=='admin1')
            this.router.navigate(['/admain'])
            else 
            this.router.navigate(['/kitchenmanger'])
          }
          else{
            this.message = "Access Denide, Invalid name or password"
          }
          
        }
      )
    }

  }

}
