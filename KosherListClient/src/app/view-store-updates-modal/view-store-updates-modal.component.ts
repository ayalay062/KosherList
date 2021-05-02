import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Update } from "../classes/Update";
import { StoreService } from "../store.service";
import { UpdatesService } from "../updates.service";

@Component({
  selector: "app-view-store-updates-modal",
  templateUrl: "./view-store-updates-modal.component.html",
  styleUrls: ["./view-store-updates-modal.component.css"],
})
export class ViewStoreUpdatesModalComponent implements OnInit {
  updates: Update[];
  constructor(
    private service: UpdatesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewStoreUpdatesModalComponent>
  ) {}

  ngOnInit() {
    if (this.data && this.data.codeStore) {
      if (this.data.numResult == 3) {
        this.service
          .GetBadUpdatesOfStore(this.data.codeStore)
          .subscribe((response) => {
            this.updates = response;
          });
      } else {
        this.service
          .GetWarningUpdatesOfStore(this.data.codeStore)
          .subscribe((response) => {
            this.updates = response;
          });
      }
    }
  }
  close() {
    if (this.dialogRef && this.dialogRef.close) {
      this.dialogRef.close({ data: "Order" });
    }
  }
}
