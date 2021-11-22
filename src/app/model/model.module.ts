import { NgModule } from "@angular/core";
import { PublicationRepository } from "./publication.repository";
import { PublicationsService } from './publications.service';
import { UserRepository } from './user.repository';

@NgModule({
    providers:[PublicationsService,PublicationRepository,UserRepository]
})
export class ModelModule{}