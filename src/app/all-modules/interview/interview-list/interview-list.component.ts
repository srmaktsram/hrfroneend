import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
declare const $: any;
@Component({
  selector: "app-interview-list",
  templateUrl: "./interview-list.component.html",
  styleUrls: ["./interview-list.component.css"],
})
export class InterviewListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public url: any = "interview";
  public tempId: any;
  public editId: any;
  public addInterviewForm: FormGroup;
  public editInterviewForm: FormGroup;
  public adminId = sessionStorage.getItem("adminId");

  public lstInterview;
  public lstcategory;
  public editedvalue;
  public rows = [];
  public srch = [];
  lstDepartment: Object;
  dataarr: Object;
  public depData = [];
  public catData: Object;
  addCategoryForm: FormGroup;
  editCategoryForm: FormGroup;
  user_type: string;
  jobswriteHr: string;
  constructor(
    private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.user_type = sessionStorage.getItem("user_type");
    this.jobswriteHr = sessionStorage.getItem("jobswriteHr");
    this.LoadDepartment();
    this.LoadCategory();
  }
  LoadDepartment() {
    this.http
      .get("http://localhost:8443/admin/department/getData")
      .subscribe((data: any) => {
        this.depData = data;
      });
  }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.LoadInterview();

    this.addInterviewForm = this.formBuilder.group({
      AddCat: ["", [Validators.required]],
      AddQuestion: ["", [Validators.required]],
      OptionA: ["", [Validators.required]],
      OptionB: ["", [Validators.required]],
      OptionC: ["", [Validators.required]],
      OptionD: ["", [Validators.required]],
      Correctanswer: ["", [Validators.required]],
      addDepart: ["", [Validators.required]],
      addCode: ["", [Validators.required]],
      addAnswerExplanation: ["", [Validators.required]],
      addVideoLink: ["", [Validators.required]],
      addImageToQuestion: ["", Validators.required],
    });
    this.editInterviewForm = this.formBuilder.group({
      AddQuestion: ["", [Validators.required]],
      OptionA: ["", [Validators.required]],
      OptionB: ["", [Validators.required]],
      OptionC: ["", [Validators.required]],
      OptionD: ["", [Validators.required]],
      Correctanswer: ["", [Validators.required]],
      editCat: ["", [Validators.required]],
      editDep: ["", [Validators.required]],
      editCode: ["", [Validators.required]],
      editAnswerExplanation: ["", [Validators.required]],
      editVideoLink: ["", [Validators.required]],
      editImageToQuestion: ["", Validators.required],
    });
    //////////////////////////add category form
    this.addCategoryForm = this.formBuilder.group({
      AddCat: ["", [Validators.required]],
    });
    ////// edit category form
    this.editCategoryForm = this.formBuilder.group({
      editAddCat: ["", [Validators.required]],
    });
  }

  // Get department list  Api Call
  LoadInterview() {
    this.http
      .get(
        "http://localhost:8443/admin/interviewQuestions/getInterviewQuestions" +
        "/" +
        this.adminId
      )
      .subscribe((data) => {
        this.lstInterview = data;
        this.rows = this.lstInterview;
        this.srch = [...this.rows];
        console.log(this.lstInterview, "jkhjgjhg''''''''''''''''''")
      });
  }

  // Add questions  Modal Api Call
  addInterview() {
    if (this.addInterviewForm.valid) {
      let obj = {
        category: this.addInterviewForm.value.AddCat,
        questions: this.addInterviewForm.value.AddQuestion,
        option1: this.addInterviewForm.value.OptionA,
        option2: this.addInterviewForm.value.OptionB,
        option3: this.addInterviewForm.value.OptionC,
        option4: this.addInterviewForm.value.OptionD,
        correctanswer: this.addInterviewForm.value.Correctanswer,
        department: this.addInterviewForm.value.addDepart,
        codeSnippets: this.addInterviewForm.value.addCode,
        answerExplanation: this.addInterviewForm.value.addAnswerExplanation,
        videoLink: this.addInterviewForm.value.addVideoLink,
        addImageToQuestion: this.addInterviewForm.value.addImageToQuestion,
        adminId: this.adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/interviewQuestions/createInterviewQuestions",
          obj
        )
        .subscribe((data) => {
          this.LoadInterview();

          // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          //   dtInstance.destroy();
          // });
        });
      $("#add_question").modal("hide");
      this.addInterviewForm.reset();
      this.toastr.success("Questions added sucessfully...!", "Success");
    }
  }

  editInterview() {
    if (this.editInterviewForm.valid) {
      let id = this.editId;
      let obj = {
        questions: this.editInterviewForm.value.AddQuestion,
        option1: this.editInterviewForm.value.OptionA,
        option2: this.editInterviewForm.value.OptionB,
        option3: this.editInterviewForm.value.OptionC,
        option4: this.editInterviewForm.value.OptionD,
        correctanswer: this.editInterviewForm.value.Correctanswer,
        category: this.editInterviewForm.value.editCat,
        department: this.editInterviewForm.value.editDep,
        codeSnippets: this.editInterviewForm.value.editCode,
        answerExplanation: this.editInterviewForm.value.editAnswerExplanation,
        videoLink: this.editInterviewForm.value.editVideoLink,
        addImageToQuestion: this.editInterviewForm.value.editImageToQuestion,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/interviewQuestions/updateInterviewQuestions" +
          "/" +
          id,
          obj
        )
        .subscribe((data1) => {
          this.LoadInterview();
        });
      $("#edit_question").modal("hide");
      this.toastr.success("Edit questions Updated sucessfully...!", "Success");
    }
  }
  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
    this.editedvalue = value.questions;
    this.editId = value.id;
    const index = this.lstInterview.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstInterview[index];
    this.editInterviewForm.patchValue({
      AddQuestion: toSetValues.questions,
      OptionA: toSetValues.option1,
      OptionB: toSetValues.option2,
      OptionC: toSetValues.option3,
      OptionD: toSetValues.option4,
      Correctanswer: toSetValues.correctanswer,
      editCat: toSetValues.category,
      editDep: toSetValues.department,
      editCode: toSetValues.codeSnippets,
      editAnswerExplanation: toSetValues.answerExplanation,
      editVideoLink: toSetValues.answerExplanation,
      editImageToQuestion: toSetValues.addImageToQuestion,
    });
  }

  //Delete Interview Questions//
  deleteInterview() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/interviewQuestions/deleteInterviewQuestions" +
        "/" +
        id,
        obj
      )
      .subscribe((data) => {
        this.LoadInterview();
        $("#delete_question").modal("hide");
        this.toastr.success("Question is deleted", "Success");
      });
  }
  LoadCategory() {
    this.http
      .get(
        "http://localhost:8443/admin/interviewQuestionCategory/getInterviewQuestionCategory" +
        "/" +
        this.adminId
      )
      .subscribe((data) => {
        this.catData = data;
        this.lstcategory = data;
      });
  }

  //////
  addcategory() {
    if (this.addCategoryForm.valid) {
      let obj = {
        category: this.addCategoryForm.value.AddCat,
        adminId: this.adminId,
      };
      this.http
        .post(
          "http://localhost:8443/admin/interviewQuestionCategory/createInterviewQuestionCategory",
          obj
        )
        .subscribe((data: any) => {
          this.LoadCategory();
        });
      $("#add_category").modal("hide");
      this.addCategoryForm.reset();
      this.toastr.success("Category added sucessfully...!", "Success");
    }
  }
  editCategory() {
    if (this.editCategoryForm.valid) {
      let id = this.editId;
      let obj = {
        category: this.editCategoryForm.value.editAddCat,
      };
      this.http
        .patch(
          "http://localhost:8443/admin/interviewQuestionCategory/updateInterviewQuestionCategory" +
          "/" +
          id,
          obj
        )
        .subscribe((data1) => {
          this.LoadCategory();
        });
      $("#edit_category").modal("hide");
      this.toastr.success("Edit Category Updated sucessfully...!", "Success");
    }
  }
  editCat(value) {
    this.editedvalue = value.category;
    this.editId = value.id;
    const index = this.lstcategory.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstcategory[index];
    this.editCategoryForm.patchValue({
      editAddCat: toSetValues.category,
    });
  }
  ////Delete Category
  deleteCategory() {
    let id = this.tempId;
    let obj = {
      status: 2,
    };
    this.http
      .patch(
        "http://localhost:8443/admin/interviewQuestionCategory/deleteInterviewQuestionCategory" +
        "/" +
        id,
        obj
      )
      .subscribe((data) => {
        this.LoadCategory();
        $("#delete_category").modal("hide");
        this.toastr.success("Category is deleted", "Success");
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
