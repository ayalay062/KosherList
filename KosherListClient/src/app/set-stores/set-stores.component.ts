import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Store } from "../classes/Store";
import { StoreService } from "../store.service";
import { StoreComponent } from "../store/store.component";

@Component({
  selector: "app-set-stores",
  templateUrl: "./set-stores.component.html",
  styleUrls: ["./set-stores.component.css"],
})
export class SetStoresComponent implements OnInit {
  stores: Store[];
  constructor(public dialog: MatDialog, private storeService: StoreService) {}

  getStores() {
    this.storeService.getStores().subscribe((x) => {
      this.stores = x;
    });
  }
  ngOnInit() {

    this.getStores();
  }
  openDialog(codeStore?: number) {
    const dialogRef = this.dialog.open(StoreComponent, {
      data: { codeStore },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.getStores();
    });
  }
}
