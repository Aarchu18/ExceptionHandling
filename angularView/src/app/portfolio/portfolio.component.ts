import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Portfolio } from '../companies/Shared/portfolio.model';
import { PortfolioService } from '../companies/Shared/portfolio.service';
import { NgForm } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  sub: any;
  companyId: any;
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {

        this.companyId = params['CompanyID'];
        console.log(this.companyId);

      });
    this.portfolioService.getPortfolioList();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form! = null)
      form.reset();
    this.portfolioService.selectedPortfolio = {
      PortfolioID: null,
      PortfolioName: '',
      CompanyID: null,
      PortfolioDescription: '',
      CoverImage: '',
      YouTubeUrl: '',

    }
  }

  onSubmit(form: NgForm) {

    console.log(form.value);
    if (form.value.PortfolioID == null) {

      var data = {
        PortfolioID: form.controls.PortfolioID.value,
        PortfolioName: form.controls.PortfolioName.value,
        CompanyID: this.companyId,
        PortfolioDescription: form.controls.PortfolioDescription.value,
        CoverImage: form.controls.CoverImage.value,
        YouTubeUrl: form.controls.YouTubeUrl.value,
      };

      this.portfolioService.postPortfolio(data)
        .subscribe(data => {
          //console.log(data)
          this.portfolioService.getPortfolioList();
          this.resetForm(form);
        });
       this.toastr.success('New Record Added Succcessfully', 'Portfolio Register');

    }
    else {
      this.portfolioService.putPortfolio(form.value.portfolioID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.portfolioService.getPortfolioList();
           this.toastr.info('Record Updated Successfully!', 'Portfolio Register');
        });
    }

  }
  showForEdit(port: Portfolio) {
    this.portfolioService.selectedPortfolio = Object.assign({}, port);;
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.portfolioService.deletePortfolio(id)
        .subscribe(x => {
          this.portfolioService.getPortfolioList();
           this.toastr.warning("Deleted Successfully","Portfolio Register");
        })
    }
  }

}
