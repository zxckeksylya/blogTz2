import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Publication } from '../model/publication.model';
import { PublicationRepository } from '../model/publication.repository';
import { UserRepository } from '../model/user.repository';
import { Coment } from '../model/coment.model';

export interface Task {
  //id?:string
  title: string;
}

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  public selectedCategory: any = null;

  form: FormGroup;
  //publications:Publication[]=[]
  constructor(
    private repository: PublicationRepository,
    private router: Router,
    private userRepository: UserRepository
  ) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      textOfBlog: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    });
  }

  get publications(): Publication[] {
    return this.repository.getPublications(this.selectedCategory);
  }

  getComents(publication: Publication): Coment[] {
    return this.repository.getComents(publication);
  }

  getCountOfLikes(publication:Publication):number{
    return publication.likes?.length!
  }

  get checkAuth(): boolean {
    return this.userRepository.getCheckAuth();
  }
  submit() {
    console.log(this.form);
    const { title, textOfBlog, category } = this.form.value;
    const publication: Publication = {
      title,
      textOfBlog,
      category,
      idOfAuthor: this.userRepository.getAuthUser().id,
      likes:[],
      coments:[]
    };
    this.repository.savePublication(publication);
    this.form.reset();
  }

  remove(publication: Publication) {
    this.repository.removePublicaton(publication);
  }

  get categories(): String[] {
    return this.repository.getCategories();
  }
  changeCategory(newCategory?: String): void {
    this.selectedCategory = newCategory;
  }
}
