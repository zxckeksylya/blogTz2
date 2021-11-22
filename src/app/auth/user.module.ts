import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ModelModule } from "../model/model.module";
import { AuthComponent } from './auth.component';
import { UserRegComponent } from './user-reg.component';

@NgModule({
    imports: [ModelModule, BrowserModule,RouterModule,FormsModule,
        ReactiveFormsModule,],
    declarations: [AuthComponent,UserRegComponent],
    exports: [AuthComponent,UserRegComponent],
})
export class UserModule{}