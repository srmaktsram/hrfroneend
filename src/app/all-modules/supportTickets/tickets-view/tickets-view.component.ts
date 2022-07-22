import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.css']
})
export class TicketsViewComponent implements OnInit {
  public id: any;
  images: any;
  public descryption: any;
  lstTicket: any;
  files: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.id = this.route.snapshot.queryParams["id"];
  }

  ngOnInit() {
    this.getSingleTicket()
  }
  getSingleTicket() {
    this.http.get("http://localhost:8443/mainadmin/supportTickets/getSingleTicket" + "/" + this.id).subscribe((res: any) => {
      console.log(res, "single ticket Api>>>>>>>>>>>><<<<<<<<<<<<<<")
      this.lstTicket = res
      this.images = this.lstTicket.images;
      this.files = this.lstTicket.files
      console.log(this.files, ">>>>>>>>>>>>>>>>>>/////////////////\\\\\\\\\\\\\\\\\<<<<<<<<<<<<<<")
    })

  }
}

