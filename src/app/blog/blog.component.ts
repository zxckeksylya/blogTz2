import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PublicationRepository } from '../model/publication.repository';
import { Publication } from '../model/publication.model';
import { Coment } from '../model/coment.model';
import { DataService } from '../model/data.service';
import { UserRepository } from '../model/user.repository';
import { Like } from '../model/like.model';

@Component({
  //selector:"blog",
  //moduleId:module.id,
  templateUrl: 'blog.component.html',
})
export class BlogComponent {
  publication: Publication = new Publication();
  form: FormGroup;

  constructor(
    private repositry: PublicationRepository,
    private router: Router,
    activeRoute: ActivatedRoute,
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
//   changeLike(): void {
//        if(this.publication.likes?.find(p=>p.idOfAuthor==this.userRepository.getAuthUser().id)!==undefined){
//            this.dataService.
//        }
//}

  remove(coment: Coment): void {
    this.dataService.removeComment(this.publication, coment).subscribe(() => {
        this.publication.coments = this.publication.coments!.filter((t) => t.id !== coment.id);
        this.repositry.removeComent(this.publication)
    });
  }
}
