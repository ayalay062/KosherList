import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Store } from "./classes/Store";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  apiStore = environment.apiStore;
  constructor(private Http: HttpClient) {}
  getStores(): Observable<Store[]> {
    return this.Http.get<Store[]>(this.apiStore + "getAllStores");
  }
  getBadStores(): Observable<Store[]> {
    return this.Http.get<Store[]>(this.apiStore + "getBadStores");
  }
  getWarningStores(): Observable<Store[]> {
    return this.Http.get<Store[]>(this.apiStore + "getWarningStores");
  }
  
  getStoreByCode(code: number): Observable<Store> {
    return this.Http.get<Store>(this.apiStore + "getStoreByCode/" + code);
  }
  createStore(newStore: Store): Observable<boolean> {
    return this.Http.post<boolean>(this.apiStore + "AddStore", newStore);
  }
  UpdateStore(store: Store): Observable<boolean> {
    return this.Http.post<boolean>(this.apiStore + "UpdateStore", store);
  }
}
