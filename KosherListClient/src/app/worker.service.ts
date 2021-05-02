import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Worker } from "./classes/Worker";

@Injectable({
  providedIn: "root",
})
export class WorkerService {
  apiWorker = environment.apiWorker;
  loginAsWorker = new Subject<boolean>();
  constructor(private Http: HttpClient) {}

  getWorkers(): Observable<Worker[]> {
    return this.Http.get<Worker[]>(this.apiWorker + "getAllWorkers");
  }
  getWorkerByCode(code): Observable<Worker> {
    return this.Http.get<Worker>(this.apiWorker + "getWorkerByCode/" + code);
  }

  createWorker(newWorker: Worker): Observable<boolean> {
    return this.Http.post<boolean>(this.apiWorker + "AddWorker", newWorker);
  }

  updateWorker(worker: Worker): Observable<boolean> {
    return this.Http.post<boolean>(this.apiWorker + "updateWorker", worker);
  }
  login(worker: Worker): Observable<any> {
    return this.Http.post<any>(this.apiWorker + "login", worker);
  }
}
