import { Injectable } from "@angular/core";
import { User} from "./user.model";
import { DataService } from './data.service';

@Injectable()
export class UserRepository{
    private authUser:User = new User();
    private chekAuth=false;
    private users:User[]=[];
    constructor(private dataSource:DataService){
        dataSource.getUsers().subscribe(data =>{
            this.users=data
        })
    }

    authenicate(user:User):boolean{
        if(this.users.find(p=>((p.login==user.login)&&(p.password==user.password))!==undefined)){
            this.authUser=this.users.find(p=>p.login==user.login)!
            console.log(this.authUser.login)
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
    getAuthUser():User{
        return this.authUser;
    }

    getCheckAuth():boolean{
        return this.chekAuth;
    }
}