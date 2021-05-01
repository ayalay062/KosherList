using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BLL.services;
using DTO;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;



namespace kosherListApi.Controllers
{
    [RoutePrefix("api/Updates")]

    public class UpdatesController : ApiController
    {
        [HttpGet]
        [Route("getAllUpdates")]
        public IHttpActionResult getAllUpdates()
        {
            return Ok(UpdatesBL.GetAllUpdates());
        }

        [HttpGet]
        [Route("GetBadUpdates")]
        public IHttpActionResult GetBadUpdates()
        {
            return Ok(UpdatesBL.GetBadUpdates());
        }

        



        [HttpGet]
        [Route("getUpdatesById/{id}")]
        public IHttpActionResult getUpdatesById(int id)
        {
            return Ok(UpdatesBL.getUpdatesById(id));
        }

        

        

        [HttpPost]
        [Route("AddUpdate")]
        public IHttpActionResult AddUpdate(UpdatesDto Update)
        {
            return Ok(UpdatesBL.AddUpdate(Update));

        }
    }

    //    api/Updates/getAllUpdates

}