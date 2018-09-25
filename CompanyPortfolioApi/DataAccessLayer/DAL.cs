using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace DataAccessLayer
{

    public static  class DAL
    {
        static CompanyPortfolioEntities DbContext;
        static DAL()
        {
            DbContext = new CompanyPortfolioEntities();
        }

        //GET All Company Details
        public static IQueryable<CompanyDetail> GetAllCompanyDetails()
        {
            return DbContext.CompanyDetails;
        }

        //GET CompanyID of CompanyDetail
        public static CompanyDetail GetCompany(int CompanyID)
        {
            return DbContext.CompanyDetails.Where(p => p.CompanyID == CompanyID).FirstOrDefault();
        }

        //GET CompanyID of PortfolioDetail
        public static PortfolioDetail GetPortfolio(int CompanyID)
        {
            return DbContext.PortfolioDetails.Where(p => p.CompanyID == CompanyID).FirstOrDefault();
        }
        

        //GET All Portfolio Details
        public static IQueryable<PortfolioDetail> GetAllPortfolioDetails()

        {


            var  portfolioDetail = DbContext.PortfolioDetails.ToArray();
            foreach (var item in portfolioDetail)
            {
              // item.CoverImage = HostingEnvironment.MapPath("~/Image/" + item.CoverImage.Split('\\').LastOrDefault());
                item.CoverImage = item.CoverImage.Split('\\').LastOrDefault();
               
            }
           
            return portfolioDetail.AsQueryable();
        }

        //Add Company Details
        public static bool AddCompanyDetails(CompanyDetail companyDetail)
        {
            bool status;
            try
            {
                DbContext.CompanyDetails.Add(companyDetail);
                DbContext.SaveChanges();
                status = true;
            }
            catch (DbUpdateException ex)

            {
                status = false;
                throw ex;
            }
            return status;
        }

        //Add Portfolio Details
        public static bool AddPortfolioDetails(PortfolioDetail portfolioDetail)
        {
            bool status;
            try
            {
                DbContext.PortfolioDetails.Add(portfolioDetail);
                DbContext.SaveChanges();
                status = true;
            }
            catch (Exception )
            {
                status = false;
            }
            return status;
        }
        //update CompanyDetails
        public static bool UpdateCompanyDetails(CompanyDetail companyDetail)
        {
            bool status;
            try
            {
                CompanyDetail prodItem = DbContext.CompanyDetails.Where(p => p.CompanyID == companyDetail.CompanyID).FirstOrDefault();
                if (prodItem != null)
                {
                    prodItem.CompanyIndex = companyDetail.CompanyIndex;
                    prodItem.CompanyName = companyDetail.CompanyName;
                    prodItem.CompanyAddress = companyDetail.CompanyAddress;
                    prodItem.CompanyEmail = companyDetail.CompanyEmail;
                    prodItem.CompanyPhoneNo = companyDetail.CompanyPhoneNo;
                    prodItem.CompanyContactPerson = companyDetail.CompanyContactPerson;
                    DbContext.SaveChanges();
                }
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }
        //update PortfolioDetails

        public static bool UpdatePortfolioDetails(PortfolioDetail portfolioDetail)
        {
            bool status;
            try
            {
                PortfolioDetail prodItem = DbContext.PortfolioDetails.Where(p => p.CompanyID == portfolioDetail.CompanyID).FirstOrDefault();
                if (prodItem != null)
                {
                    prodItem.PortfolioName = portfolioDetail.PortfolioName;
                    prodItem.CompanyID = portfolioDetail.CompanyID;
                    prodItem.PortfolioDescription = portfolioDetail.PortfolioDescription;
                    prodItem.CoverImage = portfolioDetail.CoverImage;
                    prodItem.YouTubeUrl = portfolioDetail.YouTubeUrl;
                    DbContext.SaveChanges();
                }
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        //Delete CompanyDetails
        public static bool DeleteCompanyDetails(int id)
        {
            bool status;
            try
            {
                CompanyDetail prodItem = DbContext.CompanyDetails.Where(p => p.CompanyID == id).FirstOrDefault();
                if (prodItem != null)
                {
                    DbContext.CompanyDetails.Remove(prodItem);
                    DbContext.SaveChanges();
                }
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }

        //Delete PortfolioDetails
        public static bool DeletePortfolioDetails(int id)
        {
            bool status;
            try
            {
                PortfolioDetail prodItem = DbContext.PortfolioDetails.Where(p => p.CompanyID == id).FirstOrDefault();
                if (prodItem != null)
                {
                    DbContext.PortfolioDetails.Remove(prodItem);
                    DbContext.SaveChanges();
                }
                status = true;
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }


    }
    
}

