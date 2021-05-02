import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '../classes/Store';
import { StoreService } from '../store.service';
import { StoreComponent } from '../store/store.component';
import { ViewStoreUpdatesModalComponent } from '../view-store-updates-modal/view-store-updates-modal.component';

@Component({
  selector: 'app-bad-stores',
  templateUrl: './bad-stores.component.html',
  styleUrls: ['./bad-stores.component.css']
})
export class BadStoresComponent implements OnInit {
  stores: Store[];
  warnStores: Store[];
  constructor(public dialog: MatDialog, private storeService: StoreService) {}

  getStores() {
    this.storeService.getBadStores().subscribe((x) => {
      this.stores = x;
    });
    this.storeService.getWarningStores().subscribe((x) => {
      this.warnStores = x;
    });
  }
  ngOnInit() {

    this.getStores();
  }
  openDialog(codeStore: number, numResult: number) {
    const dialogRef = this.dialog.open(ViewStoreUpdatesModalComponent, {
      data: { codeStore,numResult },
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
