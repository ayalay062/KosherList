import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Update } from "./classes/Update";

@Injectable({
  providedIn: "root",
})
export class UpdatesService {
  apiUpdate = environment.apiUpdate;

  constructor(private Http: HttpClient) {}

  getAllWorkerUpdates(code): Observable<Update[]> {
    return this.Http.get<Update[]>(this.apiUpdate + "getAllWorkerUpdates/" + code);
  }

  getUpdateById(id: number): Observable<Update> {
    return this.Http.get<Update>(this.apiUpdate + "getUpdatesById/" + id);
  }

  createUpdate(newUpdate: Update): Observable<boolean> {
    return this.Http.post<boolean>(this.apiUpdate + "AddUpdate", newUpdate);
  }

  GetWarningUpdatesOfStore(code: number): Observable<Update[]> {
    return this.Http.get<Update[]>(this.apiUpdate + "GetWarningUpdatesOfStore/" + code);
  }
  GetBadUpdatesOfStore(code: number): Observable<Update[]> {
    return this.Http.get<Update[]>(this.apiUpdate + "GetBadUpdatesOfStore/" + code);
  }
  

  updateUpdates(update: Update): Observable<boolean> {
    return this.Http.post<boolean>(this.apiUpdate + "UpdateUpdate", update);
  }
}
