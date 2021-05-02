using BLL.services;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace kosherListApi.Controllers
{
 
    [RoutePrefix("api/store")]
  
    public class StoreController : ApiController
    {
        [HttpGet]
        [Route("getAllStores")]
        public IHttpActionResult getAllStores()
        {
           return Ok(StoreBL.GetAllStores());
           
        }

        [HttpGet]
        [Route("getBadStores")]
        public IHttpActionResult getBadStores()
        {
            return Ok(StoreBL.GetBadStores());

        }

        [HttpGet]
        [Route("getWarningStores")]
        public IHttpActionResult getWarningStores()
        {
            return Ok(StoreBL.GetWarningStores());

        }


        [HttpGet]
        [Route("GetStoreByCode/{code}")]
        public IHttpActionResult GetStoreByCode(int code)
        {
            return Ok(StoreBL.GetStoreByCode(code));

        }
        [HttpPost]
        [Route("AddStore")]
        public IHttpActionResult AddStore(StoreDto store)
        
        {
            return Ok(StoreBL.AddStore(store));

        }
        [HttpPost]
        [Route("UpdateStore")]
        public IHttpActionResult UpdateStore(StoreDto store)

        {
            return Ok(StoreBL.UpdateStore(store));

        }
    }

//    api/store/getAllStores


}
