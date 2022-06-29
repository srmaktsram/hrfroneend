import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardSubAdmin implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(): boolean {
    if (sessionStorage.getItem("currentUser") == "SubAdminLogin") {
      return true;
    }
    
    else {
      this._router.navigate([""]);
      return false;
    }
  }
}
