import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators'
import { Portfolio } from './portfolio.model';

@Injectable()
export class PortfolioService {
  selectedItem: any;
  cmpIndex: number;
  caption: string;
   fileToUpload: File;
  selectedPortfolio: Portfolio;
  portfolioList: Portfolio[];
  CompanyPortfolioList = []
  

  constructor(private http: Http) { }
  // postFile(caption: string, fileToUpload: File) {
  //   const endpoint = 'http://localhost:51774/api/UploadImage';
  //   const formData: FormData = new FormData();
  //   //formData.append('Image', fileToUpload, fileToUpload.name);
  //   formData.append('CoverImage', caption);
  //   return this.http
  //     .post(endpoint, formData);
  // }


  postPortfolio(port:Portfolio) {
  //this.postFile(this.caption,this.fileToUpload).subscribe(res=>{
    
    
 //})
    var body = JSON.stringify(port);
    console.log("done"+port);
   // console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
    return this.http.post('http://localhost:51774/api/PortfolioDetails', body, requestOptions).map(x => x.json());

  }

  putPortfolio(id, port) {
    var body = JSON.stringify(port);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://localhost:51774/api/PortfolioDetails/' + id,
      body,
      requestOptions).map(res => res.json());
  }
   getPortfolioList() {
     console.log("woeking")
     this.http.get('http://localhost:51774/api/PortfolioDetails')
       .map((data: Response) => {
         
         console.log(data);
         return data.json() as Portfolio[];
       }).toPromise().then(x => {
        this.portfolioList = x;
       })
  }


   deletePortfolio(id: number) {
     return this.http.delete('http://localhost:51774/api/PortfolioDetails/' + id).map(res => res.json());
   }

  }