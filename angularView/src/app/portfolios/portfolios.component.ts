import { Component, OnInit } from '@angular/core';
import {PortfolioService} from  '../companies/Shared/portfolio.service';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.css'],
  providers:[PortfolioService],
})
export class PortfoliosComponent implements OnInit {

  constructor(private portfolioService :PortfolioService) { }

  ngOnInit() {
  }

}
