import { Component, OnInit } from "@angular/core";
import { WorkerService } from "../worker.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loginAsWorker? :boolean;
  constructor(private service: WorkerService) {
    this.service.loginAsWorker.subscribe((x) => {
      this.loginAsWorker = x;
    });
  }

  ngOnInit() {}
}
