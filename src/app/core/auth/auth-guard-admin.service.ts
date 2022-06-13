import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardAdmin implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(): boolean {
    if (sessionStorage.getItem("currentUser") == "AdminLogin") {
      return true;
    } else {
      this._router.navigate([""]);

      return false;
    }
  }
}
