import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListModule } from './blog/list.module';
import { ListComponent } from './blog/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogComponent } from './blog/blog.component';
import { UserModule } from './auth/user.module';
import { AuthComponent } from './auth/auth.component';
import { UserRegComponent } from './auth/user-reg.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    RouterModule.forRoot([
      { path: "list", component: ListComponent },
      { path: "list/:id", component: BlogComponent },
      { path: "login",component:AuthComponent},
      { path: "register", component:UserRegComponent},
      { path: "**", redirectTo: "/list" },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
