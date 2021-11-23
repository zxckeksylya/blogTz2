import { Component } from "@angular/core";
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User} from "../model/user.model";
import { UserRepository } from '../model/user.repository';
import { Router } from '@angular/router';

@Component({
    templateUrl:"auth.component.html"
})
export class AuthComponent{
    form:FormGroup

    constructor(private repository:UserRepository,private router:Router){
        this.form=new FormGroup({
            "login":new FormControl('',Validators.required),
            "password":new FormControl('',Validators.required),
        })
    }
    submit(){
        console.log(this.form.value);
        const {login,password}=this.form.value;
        const user:User={
            login,
            password
        }
        // console.log(this.repository.authenicate(user))
        if(this.repository.authenicate(user)){
            this.router.navigateByUrl("/list")
        }else{
            this.form.reset();
        }

    }

    goToRegister(){
        this.router.navigateByUrl("/register");
    }

    goBack(): void{
        this.router.navigateByUrl("/list");
    }

}