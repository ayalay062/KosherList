using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
using BLL.convertion;

namespace BLL.services
{
    public class WorkerBL
    {
        public static List<WorkerDto> GetAllWorkers()
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var worker = db.Worker_tbl.ToList();
                return WorkerConvertion.convertToListDto(worker);

            }
        }
        public static WorkerDto GetWorkerWithScheduler(int workerCode)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var worker = db.Worker_tbl.Include("WorkerScheduler_tbl").FirstOrDefault(x => x.codeWorker == workerCode);
                return WorkerConvertion.convertToDtoWithShceduler(worker);

            }
        }
        public static bool AddWorker(WorkerDto worker)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var newWorker = WorkerConvertion.convertToWorker(worker);
                for (int i = 0; i < 24; i++)
                {
                    newWorker.WorkerScheduler_tbl.Add(new WorkerScheduler_tbl() { hour = i });
                }
             
                db.Worker_tbl.Add(newWorker);            
                db.SaveChanges();
                return true;

            }
        }


        public static bool UpdateWorkerShcedule(WorkerDto worker)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var updatedWorker = db.Worker_tbl.FirstOrDefault(x => x.passwordWorker == worker.passwordWorker);
                updatedWorker.WorkerScheduler_tbl = WorkerSchedulerConvertion.convertToListWorkerScheduler(worker.WorkerScheduler_tbl);
                db.SaveChanges();
                return true;

            }
        }
        public static bool WorkerStore(WorkerDto worker)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updatedWorker = db.Worker_tbl.FirstOrDefault(x => x.codeWorker == worker.codeWorker);
                updatedWorker.nameWorker = worker.nameWorker;
                //TODO
                db.SaveChanges();
                return true;

            }
        }
        public static WorkerDto Login(WorkerDto worker)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var WorkerLogin = db.Worker_tbl.FirstOrDefault(x => x.passwordWorker == worker.passwordWorker && x.nameWorker == worker.nameWorker);
                if (WorkerLogin == null) return null;

                return WorkerConvertion.convertToDto(WorkerLogin);

            }
        }
    }
}
