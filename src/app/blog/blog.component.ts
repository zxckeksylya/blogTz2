import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { PublicationRepository } from '../model/publication.repository';
import { Publication } from '../model/publication.model';
import { Coment } from '../model/coment.model';
import { PublicationsService } from '../model/publications.service';

@Component({
    //selector:"blog",
    //moduleId:module.id,
    templateUrl:"blog.component.html"
})
export class BlogComponent{
    publication:Publication = new Publication();
    comets:Coment[]=[];

    constructor(private repositry: PublicationRepository,private router:Router,activeRoute:ActivatedRoute,private publicationsService:PublicationsService){
        Object.assign(this.publication,repositry.getPublication(activeRoute.snapshot.params["id"]));
        this.publicationsService.getComments(this.publication).subscribe(data=>{
            this.comets=data;
        },
        err=>console.error(err))
     }

     get coments():Coment[]{
        return this.comets;
     }

    saveComent(textOfComent:string): void{
         const coment:Coment={
            textOfComent
         }
         this.publicationsService.saveComment(this.publication,coment).subscribe(
            p=>this.comets.push(p),
            err=>console.error(err)
         )
    }

    goBack(): void{
        this.router.navigateByUrl("/list");
    }

    remove(coment:Coment): void{
        this.publicationsService.removeComment(this.publication,coment).subscribe(()=>{
            this.comets=this.comets.filter(t=>t.id!==coment.id)
        });
    }
}

