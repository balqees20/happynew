import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexPageComponent } from './comp/index-page/index-page.component';
import { ListProgramComponent } from './comp/list-program/list-program.component';
import { ListActivityComponent } from './comp/list-activity/list-activity.component';
import { ListCampComponent } from './comp/list-camp/list-camp.component';
import { ListNewsComponent } from './comp/list-news/list-news.component';
import { ListcoursesComponent } from './comp/listcourses/listcourses.component';
import { ListmeetingComponent } from './comp/listmeeting/listmeeting.component';
import { FormsModule} from '@angular/forms';
import { AddprogramComponent } from './comp/addprogram/addprogram.component';
import { AddNewsComponent } from './comp/add-news/add-news.component';
import { AddCampComponent } from './comp/add-camp/add-camp.component';
import { AddCourseComponent } from './comp/add-course/add-course.component';
import { AddMeetingComponent } from './comp/add-meeting/add-meeting.component';
import { AddActivityComponent } from './comp/add-activity/add-activity.component';
import { LogoutComponent } from './comp/logout/logout.component';
import { LoginComponent } from './comp/login/login.component';
import { AdmainPageComponent } from './comp/admain-page/admain-page.component';
import { FooterComponent } from './comp/footer/footer.component';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { ListMenuItemComponent } from './MenuItem/listItem/list-menu-item/list-menu-item.component';
import { AddItemComponent } from './MenuItem/addItem/add-item/add-item.component';
import { AddItemtypeComponent } from './MenuItem/additemtype/add-itemtype/add-itemtype.component';
import { ListItemtypeComponent } from './MenuItem/listitemtype/list-itemtype/list-itemtype.component';
import { AboutComponent } from './comp/about/about.component';
import { ContactComponent } from './comp/contact/contact.component';
import { ListVisitorMassagesComponent } from './comp/list-visitor-massages/list-visitor-massages.component';
import { KitchenmanageComponent } from './comp/kitchenmanage/kitchenmanage.component';
import { DiscountitemComponent } from './MenuItem/discountitem/discountitem.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    ListProgramComponent,
    ListActivityComponent,
    ListCampComponent,
    ListNewsComponent,
    ListcoursesComponent,
    ListmeetingComponent,
    AddprogramComponent,
    AddNewsComponent,
    AddCampComponent,
    AddCourseComponent,
    AddMeetingComponent,
    AddActivityComponent,
    LogoutComponent,
    LoginComponent,
    AdmainPageComponent,
    FooterComponent,
    NavbarComponent,
    ListMenuItemComponent,
    AddItemComponent,
    AddItemtypeComponent,
    ListItemtypeComponent,
    AboutComponent,
    ContactComponent,
    ListVisitorMassagesComponent,
    KitchenmanageComponent,
    DiscountitemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
