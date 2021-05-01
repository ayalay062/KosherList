import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from './classes/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  apiStore=environment.apiStore;
  constructor(private Http:HttpClient) { }
  getStores():Observable<Store[]>{
    return this.Http.get<Store[]>(
     this.apiStore+"getAllStores");
  }
  
   createStore(newStore: Store):Observable<boolean>{
    return this.Http.post<boolean>(
      this.apiStore+"AddStore",newStore);
  }
}
