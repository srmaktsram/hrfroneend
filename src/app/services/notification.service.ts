import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
    providedIn:'root'
}) 
export class NotificationService {
    // notifications: any;
    public notificationChange: Subject<number> = new Subject<number>();
    notifications: number;

    constructor(private http: HttpClient){

        this.notificationChange.subscribe((value) => {
            this.notifications = value;
        });
    }

    updateNotificationNumber(item: any) { 
        console.log('Notification Service: update notification number, calling next');  
        this.notificationChange.next(item);
    }
}