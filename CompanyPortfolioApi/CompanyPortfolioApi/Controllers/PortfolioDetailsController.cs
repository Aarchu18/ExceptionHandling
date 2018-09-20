using DataAccessLayer;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

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
            DAL.AddPortfolioDetails(portfolioDetail);


            return CreatedAtRoute("DefaultApi", new { id = portfolioDetail.PortfolioID }, portfolioDetail);
        }

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



        

       
    
