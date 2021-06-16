import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MatRadioChange,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Worker } from "../classes/Worker";
import { GetServerService } from "../get-server.service";
import { WorkerService } from "../worker.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  workers: Worker[];
  form = this.fb.group({
    nameWorker: this.fb.control("", [Validators.required]),
    addressWorker: this.fb.control("", [Validators.required]),
    telWorker: this.fb.control("", [Validators.required]),
    dateStart: this.fb.control("", [Validators.required]),
    email: this.fb.control("", [Validators.required]),
    mobility: this.fb.control("", [Validators.required]),
    passwordWorker: this.fb.control("", [Validators.required]),
  });
  flagMail: boolean = false;
  constructor(
    private service: WorkerService,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  ngOnInit() {
    if (this.data && this.data.codeWorker) {
      this.service
        .getWorkerByCode(this.data.codeWorker)
        .subscribe((response) => {
          this.form = this.fb.group(response);
          this.form.patchValue({
            mobility: '' + response.mobility,
            dateStart: '' + new Date(response.dateStart).toISOString().substring(0,10),
          });
        });
    }
  }
  hide: boolean = true;
  flag: any = false;
  flagUser: boolean;

  saveValueRadio(event: MatRadioChange, data) {
    this.form.value.mobility = data;
  }
  save() {
    const store = <Worker>this.form.value;
    if (!store.codeWorker || store.codeWorker === 0) {
      this.service.createWorker(store).subscribe((x) => {
        this.close();
      });
    } else {
      this.service.updateWorker(store).subscribe((x) => {
        this.close();
      });
    }
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }

}
