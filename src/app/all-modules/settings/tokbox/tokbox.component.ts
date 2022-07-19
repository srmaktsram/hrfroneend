import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tokbox',
  templateUrl: './tokbox.component.html',
  styleUrls: ['./tokbox.component.css']
})
export class TokboxComponent implements OnInit {
  user_type: string;
  settingsWrite: string;
  settingsWriteSub: string;

  constructor() {
    this.user_type = sessionStorage.getItem("user_type");
    this.settingsWrite = sessionStorage.getItem("settingsWrite");
    this.settingsWriteSub = sessionStorage.getItem("settingsWriteSub");
   }

  ngOnInit(): void {
  }

}
