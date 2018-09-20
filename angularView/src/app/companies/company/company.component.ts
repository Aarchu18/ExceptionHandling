import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../Shared/company.service';
import { PortfolioService } from '../Shared/portfolio.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService, private portfolioService: PortfolioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  cmpIndex: number;
  message: string;
  resetForm(form?: NgForm) {
    if (form! = null)
      form.reset();
    this.companyService.selectedCompany = {
      CompanyIndex: null,
      CompanyName: '',
      CompanyAddress: '',
      CompanyID: null,
      CompanyEmail: '',
      CompanyPhoneNo: null,
      CompanyContactPerson: ''
    }
  }

  onSubmit(form: NgForm) {

    console.log(form.controls.CompanyID.value)
    console.log(form)
    if (form.value.CompanyIndex == null) {
      this.companyService.postCompany(form.value)
        .subscribe(data => {
          this.companyService.getCompanyList();
          this.cmpIndex = form.controls.CompanyID.value;
          this.portfolioService.cmpIndex = form.controls.CompanyID.value
          this.resetForm(form);
          this.toastr.success('New Record Added Succcessfully', 'Company Register');
        },
        err => {
          this.message = "Company ID Already Exists";
        }
      )
    }

    else {
      this.companyService.putCompany(form.value.CompanyIndex, form.value)
        .subscribe(data => {
          console.log("working" + data);
          this.resetForm(form);
          this.companyService.getCompanyList();
          this.toastr.info('Record Updated Successfully!', 'Company Register');
        });
      }
    }
  }
        
  
        
    




