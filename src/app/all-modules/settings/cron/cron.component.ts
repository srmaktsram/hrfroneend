import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cron',
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.css']
})
export class CronComponent implements OnInit {
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
