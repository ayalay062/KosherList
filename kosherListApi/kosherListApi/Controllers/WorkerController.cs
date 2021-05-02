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
    [RoutePrefix("api/worker")]
    public class WorkerController : ApiController
    {
        [HttpGet]
        [Route("getAllWorkers")]
        public IHttpActionResult getAllWorkers()
        {
            return Ok(WorkerBL.GetAllWorkers());

        }
        [HttpPost]
        [Route("AddWorker")]
        public IHttpActionResult AddWorker(WorkerDto worker)
        {
            return Ok(WorkerBL.AddWorker(worker));

        }
        [HttpGet]
        [Route("GetWorkerByCode/{code}")]
        public IHttpActionResult GetWorkerByCode(int code)
        {
            return Ok(WorkerBL.GetWorkerByCode(code));

        }

        [HttpPost]
        [Route("UpdateWorkerShcedule")]
        public IHttpActionResult UpdateWorkerShcedule(WorkerDto worker)
        {
            return Ok(WorkerBL.UpdateWorkerShcedule(worker));

        }

        [HttpPost]
        [Route("UpdateWorker")]
        public IHttpActionResult UpdateWorker(WorkerDto worker)
        {
            return Ok(WorkerBL.UpdateWorker(worker));

        }

        
        [HttpGet]
        [Route("GetWorkerWithScheduler/{workerCode}")]
        public IHttpActionResult GetWorkerWithScheduler(int workerCode)
        {
            return Ok(WorkerBL.GetWorkerWithScheduler(workerCode));

        }

        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(WorkerDto worker)
        {
            var workerRes = WorkerBL.Login(worker);
            if (workerRes == null)
            {
                return Ok(UsersBL.Login(worker.nameWorker, worker.passwordWorker));
            }
            return Ok(workerRes);

        }
    }
}







//    api/store/getAllStores



