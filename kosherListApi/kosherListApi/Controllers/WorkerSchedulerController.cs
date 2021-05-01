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
    [RoutePrefix("api/WorkerScheduler")]
    public class WorkerSchedulerController: ApiController
    {
            [HttpGet]
            [Route("getAllWorkerScheduler")]
            public IHttpActionResult getAllWorkerScheduler()
            {
                return Ok(WorkerSchedulerBL.GetAllWorkerScheduler());

            }

            [HttpPost]
            [Route("AddWorkerScheduler")]
            public IHttpActionResult AddWorkerScheduler(WorkerSchedulerDto WorkerScheduler)

            {
                return Ok(WorkerSchedulerBL.AddWorkerScheduler(WorkerScheduler));

            }

        [HttpGet]
        [Route("getWorkerSchedulerById/{id}")]
        public IHttpActionResult getWorkerSchedulerById(int id)
        {
            return Ok(WorkerSchedulerBL.getWorkerSchedulerById(id));
        }

        [HttpPost]
        [Route("setWorkerScheduler")]
        public IHttpActionResult setWorkerScheduler(WorkerSchedulerRequest wsRequest)
        {
            return Ok(WorkerSchedulerBL.setWorkerScheduler(wsRequest.workerId, wsRequest.codeStore, wsRequest.day,wsRequest.hourEnd,wsRequest.hourStart));
        }
    }
    public class WorkerSchedulerRequest {
        public int workerId { get; set; }
        public int codeStore { get; set; }
        public int day { get; set; }
        public int hourEnd { get; set; }
        public int hourStart { get; set; }
    }
    //    api/store/getAllWorkerScheduler


}
