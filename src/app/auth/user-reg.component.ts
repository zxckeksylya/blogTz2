import { Component } from "@angular/core";
import { UserRepository } from '../model/user.repository';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from "../model/user.model";
import { Router} from "@angular/router";
import { DateService } from '../model/date.service';

@Component({
    templateUrl:"user-reg.component.html"
})
export class UserRegComponent{
    form:FormGroup;
    constructor(private repository:UserRepository,private router:Router,private dateService:DateService){
        this.form=new FormGroup({
            "login":new FormControl('',Validators.required),
            "password":new FormControl('',Validators.required),
            "repeatPassword":new FormControl('',Validators.required)
        })
    }

    submit(){
        const {login,password,repeatPassword}=this.form.value;
        if(password==repeatPassword){
            const user:User={
                login,
                password,
                dateOfCreated: this.dateService.date.value.format('YYYY-MM-DD'),
            }
            if(!this.repository.register(user)){
                this.form.reset();
            }else{
                //this.repository.register(user);
                this.router.navigateByUrl("/login");
            }
        }
    }
    goBack(): void{
        this.router.navigateByUrl("/login");
    }

}