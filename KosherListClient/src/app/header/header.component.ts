import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WorkerService } from "../worker.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  loginAsWorker? :boolean = null;
  constructor(private service: WorkerService,private router: Router) {
    this.service.loginAsWorker.subscribe((x) => {
      this.loginAsWorker = x;
    });
  }

  ngOnInit() {
    var user = JSON.parse( localStorage.getItem("userCurrent"));
    if( user != null)
    {
      if(user.codeWorker ){
        this.loginAsWorker = true;
      }
      else{
        this.loginAsWorker = false;

      }
    }
  }
  logout(){

    localStorage.setItem('userCurrent', null);
    this.loginAsWorker = null;
    this.router.navigate(["/login"]);
  }
}
