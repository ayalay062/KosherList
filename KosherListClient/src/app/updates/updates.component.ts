import { Time } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material";
import { Store } from "../classes/Store";
import { TimeSpan } from "../classes/TimeSpan";
import { Update } from "../classes/Update";
import { Users } from "../classes/Users";
import { Worker } from "../classes/Worker";
import { StoreService } from "../store.service";
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
    remarks: this.fb.control("", [Validators.required]),
    result: this.fb.control("1", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private serviceUpdate: UpdatesService,
    private serviceUser: UserService,
    private serviceStore: StoreService
  ) {}
  storesArrey: Store[];
  choiceTest: string[] = ["מצוין", "טעון בדיקה", "גרוע"];
  user: Users[];
  userCurrent: Worker = new Worker();
  update: Update;
  workHours: Time[];
  tableWorkHours: Update[] = new Array<Update>();
  displayedColumns: string[] = [
    "dateTime",
    "codeStore",
    "begginingTime",
    "exitingTime",
    "result",
    "updates",
  ];
  getUpdates() {
    this.serviceUpdate
      .getAllWorkerUpdates(this.userCurrent.codeWorker)
      .subscribe((x) => (this.tableWorkHours = x));
  }

  ngOnInit() {
    this.userCurrent = <Worker>JSON.parse(localStorage.getItem("userCurrent"));
    this.serviceStore.getStores().subscribe((x) => {
      this.storesArrey = x;
    });
    this.getUpdates();

    // this.workHours=this.U.begg
    // this.serviceUser.getUsers().subscribe(u=>{this.user=u;});
    // this.serviceUser.getUsers().subscribe(x=>{
    //   this.user=x;
    //  });
  }
  btnEntry() {
    this.form.patchValue({
      begginingTime: new Date().toISOString().substring(0, 16),
    });

    // this.form.value.dateEntry = new Date().toISOString();
  }
  saveStore(data: number) {
    this.form.value.codeStore = data;
  }
  UpdateTime() {}
  btnExit() {
    this.form.patchValue({
      exitingTime: new Date().toISOString().substring(0, 16),
    });
  }
  create() {
    const update = <Update>this.form.value;
    update.dateVisit = new Date(this.form.value.begginingTime);
    var time = new Date(this.form.value.begginingTime);
    update.begginingTime =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

    time = new Date(this.form.value.exitingTime);
    update.exitingTime =
      time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    update.codeWorker = this.userCurrent.codeWorker;
    if (this.update && this.update.updatesId && this.update.updatesId !== 0) {
      update.updatesId = this.update.updatesId;
      this.serviceUpdate.updateUpdates(update).subscribe((x) => {
        this.getUpdates();
        this.form = this.fb.group({
          codeStore: this.fb.control("", [Validators.required]),
          begginingTime: this.fb.control("", [Validators.required]),
          exitingTime: this.fb.control("", [Validators.required]),
          remarks: this.fb.control("", [Validators.required]),
          result: this.fb.control("1", [Validators.required]),
        });
      }); //איך עושים שיעשה רק עדכון
    } else {
      this.serviceUpdate.createUpdate(update).subscribe((x) => {
        this.getUpdates();
        this.form = this.fb.group({
          codeStore: this.fb.control("", [Validators.required]),
          begginingTime: this.fb.control("", [Validators.required]),
          exitingTime: this.fb.control("", [Validators.required]),
          remarks: this.fb.control("", [Validators.required]),
          result: this.fb.control("1", [Validators.required]),
        });
      });
    }
  }
  d: Date = new Date();
  getUpdateById(id: number) {
    console.log(id);
    this.serviceUpdate.getUpdateById(id).subscribe((x) => {
      console.log(x);
      this.update = x;
      this.form = this.fb.group(x);
      var date = new Date(x.dateVisit);
      var time = x.begginingTime.split(":");
      date.setHours(+time[0]);
      date.setMinutes(+time[1]);
      date.setSeconds(+time[2]);
      var offset = date.getTimezoneOffset() * 60 * 1000;
      date.setTime(date.getTime() - offset);

      var date2 = new Date(x.dateVisit);
      var time2 = x.exitingTime.split(":");
      date2.setHours(+time2[0]);
      date2.setMinutes(+time2[1]);
      date2.setSeconds(+time2[2]);
      date2.setTime(date2.getTime() - offset);

      this.form.patchValue({
        begginingTime: date.toISOString().substring(0, 16),
        exitingTime: date2.toISOString().substring(0, 16),
      });
    });
  }
}
