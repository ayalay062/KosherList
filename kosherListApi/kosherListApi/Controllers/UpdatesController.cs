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
        [Route("GetBadUpdatesOfStore/{code}")]
        public IHttpActionResult GetBadUpdatesOfStore(int code)
        {
            return Ok(UpdatesBL.GetBadUpdatesOfStore(code));
        }
        [HttpGet]
        [Route("getAllWorkerUpdates/{code}")]
        public IHttpActionResult getAllWorkerUpdates(int code)
        {
            return Ok(UpdatesBL.GetAllWorkerUpdates(code));
        }

        

        [HttpGet]
        [Route("GetWarningUpdatesOfStore/{code}")]
        public IHttpActionResult GetWarningUpdatesOfStore(int code)
        {
            return Ok(UpdatesBL.GetWarningUpdatesOfStore(code));
        }


        [HttpGet]
        [Route("getUpdatesById/{id}")]
        public IHttpActionResult getUpdatesById(int id)
        {
            return Ok(UpdatesBL.getUpdatesById(id));
        }

        

    [HttpPost]
        [Route("UpdateUpdate")]
        public IHttpActionResult UpdateUpdate(UpdatesDto Update)
        {
            return Ok(UpdatesBL.UpdateUpdate(Update));

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