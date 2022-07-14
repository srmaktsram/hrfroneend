import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";


declare const $: any;
@Component({
  selector: "app-employee-profile",
  templateUrl: "./employee-profile.component.html",

  styleUrls: ["./employee-profile.component.css"],
})
export class EmployeeProfileComponent implements OnInit {
  myControl = new FormControl("");
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  public addEmployeeForm: FormGroup;
  public editProfileForm: FormGroup;
  public editPersonalForm: FormGroup;
  public editFamilyForm: FormGroup;
  public editEmergencyForm: FormGroup;
  public editEducationForm: FormGroup;
  editBankForm: FormGroup;
  public editExpForm: FormGroup;
  public editbankStatutory: FormGroup;
  id: string;
  data: any;

  public profileEmp: any
  public adminId: any;
  public name: any;
  designation: any;
  public show = true;
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
  public employeeProjects = [];
  public projectLeader = [];
  public projectTeam = [];

  public projects = []
  itemsArray: FormGroup;
  eduhidden = true;
  exphidden = true;
  getEmployeeForm: any;
  departments: any;
  designations: any;
  profileImg: any;
  profileImagePath: string;
  profileImage: any;
  lstEmployee: any;
  public reportsTo: any;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.id = sessionStorage.getItem("empid")
    this.adminId = sessionStorage.getItem("adminId")
    // console.log(this.id, "pkkkkkkkk")
    this.getId(this.id);
    // console.log(this.id, "hpppppppppppp")
    this.getProjects();
    this.getDepartments();

