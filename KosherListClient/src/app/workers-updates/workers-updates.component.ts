import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { WorkerService } from "../worker.service";
import { WorkerSchedulerService } from "../WorkerScheduler.service";
import { Worker } from "../classes/Worker";
import { UpdatesService } from "../updates.service";
import { Update } from "../classes/Update";
@Component({
  selector: "app-workers-updates",
  templateUrl: "./workers-updates.component.html",
  styleUrls: ["./workers-updates.component.css"],
})
export class WorkersUpdatesComponent implements OnInit {
  workers: Worker[];
  workerId: number;
  tableWorkHours: Update[] = new Array<Update>();
  displayedColumns: string[] = [
    "dateTime",
    "codeStore",
    "begginingTime",
    "exitingTime",
    "result",
    "remarks"
  ];
  constructor(
    private serviceSchedular: WorkerSchedulerService,
    private serviceStore: StoreService,
    private workerService: WorkerService,
    private serviceUpdate: UpdatesService,
  ) {}

  ngOnInit() {
    this.workerService.getWorkers().subscribe((x) => {
      this.workers = x;
      this.workerId = this.workers[0].codeWorker;
    });
  }
  getWorkerSchedulerId(id) {
    this.workerId = id;
    this.serviceUpdate
    .getAllWorkerUpdates( this.workerId)
    .subscribe((x) => {
      this.tableWorkHours = x;

    });
  }
}
