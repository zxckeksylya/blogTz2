import { NgModule } from "@angular/core";
import { ModelModule } from '../model/model.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { RouterModule } from '@angular/router';
import { BlogComponent } from "./blog.component";

@NgModule({
    imports: [ModelModule, BrowserModule,RouterModule,FormsModule,
        ReactiveFormsModule,],
    declarations: [ListComponent,BlogComponent],
    exports: [ListComponent,BlogComponent],
})
export class ListModule {}
