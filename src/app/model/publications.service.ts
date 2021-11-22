import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable } from "rxjs";
import { Publication } from './publication.model';
import {map} from 'rxjs/operators' 
import { Task } from "../blog/list.component";
import { Coment } from './coment.model';
import { User } from "./user.model";


interface CreateResponse{
    name:string
}

@Injectable({
    providedIn:"root"
})
export class PublicationsService{
    static url = 'https://angulartzblog-default-rtdb.europe-west1.firebasedatabase.app'
    //response:any;

    constructor(private http:HttpClient){}

    getPublications():Observable<Publication[]>{
        return this.http.get<Publication[]>(`${PublicationsService.url}/Publications.json`).pipe(map(publications =>{
            if(!publications){
                return[]
            }
            return Object.keys(publications).map(key => ({...publications[key as any],id:key}))
        }))
    }
    savePublication(publication:Publication):Observable<Publication>{
        return this.http.post<CreateResponse>(`${PublicationsService.url}/Publications.json`,publication)
        .pipe(map(res=>{
            return{...publication, id:res.name}
        }))
    }

    removePublication(publication:Publication):Observable<void>{
         return this.http.delete<void>(`${PublicationsService.url}/Publications/${publication.id}.json`)
    }
    removeAllComentsOfPublication(publication:Publication):Observable<void>{
        return this.http.delete<void>(`${PublicationsService.url}/Coments/${publication.id}.json`)
    }
    getComments(publication:Publication):Observable<Coment[]>{
        return this.http.get<Coment[]>(`${PublicationsService.url}/Coments/${publication.id}.json`)
        .pipe(map(comensts =>{
            if(!comensts){
                return []
            }
            return Object.keys(comensts).map(key =>({...comensts[key as any],id:key}))
        }))
    }

    saveComment(publication:Publication,coment:Coment):Observable<Coment>{
        return this.http.post<CreateResponse>(`${PublicationsService.url}/Coments/${publication.id}.json`,coment).pipe(map(res=>{
            return{...coment, id:res.name}
        }))
    }
    removeComment(publication:Publication,coment:Coment):Observable<void>{
        return this.http.delete<void>(`${PublicationsService.url}/Coments/${publication.id}/${coment.id}.json`)
    }

    getUsers():Observable<User[]>{
        return this.http.get<User[]>(`${PublicationsService.url}/Users.json`).pipe(map(users => {
            if(!users){
                return []
            }
            return Object.keys(users).map(key => ({...users[key as any],id:key}))
        }))
    }
    saveUser(user:User):Observable<User>{
        return this.http.post<CreateResponse>(`${PublicationsService.url}/Users.json`,user).pipe(map(res=>{
            return {...user,id:res.name}
        }))
    }
}