import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiServiceService} from "../../api-service.service";
import {Customer} from "../customer.model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private authSearch: ApiServiceService) { }
  form: FormGroup;
  customers:Customer[] = [];
  length = 0;
  customer:any;
  packageDetails: any;

  ngOnInit() {
    this.form = new FormGroup({
      phone_number: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    // this.getAllCustomers();
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.authSearch.getCustomer(this.form.value.phone_number).subscribe(customer =>{
      console.log(customer);
      this.customer = customer;
    });

    this.form.reset();
  }

  onClick(trackingNumber:string){
    this.authSearch.getPackageDetails(trackingNumber).subscribe(packageDetails => {
      this.packageDetails = packageDetails;
    })

  }

  getAllCustomers(){
    this.authSearch.getAllCustomer().subscribe(customers => {
      this.customers = customers;
      for(let customer of this.customers){
        this.authSearch.getPackageDetails(customer.trackingNumber).subscribe(packageDetails => {
          this.packageDetails = packageDetails;
          this.authSearch.updateEachCustomer(customer.trackingNumber, this.packageDetails);
        });

      }
    })
  }

}