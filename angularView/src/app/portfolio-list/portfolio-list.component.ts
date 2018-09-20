import { Component, OnInit } from '@angular/core';
import {PortfolioService} from    '../companies/Shared/portfolio.service' ;
import { Portfolio } from '../companies/Shared/portfolio.model';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {

  constructor(private portfolioService:PortfolioService) {
 

   }

  ngOnInit() {
    console.log("working")
    this.portfolioService.getPortfolioList();
   
   
  }
  showForEdit(port: Portfolio) {
    this.portfolioService.selectedPortfolio = Object.assign({}, port);;
  }
 
 
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.portfolioService.deletePortfolio(id)
      .subscribe(x => {
        this.portfolioService.getPortfolioList();
        // this.toastr.warning("Deleted Successfully","Employee Register");
      })
    }
  }
 

}
