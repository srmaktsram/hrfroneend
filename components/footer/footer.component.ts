import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  plusIcon1 = false;
  plusIcon2 = false;
  plusIcon3 = false;

  minusIcon1 = true;
  minusIcon2 = true;
  minusIcon3 = true;


  public FMGC = false;
  public Electronics = true;
  public Hardwere = true;
  public Kirana = true;
  public Jewellary = true;
  public Pharma = true;
  public Transportation = true;


  showText(val) {

    if (val === '1') {
      this.plusIcon1 = true;
      this.plusIcon2 = false;
      this.plusIcon3 = false;

      this.minusIcon1 = false;
      this.minusIcon2 = true;
      this.minusIcon3 = true;

    }

    if (val === '11') {
      this.plusIcon1 = false;
      this.plusIcon2 = false;
      this.plusIcon3 = false;

      this.minusIcon1 = true;
      this.minusIcon2 = true;
      this.minusIcon3 = true;


    }

    ////////////////////////////////////////////////////////////

    else if (val === '2') {

      this.plusIcon1 = false;
      this.plusIcon2 = true;
      this.plusIcon3 = false;


      this.minusIcon1 = true;
      this.minusIcon2 = false;
      this.minusIcon3 = true;

    }

    if (val == '22') {

      this.plusIcon1 = false;
      this.plusIcon2 = false;
      this.plusIcon3 = false;


      this.minusIcon1 = true;
      this.minusIcon2 = true;
      this.minusIcon3 = true;
    }
    else if (val === '3') {


      this.plusIcon1 = false;
      this.plusIcon2 = false;
      this.plusIcon3 = true;


      this.minusIcon1 = true;
      this.minusIcon2 = true;
      this.minusIcon3 = false;

    }
    if (val === '33') {

      this.plusIcon1 = false;
      this.plusIcon2 = false;
      this.plusIcon3 = false;


      this.minusIcon1 = true;
      this.minusIcon2 = true;
      this.minusIcon3 = true;


    }

  }

  //////////////////////////////////////////////////////////////////////////////////////

  showComment(val) {

    if (val == '1') {

      this.FMGC = false;
      this.Electronics = true;
      this.Hardwere = true;
      this.Kirana = true;
      this.Jewellary = true;
      this.Pharma = true;
      this.Transportation = true;

    }
    else if (val == '2') {
      this.FMGC = true;
      this.Electronics = false;
      this.Hardwere = true;
      this.Kirana = true;
      this.Jewellary = true;
      this.Pharma = true;
      this.Transportation = true;

    }
    else if (val == '3') {
      this.FMGC = true;
      this.Electronics = true;
      this.Hardwere = false;
      this.Kirana = true;
      this.Jewellary = true;
      this.Pharma = true;
      this.Transportation = true;

    }
    else if (val == '4') {
      this.FMGC = true;
      this.Electronics = true;
      this.Hardwere = true;
      this.Kirana = false;
      this.Jewellary = true;
      this.Pharma = true;
      this.Transportation = true;

    }
    else if (val == '5') {
      this.FMGC = true;
      this.Electronics = true;
      this.Hardwere = true;
      this.Kirana = true;
      this.Jewellary = false;
      this.Pharma = true;
      this.Transportation = true;

    }
    else if (val == '6') {
      this.FMGC = true;
      this.Electronics = true;
      this.Hardwere = true;
      this.Kirana = true;
      this.Jewellary = true;
      this.Pharma = false;
      this.Transportation = true;

    }
    else if (val == '7') {
      this.FMGC = true;
      this.Electronics = true;
      this.Hardwere = true;
      this.Kirana = true;
      this.Jewellary = true;
      this.Pharma = true;
      this.Transportation = false;

    }

  }
}
