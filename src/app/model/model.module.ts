import { NgModule } from "@angular/core";
import { PublicationRepository } from "./publication.repository";
import { DataService } from './data.service';
import { UserRepository } from './user.repository';
import { MomentPipe } from "./moment.pipe";

@NgModule({
    providers:[DataService,PublicationRepository,UserRepository,MomentPipe]
})
export class ModelModule{}