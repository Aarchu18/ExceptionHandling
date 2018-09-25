using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.UI.WebControls;

namespace CompanyPortfolioApi.Controllers
{
    public class PortfolioDetailsController : ApiController
    {
        // GET: api/PortfolioDetails
        public IQueryable<PortfolioDetail> GetPortfolioDetails()
        {
            return DAL.GetAllPortfolioDetails();
        }

        // GET: api/PortfolioDetails/5
        [ResponseType(typeof(PortfolioDetail))]
        public IHttpActionResult GetPortfolioDetail(int id)
        {
            PortfolioDetail portfolioDetail = DAL.GetPortfolio(id);
            if (portfolioDetail == null)
            {
                return NotFound();
            }

            return Ok(portfolioDetail);
        }

        // PUT: api/PortfolioDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPortfolioDetail(int id, PortfolioDetail portfolioDetail)
        {
            try
            {
                DAL.UpdatePortfolioDetails(portfolioDetail);
            }
            catch (DbUpdateConcurrencyException ex)
            {

                throw ex;

            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/PortfolioDetails
        [ResponseType(typeof(PortfolioDetail))]
        public IHttpActionResult PostPortfolioDetail(PortfolioDetail portfolioDetail)
        {
            // DAL.AddPortfolioDetails(portfolioDetail);
            //string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //upload image
           var postedFile = httpRequest.Files["Image"];
             var fileName = portfolioDetail.CoverImage.Split('\\');
            //create custom filename
            // imageName = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            // imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + fileName.LastOrDefault());
            //postedFile.SaveAs(filePath);
            
            using (CompanyPortfolioEntities db = new CompanyPortfolioEntities())
            {
                //PortfolioDetail portfolioDetail = new PortfolioDetail()
                //{
                //    //CoverImage = httpRequest["CoverImage"]
                //   // PortfolioID = 0,
                //    PortfolioName = "",
                //    CompanyID = 0,
                //    PortfolioDescription = "",

                //     CoverImage = filePath,
                //    YouTubeUrl = ""


                //};
                //db.PortfolioDetails.Add(portfolioDetail);
                //db.SaveChanges();

                var customers = db.PortfolioDetails.Add(new PortfolioDetail { CoverImage = fileName.LastOrDefault(), PortfolioName = portfolioDetail.PortfolioName, CompanyID = portfolioDetail.CompanyID, PortfolioDescription = portfolioDetail.PortfolioDescription, YouTubeUrl = portfolioDetail.YouTubeUrl });
                // customers.Add(new Customer { CustomerId = id, Name = "John Doe" });

                db.SaveChanges();
            }
           // return Request.CreateResponse(HttpStatusCode.Created);


            return CreatedAtRoute("DefaultApi", new { id = portfolioDetail.PortfolioID }, portfolioDetail);
        }

        //POST:Add images
        [HttpPost]
        [Route("api/UploadImage")]
        public HttpResponseMessage UploadImage()
        {
            //string imageName = null;
            var httpRequest = HttpContext.Current.Request;
            //upload image
            var postedFile = httpRequest.Files["Image"];
            //create custom filename
           // imageName = new string(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
           // imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            var filePath = HttpContext.Current.Server.MapPath("~/Image/" + postedFile.FileName);
            postedFile.SaveAs(filePath);
            
            return Request.CreateResponse(HttpStatusCode.Created);
        }


        //GET get images
        [HttpGet]
        [Route("api/GetImage")]
        public HttpResponseMessage GetImage()
        {

            CompanyPortfolioEntities db = new CompanyPortfolioEntities();
            var item = (from d in db.PortfolioDetails select d).ToList();
            return Request.CreateResponse(item);

        }

           /* //save to db
            using (CompanyPortfolioEntities db = new CompanyPortfolioEntities())
            {
                PortfolioDetail portfolioDetail = new PortfolioDetail()
                {
                    CoverImage = httpRequest["CoverImage"]
                   

                };
                db.CoverImage.Add(Image);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created);
        }
        */

        // DELETE: api/PortfolioDetails/5
        [ResponseType(typeof(PortfolioDetail))]
        public IHttpActionResult DeletePortfolioDetail(int id)
        {
            PortfolioDetail portfolioDetail = DAL.GetPortfolio(id);
            if (portfolioDetail == null)
            {
                return NotFound();
            }
            DAL.DeletePortfolioDetails(id);
            return Ok(portfolioDetail);
        }
    }
}



        

       
    
