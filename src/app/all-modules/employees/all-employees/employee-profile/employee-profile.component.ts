import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
declare const $: any;
@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",
  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit {

  public addEmployeeForm: FormGroup;
  public editProfileForm: FormGroup;
  public editPersonalForm: FormGroup;
  public editFamilyForm: FormGroup;
  public editEmergencyForm: FormGroup;
  public editEducationForm: FormGroup;
  editBankForm: FormGroup;
  public editExpForm: FormGroup;
  id: string;
  data: any;
  public profileEmp: any
  public name: any;
  designation: any;
  department: any;
  employeeid: any;
  joindate: any;
  resultArray: any;
  phone: any;
  email: any;
  profileinfo;
  personalinfo;
  emergencycontect: any;
  bankinfo: any;
  familyinfo: any;
  educationinfo: any;
  expinfo: any;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.id = sessionStorage.getItem("empid")
    this.getId(this.id);


  }

  ngOnInit() {

    this.addEmployeeForm = this.formBuilder.group({
      client: ["", [Validators.required]],
    });



    this.editProfileForm = this.formBuilder.group({


      birthDate: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      address: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      department: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      reportsTo: ["", [Validators.required]],

    })


    this.editPersonalForm = this.formBuilder.group({


      passportNo: ["", [Validators.required]],
      passportExpiryDate: ["", [Validators.required]],
      tel: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      religion: ["", [Validators.required]],
      maritalStatus: ["", [Validators.required]],
      employmentOfSpouse: ["", [Validators.required]],
      numberOfChildren: ["", [Validators.required]]



    })

    this.editBankForm = this.formBuilder.group({


      bankName: ["", [Validators.required]],
      bankAccountNo: ["", [Validators.required]],
      ifscCode: ["", [Validators.required]],
      panNo: ["", [Validators.required]],

    })


    this.editFamilyForm = this.formBuilder.group({
      items: this.formBuilder.array([


      ]),

    })

    // this.itemsArray = this.formBuilder.group({
    //   name: ["", [Validators.required]],
    //   relationship: ["", [Validators.required]],
    //   dateOfBirth: ["", [Validators.required]],
    //   phone: ["", [Validators.required]],
    // });




    this.editEmergencyForm = this.formBuilder.group({

      name1: ["", [Validators.required]],
      name2: ["", [Validators.required]],
      relationship1: ["", [Validators.required]],
      relationship2: ["", [Validators.required]],
      phone1: ["", [Validators.required]],
      phone2: ["", [Validators.required]],
      phone3: ["", [Validators.required]],
      phone4: ["", [Validators.required]],

    })

    this.editEducationForm = this.formBuilder.group({
      items1: this.formBuilder.array([]),

    })

    this.editExpForm = this.formBuilder.group({
      itemsExp: this.formBuilder.array([]),
    })

  }

  onSubmit() {
    this.toastr.success("Bank & statutory added", "Success");
  }

  getId(id) {
    this.http.get("http://localhost:8443/admin/allemployees/getEmployee" + "/" + id).subscribe((res) => {
      this.data = res;

      this.profileEmp = this.data.data

      this.profileinfo = this.profileEmp.ProfileInformation;
      this.personalinfo = this.profileEmp.personalInformation;
      this.emergencycontect = this.profileEmp.emergencyContact[0]
      this.bankinfo = this.profileEmp.bankInformation
      this.familyinfo = this.profileEmp.familyInformations
      this.educationinfo = this.profileEmp.educationInformations
      this.expinfo = this.profileEmp.experienceInformations

    });

  }
  ngOnDestroy(): void {
    sessionStorage.removeItem("empid");
    // this.dtTrigger.unsubscribe();
  }



  edit() {
    this.editProfileForm.patchValue({
      birthDate: this.profileinfo.birthDate,
      gender: this.profileinfo.gender,
      address: this.profileinfo.address,
      state: this.profileinfo.state,
      country: this.profileinfo.country,
      pinCode: this.profileinfo.pinCode,
      phone: this.profileinfo.phone,
      department: this.profileinfo.department,
      designation: this.profileinfo.designation,
      reportsTo: this.profileinfo.reportsTo,
    });


    this.editPersonalForm.patchValue({
      passportNo: this.personalinfo.passportNo,
      passportExpiryDate: this.personalinfo.passportExpiryDate,
      tel: this.personalinfo.tel,
      nationality: this.personalinfo.nationality,
      religion: this.personalinfo.religion,
      maritalStatus: this.personalinfo.maritalStatus,
      employmentOfSpouse: this.personalinfo.employmentOfSpouse,
      numberOfChildren: this.personalinfo.numberOfChildren,
    });


    this.editEmergencyForm.patchValue({
      name1: this.emergencycontect.name1,
      name2: this.emergencycontect.name2,
      relationship1: this.emergencycontect.relationship1,
      relationship2: this.emergencycontect.relationship2,
      phone1: this.emergencycontect.phone1,
      phone2: this.emergencycontect.phone2,
      phone3: this.emergencycontect.phone3,
      phone4: this.emergencycontect.phone4,
    });

    this.editBankForm.patchValue({
      bankName: this.bankinfo.bankName,
      bankAccountNo: this.bankinfo.bankAccountNo,
      ifscCode: this.bankinfo.ifscCode,
      panNo: this.bankinfo.panNo,
    });

  }
  editProfile() {
    if (this.editProfileForm.valid) {

      let obj = {
        birthDate: this.editProfileForm.value.birthDate,
        gender: this.editProfileForm.value.gender,
        address: this.editProfileForm.value.address,
        state: this.editProfileForm.value.state,
        country: this.editProfileForm.value.country,
        pinCode: this.editProfileForm.value.pinCode,
        phone: this.editProfileForm.value.phone,
        department: this.editProfileForm.value.department,
        designation: this.editProfileForm.value.designation,
        reportsTo: this.editProfileForm.value.reportsTo
      };


      this.http.patch("http://localhost:8443/employee/profile/profileInformation" + "/" + this.id, obj).subscribe((res) => {
        $("#profile_info").modal("hide");
        this.getId(this.id)
      })
    }
    else {

    }
  }

  editPersonalInfo() {
    if (this.editPersonalForm.valid) {

      let obj = {
        passportNo: this.editPersonalForm.value.passportNo,
        passportExpiryDate: this.editPersonalForm.value.passportExpiryDate,
        tel: this.editPersonalForm.value.tel,
        nationality: this.editPersonalForm.value.nationality,
        religion: this.editPersonalForm.value.religion,
        maritalStatus: this.editPersonalForm.value.maritalStatus,
        employmentOfSpouse: this.editPersonalForm.value.employmentOfSpouse,
        numberOfChildren: this.editPersonalForm.value.numberOfChildren,
      };


      this.http.patch("http://localhost:8443/employee/profile/personalInformations" + "/" + this.id, obj).subscribe((res) => {

        $("#personal_info_modal").modal("hide");
        this.getId(this.id)
      })
    }
    else {
    }
  }

  editFamilyInfo() {

    if (this.editFamilyForm.valid) {
      let obj = {
        name: this.editFamilyForm.value.name,
        relationship: this.editFamilyForm.value.relationship,
        dateOfBirth: this.editFamilyForm.value.dateOfBirth,
        phone: this.editFamilyForm.value.phone,
      };


      this.http.patch("http://localhost:8443/employee/profile/personalInformations" + "/" + this.id, obj).subscribe((res) => {
        $("#family_info_modal").modal("hide");
        this.getId(this.id)
      })
    }
    else {
    }
  }

  editEmergencyInfo() {

    if (this.editEmergencyForm.valid) {
      let obj = {
        name1: this.editEmergencyForm.value.name1,
        name2: this.editEmergencyForm.value.name2,
        relationship1: this.editEmergencyForm.value.relationship1,
        relationship2: this.editEmergencyForm.value.relationship2,
        phone1: this.editEmergencyForm.value.phone1,
        phone2: this.editEmergencyForm.value.phone2,
        phone3: this.editEmergencyForm.value.phone3,
        phone4: this.editEmergencyForm.value.phone4,
      };


      this.http.patch("http://localhost:8443/employee/profile/emergencyContact" + "/" + this.id, obj).subscribe((res) => {
        $("#emergency_contact_modal").modal("hide");
        this.getId(this.id)
      })
    }
    else {
    }
  }


  editEducationinfo() {

  }

  editExpInfo() {

  }


  editBankInfo() {
    if (this.editBankForm.valid) {
      let obj = {

        bankName: this.editBankForm.value.bankName,
        bankAccountNo: this.editBankForm.value.bankAccountNo,
        ifscCode: this.editBankForm.value.ifscCode,
        panNo: this.editBankForm.value.panNo,
      };


      this.http.patch("http://localhost:8443/employee/profile/bankDetails" + "/" + this.id, obj).subscribe((res) => {

        $("#bank_info_modal").modal("hide");
        this.getId(this.id)
      })
    }
    else {
    }
  }




  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  get itemsList(): FormArray {
    return this.editFamilyForm.get("items") as FormArray;
  }



  newItem(): FormGroup {
    return this.formBuilder.group({
      name: ["", Validators.required],
      relationship: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }

  addItems() {


    this.itemsList.push(this.newItem());
  }
  removeItems(i) {
    this.itemsList.removeAt(i);
  }


  ////////////////////////////////////////Education///////////////////////////////////////////////////////////////////////



  get itemsList1(): FormArray {
    return this.editEducationForm.get("items1") as FormArray;
  }


  addItemsEducation() {
    this.itemsList1.push(this.newItem1());

  }
  newItem1(): FormGroup {
    return this.formBuilder.group({
      institution: ["", [Validators.required]],
      subject: ["", [Validators.required]],
      startingDate: ["", [Validators.required]],
      completeDate: ["", [Validators.required]],
      degree: ["", [Validators.required]],
      grade: ["", [Validators.required]],
    });

  }

  removeItemsEducation(i) {
    this.itemsList1.removeAt(i);
  }

  ///////////////////////Experiance/////////////////////////////////////////////////////////////////////////////

  get itemsListExp(): FormArray {
    return this.editExpForm.get("itemsExp") as FormArray;
  }

  newItemExp(): FormGroup {
    return this.formBuilder.group({
      companyName: ["", [Validators.required]],
      location: ["", [Validators.required]],
      jobPosition: ["", [Validators.required]],
      periodFrom: ["", [Validators.required]],
      periodTo: ["", [Validators.required]],
    });
  }

  addItemsExp() {
    this.itemsListExp.push(this.newItemExp());

  }

  removeItemsExp(i) {
    this.itemsListExp.removeAt(i);
  }


}
