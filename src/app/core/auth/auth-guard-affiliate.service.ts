import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuardAffiliate implements CanActivate {
  constructor(private _router: Router) {
    sessionStorage.getItem("currentUser");
  }
  canActivate(): boolean {
    if (sessionStorage.getItem("currentUser") == "AffiliateLogin") {
      return true;
    } else {
      this._router.navigate([""]);
      return false;
    }
  }
}
