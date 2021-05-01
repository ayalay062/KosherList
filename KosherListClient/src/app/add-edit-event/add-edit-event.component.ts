import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '../classes/Store';
import { Worker } from '../classes/Worker';
import { WorkerScheduler } from '../classes/workerScheduler';
import { StoreService } from '../store.service';
import { WorkerSchedulerService } from '../WorkerScheduler.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {
  storesArrey: Store[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditEventComponent>, private WSSservice: WorkerSchedulerService, private fb: FormBuilder, private serviceStore: StoreService
  ) { }
  hourScedule = new WorkerScheduler();
  ngOnInit() {
    if (this.data && this.data.startDate) {
      //TODO get event data from Db - by start date: Day hour
    }
    this.serviceStore.getStores().subscribe(x => { this.storesArrey = x });

  }

  
  form = this.fb.group({
    codeStore: this.fb.control("", [Validators.required]),
    begginingTime: this.fb.control("", [Validators.required]),
    exitingTime: this.fb.control("", [Validators.required]),
    dateBegginig: this.fb.control("", [Validators.required]),
  });
  saveStore(data: number) {
    this.form.value.codeStore = data;

  }
  create() {
    var day = new Date(this.form.value.dateBegginig).getDay() + 1;
    var hourStart = this.form.value.begginingTime.substring(0, 2);
    var hourEnd = this.form.value.exitingTime.substring(0, 2);
    var codeStore = this.form.value.codeStore;
    var workerId: number = (<Worker>JSON.parse(localStorage.getItem("userCurrent"))).codeWorker;    
    this.WSSservice.setWorkerScheduler(workerId, codeStore, day, hourEnd, hourStart).subscribe(x => x);
  }
}