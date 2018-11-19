import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  getCustomer(phone_number): Observable<any>{
    return this.http.get("/api/get_customer/"+phone_number);
  }

  getPackageDetails(tracking_number): Observable<any>{
    return this.http.get("/api/packages_tracking/"+tracking_number);
  }

  getAllCustomer(): Observable<any>{
    return this.http.get("/api/get_all_customers");
  }

  updateEachCustomer(trackingNumber, packageDetails){
    this.http.put("/api/update_customer_packages_dateails/"+ trackingNumber, {data: packageDetails})
      .subscribe(datas => {
        console.log(datas)
      });
  }
}
