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
import { ListFirstGuard } from './listFirst.guard';


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
      { path: "list", component: ListComponent ,
      canActivate: [ListFirstGuard]},
      { path: "list/:id", component: BlogComponent,
      canActivate: [ListFirstGuard]},
      { path: "login",component:AuthComponent,
      canActivate: [ListFirstGuard]},
      { path: "register", component:UserRegComponent,
      canActivate: [ListFirstGuard]},
      { path: "**", redirectTo: "/list" },
    ]),
  ],
  providers: [ListFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
