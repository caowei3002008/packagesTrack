import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchPageComponent} from "./main/search-page/search-page.component";
import {TrackingResultsComponent} from "./main/tracking-results/tracking-results.component";

const routes: Routes = [

  {
    path:"",
    pathMatch: "full",
    component:SearchPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
