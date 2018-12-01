import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiServiceService} from "../../api-service.service";
import {Customer} from "../customer.model";
import {forEach} from "@angular/router/src/utils/collection";
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SearchPageComponent implements OnInit {

  constructor(private authSearch: ApiServiceService) { }
  form: FormGroup;
  customers:Customer[] = [];
  length = 0;
  customer:any;
  packageDetails: any;
  flag = true;
  columnsToDisplay = ['trakcingNumber','phoneNumber'];
  expandedElement: Customer;
  mode = 'determinate';
  dataSource: any;
  isLoading = false;


  ngOnInit() {
    this.form = new FormGroup({
      phone_number: new FormControl(null, {
        validators: [Validators.required,
        Validators.minLength(11)
          // Validators.maxLength(11)
        ]
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

      for(let customer of this.customer){
        console.log("----",customer);
        console.log(customer.trakcingNumber);
        this.authSearch.getPackageDetails(customer.trakcingNumber).subscribe(packageDetails => {
          customer.data = packageDetails.data;

        }

        );
        if(customer.package_id){
          this.authSearch.getPackageData(customer.package_id).subscribe(packageData => {
            customer.packageData = packageData.data;
          })
        }

      }
      console.log(customer);


    });

    this.form.reset();
    this.flag = false;
  }

  onClick(trackingNumber:string){
    this.authSearch.getPackageDetails(trackingNumber).subscribe(packageDetails => {
      this.packageDetails = packageDetails;
    })

  }

  getAllCustomers(){
    this.authSearch.getAllCustomer().subscribe(customers => {
      if(customers){
        this.customers = customers;
        // this.dataSource = this.customers;
        for(let customer of this.customers){
          this.authSearch.getPackageDetails(customer.trackingNumber).subscribe(packageDetails => {
            this.packageDetails = packageDetails;
            this.authSearch.updateEachCustomer(customer.trackingNumber, this.packageDetails);
          });

        }
      }

    })
  }

  // get phone_number() {
  //   return this.form.get("phone_number");
  // }

}
