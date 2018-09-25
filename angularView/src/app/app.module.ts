import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company/company.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import {HttpModule} from "@angular/http";
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import {PortfolioService} from './companies/Shared/portfolio.service';
import {CompanyService} from   './companies/Shared/company.service';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';
const routes: Routes = [{
 path: '',
  component: CompaniesComponent
},
{
  path:'AddPortfolio',
component: PortfolioComponent,
},

];
@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyComponent,
    CompanyListComponent,
    PortfolioComponent,
    PortfolioListComponent,
    PortfoliosComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    // BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [PortfolioService,CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
