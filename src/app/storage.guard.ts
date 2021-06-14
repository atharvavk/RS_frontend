import { Injectable, OnInit } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class StorageGuard implements CanActivate, OnInit {
  constructor(private auth: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let retval = this.auth.isLoggedIn();
    return retval;
  }

  async ngOnInit() {
    await this.auth.getSession();
    console.log("session here", this.auth.session);
  }
}
