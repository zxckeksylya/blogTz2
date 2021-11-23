import { NgModule } from "@angular/core";
import { PublicationRepository } from "./publication.repository";
import { DataService } from './data.service';
import { UserRepository } from './user.repository';

@NgModule({
    providers:[DataService,PublicationRepository,UserRepository]
})
export class ModelModule{}