import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Portfolio } from '../companies/Shared/portfolio.model';
import { PortfolioService } from '../companies/Shared/portfolio.service';
import { NgForm } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:51774/api/UploadImage';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  sub: any;
  bgImage:any;
  companyId: any;
  imageUrl:string ="../src/assets/img/default.jpg";
  fileToUpload:File=null;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'Image'});
  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute, private toastr: ToastrService,private sanitizer:DomSanitizer ) { }

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe(params => {

        this.companyId = params['CompanyID'];
        console.log(this.companyId);

      });

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    this.portfolioService.getPortfolioList();
    this.resetForm();
  }
  handleFileInput(file:FileList){
    this.fileToUpload =file.item(0);

    //show image preview
    var reader = new FileReader();
    reader.onload =(event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

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
  getEmbedUrl(YouTubeUrl){
  return this.sanitizer.bypassSecurityTrustResourceUrl('https://youtube.com/embed/'+YouTubeUrl+ '?ecver=2')
}
 getImageUrl(CoverImage)
 {
  //return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/Image'+CoverImage);
  return this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/' + CoverImage );
 }    
 onSubmit(form: NgForm) {


   // console.log(form.value);
    if (form.value.PortfolioID == null) {

      var data = {
        PortfolioID: form.controls.PortfolioID.value,
        PortfolioName: form.controls.PortfolioName.value,
        CompanyID: this.companyId,
        PortfolioDescription: form.controls.PortfolioDescription.value,
        CoverImage: form.controls.CoverImage.value,
      // CoverImage:"",
        YouTubeUrl: form.controls.YouTubeUrl.value
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
           //this.portfolioService.getPortfolioList();
            this.toastr.info('Record Updated Successfully!', 'Portfolio Register');
      });
     }
    }
    

  
  showForEdit(port: Portfolio) {
    this.portfolioService.selectedPortfolio = Object.assign({}, port);;
  }
  // onDelete(id: number) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //    // this.portfolioService.deletePortfolio(id)
  //       //.subscribe(x => {
  //         this.portfolioService.getPortfolioList();
  //          this.toastr.warning("Deleted Successfully","Portfolio Register");
  //       })
  //   }
  }


