import { Component, OnInit } from '@angular/core';
import { CompanyService } from './Shared/company.service';
import { PortfolioService } from './Shared/portfolio.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompanyService, PortfolioService]
})
export class CompaniesComponent implements OnInit {

  constructor(private companyService: CompanyService, private portfolioService: PortfolioService) { }

  ngOnInit() {
  }

}
