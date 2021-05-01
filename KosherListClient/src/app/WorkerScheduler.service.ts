import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkerScheduler } from './classes/workerScheduler';

@Injectable({
  providedIn: 'root'
})
export class WorkerSchedulerService {

  apiWorkerScheduler = environment.apiWorkerScheduler;
  constructor(private Http: HttpClient) { }

  getAllWorkerScheduler(): Observable<WorkerScheduler[]> {
    return this.Http.get<WorkerScheduler[]>(
      this.apiWorkerScheduler + "getAllWorkerScheduler");
  }

  createWorkerScheduler(newWorkerScheduler: WorkerScheduler): Observable<boolean> {
    return this.Http.post<boolean>(
      this.apiWorkerScheduler + "AddWorkerScheduler", newWorkerScheduler);
  }

  getWorkerSchedulerById(id: number): Observable<WorkerScheduler[]> {
    return this.Http.get<WorkerScheduler[]>(
      this.apiWorkerScheduler + "getWorkerSchedulerById/" + id);
  }
  setWorkerScheduler(workerId, codeStore, day,hourEnd,hourStart): Observable<boolean> {
    return this.Http.post<boolean>(
      this.apiWorkerScheduler + "setWorkerScheduler", {workerId, codeStore, day,hourEnd,hourStart});
  }
     
}
