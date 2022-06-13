import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardEmployee implements CanActivate {
  constructor(private _router: Router) {
    // sessionStorage.getItem("currentEmployee");
  }
  canActivate(): boolean {
    if (sessionStorage.getItem("currentUser") == "EmployeeLogin") {
      return true;
    } else {
      this._router.navigate([""]);
      return false;
    }
  }
}