    this.getDesignation();
  }
  public getDepartments() {
    this.http

      .get("http://localhost:8443/admin/department/getAdminData" + "/" + this.adminId)
      .subscribe((data) => {
        this.departments = data;
      });
  }
  public getDesignation() {
    this.http

      .get("http://localhost:8443/admin/designation/getData" +
        "/" +
        this.adminId)
      .subscribe((data) => {
        this.designations = data;
      });
  }

  ngOnInit() {


    this.loadEmployee()

    this.addEmployeeForm = this.formBuilder.group({
      salaryBasis: ["", [Validators.required]],
      salaryAmount: ["", [Validators.required]],
      paymentType: ["", [Validators.required]],
      pfContribution: ["", [Validators.required]],
      pfNo: ["", [Validators.required]],
      employeePfRate: ["", [Validators.required]],
      additionalRate: ["", [Validators.required]],
      totalRate: ["", [Validators.required]],
      pfEmployeePfRate: ["", [Validators.required]],
      pfAdditionRate: ["", [Validators.required]],
      pfTotalRate: ["", [Validators.required]],
      esiContribution: ["", [Validators.required]],
      esiNo: ["", [Validators.required]],
      employeeEsiRate: ["", [Validators.required]],
      esiAdditionalRate: ["", [Validators.required]],
      esiTotalRate: ["", [Validators.required]],
    });

    this.editProfileForm = this.formBuilder.group({
      birthDate: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      address: ["", [Validators.required]],
      state: ["", [Validators.required]],
      country: ["", [Validators.required]],
      pinCode: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      department: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      myControl: [""],
      reportsTo: [""],
    });

    this.editPersonalForm = this.formBuilder.group({
      passportNo: ["", [Validators.required]],
      passportExpiryDate: ["", [Validators.required]],
      tel: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      religion: ["", [Validators.required]],
      maritalStatus: ["", [Validators.required]],
      employmentOfSpouse: ["", [Validators.required]],
      numberOfChildren: ["", [Validators.required]],
    });

    this.editBankForm = this.formBuilder.group({
      bankName: ["", [Validators.required]],
      bankAccountNo: ["", [Validators.required]],
      ifscCode: ["", [Validators.required]],
      panNo: ["", [Validators.required]],


    })

    this.editEmergencyForm = this.formBuilder.group({
      name1: ["", [Validators.required]],
      name2: ["", [Validators.required]],
      relationship1: ["", [Validators.required]],
      relationship2: ["", [Validators.required]],
      phone1: ["", [Validators.required]],
      phone2: ["", [Validators.required]],
      phone3: ["", [Validators.required]],
      phone4: ["", [Validators.required]],
    });

    this.editFamilyForm = this.formBuilder.group({
      items: this.formBuilder.array([
        this.formBuilder.group({
          name: ["", [Validators.required]],
          relationship: ["", [Validators.required]],
          dateOfBirth: ["", [Validators.required]],
          phone: ["", [Validators.required]],
        }),
      ]),
    });

    this.editEducationForm = this.formBuilder.group({
      items1: this.formBuilder.array([
        this.formBuilder.group({
          institution: ["", [Validators.required]],
          subject: ["", [Validators.required]],
          startingDate: ["", [Validators.required]],
          completeDate: ["", [Validators.required]],
          degree: ["", [Validators.required]],
          grade: ["", [Validators.required]],

        })
      ]),
    });

    this.editExpForm = this.formBuilder.group({
      itemsExp: this.formBuilder.array([
        this.formBuilder.group({
          companyName: ["", [Validators.required]],
          location: ["", [Validators.required]],
          jobPosition: ["", [Validators.required]],
          periodFrom: ["", [Validators.required]],
          periodTo: ["", [Validators.required]],


        })
      ]),
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  selectProfilePhoto(event: any) {
    if (event.target.files.length > 0) {
      this.profileImg = event.target.files[0];

      if (
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpg"
      ) {
        this.updateProfilePhoto();
      }
      // {
      //   this.errorPanExtension = true;
      //   if (event.target.files[0].size < 200 * 1024) {
      //     this.errPanSize = true;
      //     this.updatePan();
      //   } else {
      //     this.errPanSize = false;
      //   }
      // } else {
      //   this.errPanSize = true;

      //   this.errorPanExtension = false;
      // }
    }
  }

  updateProfilePhoto() {
    var fd = new FormData();

    fd.append("file", this.profileImg);
    let params = new HttpParams();
    params = params.set("id", this.id);
    this.http
      .patch("http://localhost:8443/employee/employeeProfile/updateProfilePhoto?" + params, fd)
      .subscribe((res: any) => {
        console.log(res, "kkkkk")
        this.getId(this.id)

      });
  }

  onSubmit() {

    // console.log("this is the bank&Statutory>>>>>>>>>>>",this.addEmployeeForm)
    var obj = {
      salaryBasis: this.addEmployeeForm.value.salaryBasis,
      salaryAmount: this.addEmployeeForm.value.salaryAmount,
      paymentType: this.addEmployeeForm.value.paymentType,
      pfContribution: this.addEmployeeForm.value.pfContribution,
      pfNo: this.addEmployeeForm.value.pfNo,
      employeePfRate: this.addEmployeeForm.value.employeePfRate,
      additionalRate: this.addEmployeeForm.value.additionalRate,
      totalRate: this.addEmployeeForm.value.totalRate,

      esiContribution: this.addEmployeeForm.value.esiContribution,
      esiNo: this.addEmployeeForm.value.esiNo,
      employeeEsiRate: this.addEmployeeForm.value.employeeEsiRate,
      esiAdditionalRate: this.addEmployeeForm.value.esiAdditionalRate,
      esiTotalRate: this.addEmployeeForm.value.esiTotalRate,

    }
    console.log("this is the obj.....>>>", obj)

    this.http.patch("http://localhost:8443/employee/profile/addBankStatutory" + "/" + this.id, obj).subscribe((res: any) => {
      // console.log("this is the salary.....>>>",res)
    })

    this.toastr.success("Bank & statutory added", "Success");
  }

  getId(id) {
    this.http
      .get("http://localhost:8443/admin/allemployees/getEmployee" + "/" + id)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data, "hhhhhhhhhhhhhhhhhttttttttt")
        this.profileImage = res.data.profileImage
        console.log("kkk", this.profileImage);

        this.profileImagePath = `http://localhost:8443/${this.profileImage}`;

        this.profileEmp = this.data.data;

        console.log(this.profileEmp, "////////////////////>>>>>>>>>>>>>>>")
        this.profileinfo = this.profileEmp.ProfileInformation;
        this.personalinfo = this.profileEmp.personalInformation;
        this.emergencycontect = this.profileEmp.emergencyContact[0];
        this.bankinfo = this.profileEmp.bankInformation;
        this.familyinfo = this.profileEmp.familyInformations;
        this.educationinfo = this.profileEmp.educationInformations;
        this.expinfo = this.profileEmp.experienceInformations;
        this.getEmployeeForm = this.data.data.BasicSalaryInformation;
        this.edit();
      });

  }
  ngOnDestroy(): void {
    sessionStorage.removeItem("empid");
    // this.dtTrigger.unsubscribe();
  }

  edit() {
    this.addEmployeeForm.patchValue({


      salaryBasis: this.getEmployeeForm.salaryBasis,
      salaryAmount: this.getEmployeeForm.salaryAmount,
      paymentType: this.getEmployeeForm.paymentType,
      pfContribution: this.getEmployeeForm.pfContribution,
      pfNo: this.getEmployeeForm.pfNo,
      employeePfRate: this.getEmployeeForm.employeePfRate,
      additionalRate: this.getEmployeeForm.additionalRate,
      totalRate: this.getEmployeeForm.totalRate,
      esiContribution: this.getEmployeeForm.esiContribution,
      esiNo: this.getEmployeeForm.esiNo,
      employeeEsiRate: this.getEmployeeForm.employeeEsiRate,
      esiAdditionalRate: this.getEmployeeForm.esiAdditionalRate,
      esiTotalRate: this.getEmployeeForm.esiTotalRate,


    })



    //   this.editFamilyForm.patchValue({

    //   })


    //   this.editEducationForm.patchValue({


    //   this.editFamilyForm.patchValue({

    //   })


    // this.editExpForm.patchValue({
    //   companyName:this.expinfo.companyName,
    //         location:this.expinfo.location,
    //         jobPosition:this.expinfo.jobPosition,
    //         periodFrom:this.expinfo.periodFrom,
    //         periodTo:this.expinfo.periodTo,
    // })

    //   })

    // this.editExpForm.patchValue({
    //   companyName:this.expinfo.companyName,
    //         location:this.expinfo.location,
    //         jobPosition:this.expinfo.jobPosition,
    //         periodFrom:this.expinfo.periodFrom,
    //         periodTo:this.expinfo.periodTo,
    // })

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
        reportsTo: this.reportsTo
      };

      this.http
        .patch(
          "http://localhost:8443/employee/profile/profileInformation" +
          "/" +
          this.id,
          obj
        )
        .subscribe((res) => {
          console.log("resProfile>>>>>>>>>>>>>>>>>>>>>>.", res)
          $("#profile_info").modal("hide");
          this.getId(this.id);
        });

    } else {
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

      this.http
        .patch(
          "http://localhost:8443/employee/profile/personalInformations" +
          "/" +
          this.id,
          obj
        )
        .subscribe((res) => {
          $("#personal_info_modal").modal("hide");
          this.getId(this.id);
        });
    } else {
    }
  }

  /////////////////////////////////////       Family INformation      /////////////////////////////////////////////////////////////////////
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

  editFamilyInfo() {
    let dataArray = this.editFamilyForm.value.items;

    console.log("this is the OBJ Edit FamilyInfo.>>>>>>>>>", dataArray);

    this.http
      .patch(
        "http://localhost:8443/employee/profile/addFamilyInformations" +
        "/" +
        this.id,
        dataArray
      )
      .subscribe((res: any) => {
        // console.log("thi is the RESPONCE>>>>>>>",res)
        $("#family_info_modal").modal("hide");
        this.getId(this.id);
      });

  }
  ////////////////////////////////////////////////////////////////////////////////
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

      this.http
        .patch(
          "http://localhost:8443/employee/profile/emergencyContact" +
          "/" +
          this.id,
          obj
        )
        .subscribe((res: any) => {
          $("#emergency_contact_modal").modal("hide");
          this.getId(this.id);
        });
    } else {

    }
  }

  ///////////get projects /////////////////////////////////////////////
  getProjects() {
    this.http
      .get(
        "http://localhost:8443/admin/projects/getAdminproject" +
        "/" +
        this.adminId
      )
      .subscribe((res: any) => {
        this.employeeProjects = res;
        this.employeeProjects.map((item) => {
          item.projectLeader.map((data1) => {
            if (data1.id === this.id) {
              this.projects.push(item);
            }
          });
          item.teamMember.map((data2) => {
            if (data2.id === this.id) {
              this.projects.push(item);
            }
          });
        });
      });
  }

  editBankInfo() {
    if (this.editBankForm.valid) {
      let obj = {
        bankName: this.editBankForm.value.bankName,
        bankAccountNo: this.editBankForm.value.bankAccountNo,
        ifscCode: this.editBankForm.value.ifscCode,
        panNo: this.editBankForm.value.panNo,
      };

      this.http
        .patch(
          "http://localhost:8443/employee/profile/bankDetails" + "/" + this.id,
          obj
        )
        .subscribe((res: any) => {
          $("#bank_info_modal").modal("hide");
          this.getId(this.id);
        });
    } else {
    }
  }


  ///////////////////validation ///////////////////////////

  checkfamily(val1, val2, val3, val4) {
    //console.log("thi is the validation checking>>>>>>>>>>",val1.length,"><><><",val2.length,".,.,..",val3.length,val4.length)
    if (
      val1.length > 0 &&
      val2.length > 0 &&
      val3.length > 0 &&
      val4.length === 10
    ) {
      this.show = false;
    }
  }
  ////////////////////////education ?////////////////////////////////////
  eduShow(val1, val2, val3, val4, val5, val6) {
    if (
      val1.length > 0 &&
      val2.length > 0 &&
      val3.length > 0 &&
      val4.length > 0 &&
      val5.length > 0 &&
      val6.length > 0
    ) {
      this.eduhidden = false;
    }
  }

  expShow(val1, val2, val3, val4, val5) {
    if (
      val1.length > 0 &&
      val2.length > 0 &&
      val3.length > 0 &&
      val4.length > 0 &&
      val5.length > 0
    ) {
      this.exphidden = false;
    }
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

  editEducationinfo() {
    let dataArray = this.editEducationForm.value.items1;

    console.log("this is the OBJ Edit editEducationinfo.>>>>>>>>>", dataArray);

    this.http
      .patch(
        "http://localhost:8443/employee/profile/addEducationInformations" +
        "/" +
        this.id,
        dataArray
      )
      .subscribe((res: any) => {
        // console.log("thi is the RESPONCE>>>>>>>",res)
        $("#education_info").modal("hide");
        this.getId(this.id);
      });

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
  editExpInfo() {
    let dataArray = this.editExpForm.value.itemsExp;

    // console.log("this is the OBJ Edit FamilyInfo.>>>>>>>>>",this.editExpForm.value.itemsExp)

    this.http
      .patch(
        "http://localhost:8443/employee/profile/addExperienceInformations" +
        "/" +
        this.id,
        dataArray
      )
      .subscribe((res: any) => {
        // console.log("thi is the RESPONCE>>>>>>>",res)
        $("#experience_info").modal("hide");
        this.getId(this.id);
      });
  }

  /////////////////////////////////get all employee data/////////////////////////////////

  loadEmployee() {

    this.http
      .get(
        "http://localhost:8443/admin/allemployees/getallEmployee" +
        "/" +
        this.adminId
      )
      .subscribe((data: any) => {
        this.lstEmployee = data;
        console.log(this.lstEmployee, "Employee Data")
      })
  }

  getFirstName(item) {
    this.reportsTo = item
  }
}
