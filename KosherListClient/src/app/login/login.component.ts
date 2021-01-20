import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule, Router } from "@angular/router";
import swal from "sweetalert2";
import { Users } from "../classes/Users";
import { GetServerService } from "../get-server.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  form = this.fb.group({
    userUserName: this.fb.control("", [Validators.required]),
    userPassword: this.fb.control("", [Validators.required]),
  });
  testObject: Variable;
  hide = true;

  ngOnInit() {}
  searchuser() {
    const User = <Users>this.form.value;
    this.service.login(User).subscribe((myuser) => {
      if (!myuser) {
        this.form.reset();
        swal.fire("Oops!", "שם משתמש/סיסמא לא תקינים", "error");
      } else {
        swal.fire("","הכניסה בוצעה בהצלחה!", "success");
        localStorage.setItem("userCurrent", JSON.stringify(myuser));
        this.router.navigate(["/updates"]);
      }
    });
  }
  register() {
    console.log(this.router);
    this.router.navigate(["/register"]);
  }
}
