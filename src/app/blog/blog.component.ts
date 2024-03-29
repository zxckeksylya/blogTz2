import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PublicationRepository } from '../model/publication.repository';
import { Publication } from '../model/publication.model';
import { Coment } from '../model/coment.model';
import { DataService } from '../model/data.service';
import { UserRepository } from '../model/user.repository';
import { Like } from '../model/like.model';
import { DateService } from '../model/date.service';

@Component({
  //selector:"blog",
  //moduleId:module.id,

  templateUrl: 'blog.component.html',
  styleUrls:["blog.component.scss"]

})
export class BlogComponent {
  publication: Publication = new Publication();
  form: FormGroup;

  constructor(
    private repositry: PublicationRepository,
    private router: Router,
    activeRoute: ActivatedRoute,
    private dateService:DateService,
    private dataService: DataService,
    private userRepository: UserRepository
  ) {
    Object.assign(
      this.publication,
      repositry.getPublication(activeRoute.snapshot.params['id'])
    );
    this.form = new FormGroup({
      textOfComent: new FormControl('', Validators.required),
    });
  }

  get coments(): Coment[] {
    return this.publication.coments!;
  }
  get countOfLikes(): number {
    return this.publication.likes!.length;
  }
  get checkAuth(): boolean {
    return this.userRepository.getCheckAuth();
  }

  submit() {
    console.log(this.form);
    const { textOfComent } = this.form.value;
    const coment: Coment = {
      textOfComent,
      idOfAuthor: this.userRepository.getAuthUser().id,
      dateOfCreated: this.dateService.date.value.format('YYYY-MM-DD'),
    };
    this.dataService.saveComment(this.publication, coment).subscribe(
      (p) => {
        this.repositry.saveComent(this.publication, p);
      },
      (err) => console.error(err)
    );
    this.form.reset();
  }

  goBack(): void {
    this.router.navigateByUrl('/list');
  }

  liked():boolean{
    return (this.publication.likes?.find(p=>p.idOfAuthor==this.userRepository.getAuthUser().id)==undefined);
  }

  changeLike(): void {
       if(this.publication.likes?.find(p=>p.idOfAuthor==this.userRepository.getAuthUser().id)==undefined){
           const like:Like={
            idOfAuthor: this.userRepository.getAuthUser().id,
            dateOfCreated: this.dateService.date.value.format('YYYY-MM-DD'),
           }
           this.dataService.saveLike(this.publication,like).subscribe(
               p=>{
                this.repositry.saveLike(this.publication,p);
               }
         
           )
       }else{
           const like:Like=this.publication.likes.find(p=>p.idOfAuthor==this.userRepository.getAuthUser().id)!
           this.dataService.removeLike(this.publication,like).subscribe(()=>{
               this.publication.likes=this.publication.likes!.filter(t=>t.id!==like.id);
               this.repositry.removeLike(this.publication)
           },err=>console.error(err))
       }
}

  remove(coment: Coment): void {
    this.dataService.removeComment(this.publication, coment).subscribe(() => {
        this.publication.coments = this.publication.coments!.filter((t) => t.id !== coment.id);
        this.repositry.removeComent(this.publication)
    },err=>console.error(err));
  }
}
