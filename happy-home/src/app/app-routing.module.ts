import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPageComponent } from './comp/index-page/index-page.component';
import { from } from 'rxjs';
import { ListActivityComponent } from './comp/list-activity/list-activity.component';
import { ListCampComponent } from './comp/list-camp/list-camp.component';
import { ListNewsComponent } from './comp/list-news/list-news.component';
import { ListProgramComponent } from './comp/list-program/list-program.component';
import { ListcoursesComponent } from './comp/listcourses/listcourses.component';
import { ListmeetingComponent } from './comp/listmeeting/listmeeting.component';
import { AddprogramComponent } from './comp/addprogram/addprogram.component';
import { AddCampComponent } from './comp/add-camp/add-camp.component';
import { AddCourseComponent } from './comp/add-course/add-course.component';
import { AddMeetingComponent } from './comp/add-meeting/add-meeting.component';
import { AddNewsComponent } from './comp/add-news/add-news.component';
import { AddActivityComponent } from './comp/add-activity/add-activity.component';
import { LoginComponent } from './comp/login/login.component';
import { LogoutComponent } from './comp/logout/logout.component'
import { AdmainPageComponent } from './comp/admain-page/admain-page.component';
import { ListMenuItemComponent } from './MenuItem/listItem/list-menu-item/list-menu-item.component';
import { AddItemComponent } from './MenuItem/addItem/add-item/add-item.component';
import { AddItemtypeComponent } from './MenuItem/additemtype/add-itemtype/add-itemtype.component';
import { ListItemtypeComponent } from './MenuItem/listitemtype/list-itemtype/list-itemtype.component';
import { AboutComponent } from './comp/about/about.component'
import { ContactComponent } from './comp/contact/contact.component';
import { ListVisitorMassagesComponent } from './comp/list-visitor-massages/list-visitor-massages.component';
import { KitchenmanageComponent } from './comp/kitchenmanage/kitchenmanage.component';
import { AuthGuard } from './auth.guard';
import { DiscountitemComponent}from './MenuItem/discountitem/discountitem.component';
import { AdddiscountComponent } from './MenuItem/adddiscount/adddiscount.component';
const routes: Routes = [
  { path: "about", component: AboutComponent },
  { path: "indexc", component: IndexPageComponent },
  { path: "activity", component: ListActivityComponent },
  { path: "camp", component: ListCampComponent },
  { path: "news", component: ListNewsComponent },
  { path: "programs", component: ListProgramComponent },
  { path: "courses", component: ListcoursesComponent },
  { path: "meetings", component: ListmeetingComponent },
  {path:"discount",component:DiscountitemComponent},
  {
    path: "addprogram", component: AddprogramComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin1'
    }
  },
  { path: "addactivity", component: AddActivityComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "addcamp", component: AddCampComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "addcoures", component: AddCourseComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "addmeeting", component: AddMeetingComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "addnews", component: AddNewsComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "login", component: LoginComponent },
  { path: "admain", component: AdmainPageComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin1'
  } },
  { path: "additem", component: AddItemComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin2'
  } },
  { path: "menuitems/:itemType_id", component: ListMenuItemComponent },
  { path: "additemtype", component: AddItemtypeComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin2'
  } },
  {path:"adddiscount" ,component:AdddiscountComponent,canActivate: [AuthGuard],
  data: {
    role: 'admin2'
  } },
  { path: "itemtype", component: ListItemtypeComponent },
  { path: "contact", component: ContactComponent },
  { path: "massages", component: ListVisitorMassagesComponent },
  { path: "logout", component: LogoutComponent },
  { path: "login", component: LoginComponent },
  { path: "kitchenmanger", component: KitchenmanageComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'admin2'
  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
