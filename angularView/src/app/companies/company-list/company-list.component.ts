import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../Shared/company.service';
import { Company } from '../Shared/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PortfolioService } from '../Shared/portfolio.service';
import { Portfolio } from '../Shared/portfolio.model';
 import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  cmpID: number;
  modal: any;
  PortfolioName: string;
  CompanyID: number;
  PortfolioID: number;
  PortfolioDescription: string;
  CoverImage: string;
  YouTubeUrl: string;
  constructor(private companyService: CompanyService, private route: ActivatedRoute, private portfolioService: PortfolioService, private routes: Router, private toastr: ToastrService) { }

  cmpIndex: number;
  sub: any;

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {

        //this.CompanyID = 2 ;

      });
    this.companyService.getCompanyList();
  }
  showForEdit(cmp: Company) {
    this.companyService.selectedCompany = Object.assign({}, cmp);;
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.companyService.deleteCompany(id)
        .subscribe(x => {
          this.companyService.getCompanyList();
           this.toastr.warning("Deleted Successfully","Company Register");
        })
    }
  }

  onSelect(selectedItem: any) {
  //  console.log("Selected item Id: ", selectedItem.CompanyID);
    //this.routes.navigateByUrl('/Portfolio')// You get the Id of the selected item here
    this.routes.navigate(['AddPortfolio'], { queryParams: { CompanyID: selectedItem.CompanyID } });
  }

}
