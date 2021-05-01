import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Worker } from './classes/Worker';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  apiWorker = environment.apiWorker;

  constructor(private Http:HttpClient) { }

  getWorker():Observable<Worker[]>{
    return this.Http.get<Worker[]>(
      this.apiWorker+"getAllWorkers");
   };
  
   createWorker(newWorker: Worker):Observable<boolean>{
    return this.Http.post<boolean>(
      this.apiWorker+"AddWorker",newWorker);
  }

  login(worker:Worker):Observable<Worker>{
    return this.Http.post<Worker>(
      this.apiWorker+"login",worker);
   };  
}
