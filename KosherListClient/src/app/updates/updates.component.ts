import { Time } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material";
import { Store } from "../classes/Store";
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
    result: this.fb.control("excelent", [Validators.required]),
   
  });
  
   

  constructor(
    private fb: FormBuilder,
    private serviceUpdate: UpdatesService,
    private serviceUser: UserService,
    private serviceStore:StoreService
      ) {}
  storesArrey:Store[];
  choiceTest: string[] = ["excelent", "improvement Required", "bad"];
  user: Users[];
  userCurrent: Worker = new Worker();
  update: Update;
  workHours:Time[];
  tableWorkHours:Update[]=new Array<Update>();
  displayedColumns :string[] = [ 'dateTime' , 'codeStore' , 'begginingTime' , 'exitingTime','updates' ];

  ngOnInit() {
    this.userCurrent = <Worker>JSON.parse(localStorage.getItem("userCurrent"));
    this.serviceStore.getStores().subscribe(x=>{this.storesArrey=x});
    this.serviceUpdate.getUpdate().subscribe(x=>this.tableWorkHours=x);

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
  saveStore( data:number)
  {
this.form.value.codeStore=data;
  }
  UpdateTime()
  {};
  btnExit() {
    this.form.patchValue({
      exitingTime: new Date().toISOString().substring(0, 16),
    });
  }
  create() {
    const update = <Update>this.form.value;
    update.codeWorker = this.userCurrent.codeWorker;
    if (this.update && this.update.updatesId !== 0) {
      update.updatesId = this.update.updatesId;
       this.serviceUpdate.updateUpdates(update).subscribe((x) => {});//איך עושים שיעשה רק עדכון
    } else {
      this.serviceUpdate.createUpdate(update).subscribe((x) => {});
    }
  }
  d:Date=new Date();
  getUpdateById(id: number) {
console.log(id);
    this.serviceUpdate.getUpdateById(id).subscribe((x) => {
      console.log(x);
      this.update = x;
      this.form = this.fb.group(x);
      // this.form.patchValue({
        
      //   d=x.begginingTime;
      //   begginingTime: x.begginingTime.toISOString().substring(0, 16),
      //   exitingTime: x.exitingTime.toISOString().substring(0, 16),
      // });
    });
  }
}