import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {Program ,} from './classes/program';
import {active} from './classes/activity';
import {camp} from './classes/camp';
import {course} from './classes/course';
import {meeting} from './classes/meeting';
import {news} from './classes/news';
import {menuItem} from './classes/menuitem';
import {ItemType} from './classes/itemtype';
import{ABOUT} from './classes/about';
import {contact} from './classes/contactv';
import {discount} from './classes/discount';

import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HappydataService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'});
  programUrl = "http://localhost:4620/program/"
  activUrl ="http://localhost:4620/activity/"
  //activDUrl ="http://localhost:4620/activity/act_id/"

  campUrl ="http://localhost:4620/camp/"
  courseUrl ="http://localhost:4620/course/" 
  meetUrl ="http://localhost:4620/meeting/" 
  newsUrl ="http://localhost:4620/news/" 
  menuUrl ="http://localhost:4620/menuitems/" 
  menuTUrl ="http://localhost:4620/menuitems/itemType_id" 

  aboutUrl="http://localhost:4620/about/"
  itemtypeUrl="http://localhost:4620/itemtype/"
  contactUrl="http://localhost:4620/contact/"
  disUrl="http://localhost:4620/discount/"

  imageUrl="http://localhost:4620/file/"





  constructor(private http: HttpClient) { } 
  getProgram(){
    return this.http.get(this.programUrl)
  }

  getActivity(){
    return this.http.get(this.activUrl)
  }
  getCamp(){
    return this.http.get(this.campUrl)
  } 
  getCourses(){
    return this.http.get(this.courseUrl)
  }
  

  getMeeting(){
    return this.http.get(this.meetUrl)
  }
  deleteitemtype(id :number){
    console.log(`${this.itemtypeUrl}/${id}`,"qweqweqwe");
    return this.http.post(`${this.itemtypeUrl}/delete`,{id: id});
  }
  getallitem(){
    return this.http.get(this.menuUrl)
  }

  getnews(){
    return this.http.get(this.newsUrl)
  }






  getmenuitem(itemType_id:Number){
    console.log(`${this.menuUrl}/${itemType_id}`);
    return this.http.get(`${this.menuUrl}/${itemType_id}`,)
  }







  getitemtype(){
    return this.http.get(this.itemtypeUrl)
  }
  getabout(){
    return this.http.get(this.aboutUrl)
  }
  getdiscount(){
    return this.http.get(this.disUrl)
  }
  getmassages(){
    return this.http.get(this.contactUrl)
  }

 
  addaboutitem(abo:ABOUT){
    let body = {
      "about": abo
    }
    return this.http.post(this.aboutUrl, body)
  }
  addvisitorcontact(con:contact){
    let body = {
      "contactv": con
    }
    return this.http.post(this.contactUrl, body)
  }


  addProgram(prm:Program){
    let body = {
      "program": prm
    }
    return this.http.post(this.programUrl, body)
  }

  addActivity(act:any){
   
    return this.http.post(this.activUrl,act)
  }
  adddiscount(act:any){
   
    return this.http.post(this.disUrl,act)
  }

  addCamp(cam:any){
  
    return this.http.post(this.campUrl,cam)

  }

  addCourses(cour:course){
    let body ={
      "course":cour
    }
    return this.http.post(this.courseUrl,body)
  }



  addMeeting(meet:any){
    return this.http.post(this.meetUrl,meet)
  }
  addnews(news:any){
    return this.http.post(this.newsUrl,news)
  }
  additem(P:menuItem){
    let body ={"menuitem":P}
    return this.http.post(this.menuUrl,body)
  }

  deleteProgram(program_id :number){
    console.log(`${this.programUrl}/${program_id}`,"qweqweqwe");
    return this.http.post(`${this.programUrl}/delete`,{id: program_id});
  }
 

  deleteactivity (act_id: number){
    console.log(`${this.activUrl}/${act_id}`,"qweqweqwe");
    return this.http.post(`${this.activUrl}/delete`,{id: act_id});
    
  }
  deletedis (disitem_id : number){
    console.log(`${this.disUrl}/${disitem_id }`,"qweqweqwe");
    return this.http.post(`${this.disUrl}/delete`,{id: disitem_id });
    
  }


  deletecamp(camp_id: number){
    console.log(`${this.campUrl}/${camp_id}`,"qweqweqwe");
    return this.http.post(`${this.campUrl}/delete`,{id: camp_id});
  }


  deletecourse(coures_id:number){
    console.log(`${this.courseUrl}/${coures_id}`,"qweqweqwe");
    return this.http.post(`${this.courseUrl}/delete`,{id: coures_id});
  }

  deletenews(news_id :number){
    console.log(`${this.newsUrl}/${news_id}`,"qweqweqwe");
    return this.http.post(`${this.newsUrl}/delete`,{id:news_id});
  }

  deletemeeting(meeting_id :number){
    console.log(`${this.meetUrl}/${meeting_id}`,"qweqweqwe");
    return this.http.post(`${this.meetUrl}/delete`,{id: meeting_id});
  }
  

  deletemenuitem(item_id: number){
    console.log(`${this.menuUrl}/${item_id}`,"qweqweqwe");
    return this.http.post(`${this.menuUrl}/delete`,{id: item_id});
  }
  deleteaboutitem(about_id: number){
    console.log(`${this.aboutUrl}/${about_id}`,"qweqweqwe");
    return this.http.post(`${this.aboutUrl}/delete`,{id:about_id});
  }
  deleteVisitoirMassage(visitor_id: number){
    console.log(`${this.contactUrl}/${visitor_id}`,"qweqweqwe");
    return this.http.post(`${this.contactUrl}/delete`,{id:visitor_id});
  }
  addimage(image:any){
    const formdata=new FormData();
    formdata.append('file',image);
  return this.http.post(this.imageUrl,formdata);
  }
  additemtype(itm:any){
    
  return this.http.post(this.itemtypeUrl,itm);
  }
  /*additemtype(itm:ItemType){
    let body = {
      "itemtype": itm
    }
    return this.http.post(this.itemtypeUrl, body)
  }*/
}

