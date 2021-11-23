import { Component } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { PublicationRepository } from '../model/publication.repository';
import { Publication } from '../model/publication.model';
import { Coment } from '../model/coment.model';
import { PublicationsService } from '../model/publications.service';
import { UserRepository } from '../model/user.repository';

@Component({
    //selector:"blog",
    //moduleId:module.id,
    templateUrl:"blog.component.html"
})
export class BlogComponent{
    publication:Publication = new Publication();
    comets:Coment[]=[];
    form:FormGroup

    constructor(private repositry: PublicationRepository,private router:Router,activeRoute:ActivatedRoute,private publicationsService:PublicationsService,private userRepository:UserRepository){
        Object.assign(this.publication,repositry.getPublication(activeRoute.snapshot.params["id"]));
        this.publicationsService.getComments(this.publication).subscribe(data=>{
            this.comets=data;
        },
        err=>console.error(err))
        this.form=new FormGroup({
            "textOfComent": new FormControl('',Validators.required)
        })
     }

     get coments():Coment[]{
        return this.comets;
     }

     get checkAuth():boolean{
         console.log(this.userRepository.getCheckAuth())
        return this.userRepository.getCheckAuth()
    }

    submit(){
        console.log(this.form)
        const {textOfComent} = this.form.value;
        const coment:Coment={
          textOfComent,
        }
        this.publicationsService.saveComment(this.publication,coment).subscribe(
            p=>this.comets.push(p),
            err=>console.error(err)
         )
        this.form.reset();
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

