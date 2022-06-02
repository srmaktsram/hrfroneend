import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardClient implements CanActivate {
  constructor(private _router: Router) {
    sessionStorage.getItem("currentUser");
  }
  canActivate(): boolean {
    if (sessionStorage.getItem("currentUser")) {
      return true;
    } else {
      this._router.navigate([""]);
      return false;
    }
  }
}
