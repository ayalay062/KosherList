import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { StoreComponent } from "./store/store.component";
import { WorkerSchedulerComponent } from "./WorkerScheduler/WorkerScheduler.component";
import { UpdatesComponent } from "./updates/updates.component";
import { SetStoresComponent } from "./set-stores/set-stores.component";
import { BadStoresComponent } from "./bad-stores/bad-stores.component";
import { SetWorkersComponent } from "./set-workers/set-workers.component";
import { AllWorkersSchedulersComponent } from "./all-workers-schedulers/all-workers-schedulers.component";
import { WorkersUpdatesComponent } from "./workers-updates/workers-updates.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "stores",
    component: SetStoresComponent,
  },
  { path: "workers", component: SetWorkersComponent },
  { path: "workers-updates", component: WorkersUpdatesComponent },


  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "WorkerScheduler", component: WorkerSchedulerComponent },
  { path: "workers-schedulers", component: AllWorkersSchedulersComponent },
  { path: "updates", component: UpdatesComponent },
  { path: "bad-stores", component: BadStoresComponent },
  { path: "", component: HomeComponent, pathMatch: 'full' },
   {path:"**", pathMatch:"full", redirectTo:"login"},
  // {path:"",  component: StoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
