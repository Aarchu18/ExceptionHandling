import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators'
import { Company } from './company.model';

@Injectable()
export class CompanyService {
  selectedCompany: Company;
  companyList: Company[];

  constructor(private http: Http) { }
  postCompany(cmp: Company) {
    var body = JSON.stringify(cmp);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:51774/api/CompanyDetails', body, requestOptions).map(x => x.json());

  }


  putCompany(id, cmp) {
    var body = JSON.stringify(cmp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:51774/api/CompanyDetails/' + id,
      body,
      requestOptions).map(res => res.json());
  }
  getCompanyList() {
    console.log("company");
    this.http.get('http://localhost:51774/api/CompanyDetails')
      .map((data: Response) => {
        return data.json() as Company[];
      }).toPromise().then(x => {
        this.companyList = x;
      })
  }
  deleteCompany(id: number) {
    return this.http.delete('http://localhost:51774/api/CompanyDetails/' + id).map(res => res.json());
  }
}
