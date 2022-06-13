import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardHrUser implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(): boolean {
    if (sessionStorage.getItem("currentHrUserLgn")) {
      return true;
    } else {
      this._router.navigate([""]);

      return false;
    }
  }
}
