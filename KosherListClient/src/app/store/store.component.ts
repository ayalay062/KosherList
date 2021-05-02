import { Component, Inject, OnChanges, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  MatDialogRef,
  MatRadioChange,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Store } from "../classes/Store";
import { StoreService } from "../store.service";

@Component({
  selector: "app-store",
  templateUrl: "./store.component.html",
  styleUrls: ["./store.component.css"],
})
export class StoreComponent implements OnInit {

  typeStoreNumber = [1, 2];

  form = this.fb.group({
    nameStore: this.fb.control("", [Validators.required]),
    addressStore: this.fb.control("", [Validators.required]),
    clasificationStore: this.fb.control("", [Validators.required]),
    activityTimeStart: this.fb.control("", [Validators.required]),
    activityTimeEnd: this.fb.control("", [Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private service: StoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StoreComponent>
  ) {}
  ngOnInit() {
    if (this.data && this.data.codeStore) {
      this.service.getStoreByCode(this.data.codeStore).subscribe((response) => {
        this.form = this.fb.group(response);
      });
    }
  }

  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }

  save() {
    const store = <Store>this.form.value;
    if (!store.codeStore || store.codeStore === 0) {
      this.service.createStore(store).subscribe((x) => {
        this.close();
      });
    } else {
      this.service.UpdateStore(store).subscribe((x) => {
        this.close();
      });
    }
  }
}
