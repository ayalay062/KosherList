import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "./classes/Users";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  apiUsers = environment.apiUsers;
  constructor(private Http: HttpClient) {}
  // getCurrentUser(){
  //   if(this.CurrentUser===null)
  //   {return null}
  //   else
  //   return this.CurrentUser;
  // };

  
  getUsers(): Observable<Users[]> {
    return this.Http.get<Users[]>(
     this.apiUsers +  "getAllUsers"
    );
  }
  login(user: Users): Observable<Users> {
    return this.Http.post<Users>(
      this.apiUsers + "login", user
    );
  }

  
}


// api/users/getAllUsers
