import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { ListComponent } from './blog/list.component';

@Injectable()
export class ListFirstGuard{
    private firstNavigation = true;

    constructor(private router: Router){}

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
        if(this.firstNavigation){
            this.firstNavigation = false;
            if(route.component != ListComponent){
                this.router.navigateByUrl("/");
                return false;
            }
        }
        return true;
    }

}