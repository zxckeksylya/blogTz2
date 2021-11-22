import { Injectable } from "@angular/core";
import { User} from "./user.model";
import { PublicationsService } from './publications.service';

@Injectable()
export class UserRepository{
    private authUser:User = new User();
    private chekAuth=false;
    private users:User[]=[];
    constructor(private dataSource:PublicationsService){
        dataSource.getUsers().subscribe(data =>{
            this.users=data
        })
    }

    authenicate(user:User):boolean{
        if(this.users.find(p=>((p.login==user.login)&&(p.password==user.password))!==undefined)){
            this.authUser=this.users.find(p=>p.login==user.login)!
            this.chekAuth=true;
            return true;
        }
        return false;
    }

    register(user:User):boolean{
        console.log(this.users.find(p=>p.login==user.login))
        if(this.users.find(p=>p.login==user.login)==undefined){
            console.log("123")
            this.dataSource.saveUser(user).subscribe(t=>{
                console.log("321")
                this.users.push(t);
            })
            return true
        }
        return false;
    }
}