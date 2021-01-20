import { Time } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Update } from "../classes/Update";
import { Users } from "../classes/Users";
import { UpdatesService } from "../updates.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-updates",
  templateUrl: "./updates.component.html",
  styleUrls: ["./updates.component.css"],
})
export class UpdatesComponent implements OnInit {
  form = this.fb.group({
    codeStore: this.fb.control("", [Validators.required]),
    begginingTime: this.fb.control("", [Validators.required]),
    exitingTime: this.fb.control("", [Validators.required]),
    remarks: this.fb.control("excelent", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private serviceU: UpdatesService,
    private serviceUser: UserService
  ) {}
  dateEntry: Date;
  dateExit: Date;
  testResult: string;
  choiceTest: string[] = ["excelent", "improvement Required", "bad"];
  user: Users[];
  userCurrent: Users = new Users();
  update: Update;
  ngOnInit() {
    this.userCurrent = <Users>JSON.parse(localStorage.getItem("userCurrent"));

    // this.serviceUser.getUsers().subscribe(u=>{this.user=u;});
    // this.serviceUser.getUsers().subscribe(x=>{
    //   this.user=x;
    //  });
  }
  btnEntry() {
    this.dateEntry = new Date();
    this.form.patchValue({
      begginingTime: new Date().toISOString().substring(0, 16),
    });

    // this.form.value.dateEntry = new Date().toISOString();
  }
  btnExit() {
    this.form.patchValue({
      exitingTime: new Date().toISOString().substring(0, 16),
    });
  }
  create() {
    const update = <Update>this.form.value;
    update.codeWorker = this.userCurrent.userId;
    if (this.update && this.update.updatesId !== 0) {
      update.updatesId = this.update.updatesId;
      this.serviceU.updateUpdates(update).subscribe((x) => {});
    } else {
      this.serviceU.createUpdate(update).subscribe((x) => {});
    }
  }
  getUpdateById(id: number) {
    this.serviceU.getUpdateById(id).subscribe((x) => {
      this.update = x;
      this.form = this.fb.group(x);
      // this.form.patchValue({
      //   begginingTime: x.begginingTime.toISOString().substring(0, 16),
      //   exitingTime: x.exitingTime.toISOString().substring(0, 16),
      // });
    });
  }
}
