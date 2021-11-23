import { Injectable } from "@angular/core";
import { DataService } from './data.service';
import { Publication } from './publication.model';

@Injectable()
export class PublicationRepository{
    private publications: Publication[]=[];
    private categories:string[]=[];

    constructor(private dataSource:DataService){
        dataSource.getPublications().subscribe(data =>{
            this.publications=data;
            this.categories = data.map(p=>p.category!)
            .filter((c,index,array)=>array.indexOf(c)==index).sort();
        },err=>console.error(err))
    }

    getPublications(category:string):Publication[]{
        return this.publications.filter(p=>category==null ||category == p.category);
    }

    getPublication(id:string):Publication{
        return this.publications.find(p=>p.id==id)!;
    }

    savePublication(publication:Publication){
        this.dataSource.savePublication(publication)
        .subscribe(data=>{this.publications.push(data)
        if(this.categories.find(item=>item==data.category)==undefined){
            this.categories.push(data.category!);
        }},
        err=>console.error(err));
    }

    removePublicaton(publication:Publication){
        this.dataSource.removeAllComentsOfPublication(publication).subscribe(()=>{

        },err=>console.error(err))
        this.dataSource.removePublication(publication).subscribe(()=>{
            this.publications=this.publications.filter(t=>t.id!==publication.id)
            this.categories = this.publications.map(p=>p.category!)
            .filter((c,index,array)=>array.indexOf(c)==index).sort();
        },err=>console.error(err))
    }
    getCategories():string[]{
        return this.categories;
    }
}