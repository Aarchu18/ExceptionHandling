using DataAccessLayer;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace CompanyPortfolioApi.Controllers
{
    public class CompanyDetailsController : ApiController
    {
       
        // GET: api/CompanyDetails
        public IQueryable<CompanyDetail> GetCompanyDetails()
        {
            return DAL.GetAllCompanyDetails();
        }

        // GET: api/CompanyDetails/5
        [ResponseType(typeof(CompanyDetail))]
        public IHttpActionResult GetCompanyDetail(int id)
        {
            CompanyDetail companyDetail = DAL.GetCompany(id);
            if (companyDetail == null)
            {
                return NotFound();
            }

            return Ok(companyDetail);
        }

        // PUT: api/CompanyDetails/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompanyDetail(int id, CompanyDetail companyDetail)
        {
            try
            {
                DAL.UpdateCompanyDetails(companyDetail);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                
                    throw ex;
                
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CompanyDetails
        [ResponseType(typeof(CompanyDetail))]
        public IHttpActionResult PostCompanyDetail(CompanyDetail companyDetail)
        {
            try
            {
                DAL.AddCompanyDetails(companyDetail);
            }
            catch (DbUpdateException ex)
            {

                throw ex;

            }


            return CreatedAtRoute("DefaultApi", new { id = companyDetail.CompanyID }, companyDetail);
        }

        // DELETE: api/CompanyDetails/5
        [ResponseType(typeof(CompanyDetail))]
        public IHttpActionResult DeleteCompanyDetail(int id)
        {
            CompanyDetail companyDetail = DAL.GetCompany(id);
            if (companyDetail == null)
            {
                return NotFound();
            }
            DAL.DeleteCompanyDetails(id);

            return Ok(companyDetail);
        }

       
    }
}