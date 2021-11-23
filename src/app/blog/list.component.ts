import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { switchMap } from 'rxjs';
import { Publication } from '../model/publication.model';
import { PublicationRepository } from '../model/publication.repository';
import { UserRepository } from '../model/user.repository';

export interface Task{
    //id?:string
    title:string;
}

@Component({
    selector:"list",
    templateUrl:"list.component.html",
    styleUrls:["list.component.css"]
})
export class ListComponent{
    public selectedCategory:any = null;

    form:FormGroup
    //publications:Publication[]=[]
    constructor(private repository:PublicationRepository,private router:Router,private userRepository:UserRepository){ 
        
        this.form=new FormGroup({
            "title": new FormControl('',Validators.required),
            "textOfBlog":new FormControl('',Validators.required),
            "category":new FormControl('',Validators.required),
        });
    }

    get publications():Publication[]{
        return this.repository.getPublications(this.selectedCategory)
    }

    get checkAuth():boolean{
        return this.userRepository.getCheckAuth()
    }
    submit(){
        console.log(this.form)
        const {title,textOfBlog,category} = this.form.value;
        const publication:Publication={
          title,
          textOfBlog,
          category,
          idOfAuthor:this.userRepository.getAuthUser().id,
        }
        this.repository.savePublication(publication);
        this.form.reset();
      }

      remove(publication:Publication){
           this.repository.removePublicaton(publication)

      }

      get categories():String[]{
        return this.repository.getCategories();
    }
    changeCategory(newCategory?:String): void{
        this.selectedCategory = newCategory;
    }
    goToLogin(){
        this.router.navigateByUrl("/login");
    }
}