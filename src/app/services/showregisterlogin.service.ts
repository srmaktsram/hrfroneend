import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowregisterloginService {

  public hr_registrationSubject = new Subject<any>();

  constructor() { }

  showPage(data) {
    this.hr_registrationSubject.next(data);

  }
}
