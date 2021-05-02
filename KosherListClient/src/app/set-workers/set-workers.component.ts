import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WorkerService } from '../worker.service';
import { Worker } from '../classes/Worker';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-set-workers',
  templateUrl: './set-workers.component.html',
  styleUrls: ['./set-workers.component.css']
})
export class SetWorkersComponent implements OnInit {
  workers: Worker[];
  constructor(public dialog: MatDialog, private workerService: WorkerService) {}

  getWorkers() {
    this.workerService.getWorkers().subscribe((x) => {
      this.workers = x;
    });
  }
  ngOnInit() {

    this.getWorkers();
  }
  openDialog(codeWorker?: number) {
    const dialogRef = this.dialog.open(RegisterComponent, {
      data: { codeWorker },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.getWorkers();
    });
  }
}
