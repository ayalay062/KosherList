import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule, Router } from "@angular/router";
import swal from "sweetalert2";
import { Users } from "../classes/Users";
import { Worker } from "../classes/Worker";
import { GetServerService } from "../get-server.service";
import { UserService } from "../user.service";
import { WorkerService } from "../worker.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: WorkerService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  form = this.fb.group({
    nameWorker: this.fb.control("", [Validators.required]),
    passwordWorker:this.fb.control("", [Validators.required]),
  });
  testObject: Variable;
  hide = true;

  ngOnInit() {}
  searchuser() {
    const woker = <Worker>this.form.value;
    this.service.login(woker).subscribe((myWorker) => {
      if (!myWorker) {
        this.form.reset();
        swal.fire("Oops!", "שם משתמש/סיסמא לא תקינים", "error");
      } else {
        swal.fire("","הכניסה בוצעה בהצלחה!", "success");
        localStorage.setItem("userCurrent", JSON.stringify(myWorker));
        if(myWorker.codeWorker ){

           this.service.loginAsWorker.next(true);
           this.router.navigate(["/updates"]);
        }
        else{

          this.service.loginAsWorker.next(false);
          this.router.navigate(["/workers"]);

        }
     
      }
    });
  }
  register() {
    console.log(this.router);
    this.router.navigate(["/register"]);
  }
}
