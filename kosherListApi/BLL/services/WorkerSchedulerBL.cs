using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.convertion;

namespace BLL.services
{
    public class WorkerSchedulerBL
    {
        public static List<WorkerSchedulerDto> GetAllWorkerScheduler()
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var WorkerSchedulers = db.WorkerScheduler_tbl.ToList();
                return WorkerSchedulerConvertion.convertToListDto(WorkerSchedulers);

            }

        }
        public static List<WorkerSchedulerDto> getWorkerSchedulerById(int id)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var WorkerSchedulerById = db.WorkerScheduler_tbl.Where(x => x.workerId== id).ToList();
                if (WorkerSchedulerById == null) return null;

                return WorkerSchedulerConvertion.convertToListDto(WorkerSchedulerById);

            }
        }
        public static bool AddWorkerScheduler(WorkerSchedulerDto WorkerScheduler)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var newWorkerScheduler = WorkerSchedulerConvertion.convertToWorkerScheduler(WorkerScheduler);
                db.WorkerScheduler_tbl.Add(newWorkerScheduler);
                db.SaveChanges();
                return true;

            }
        }
        //עדכון שיבוץ יומן למשגיח
        public static bool setWorkerScheduler(int workerId, int codeStore, int day,int  hourEnd,int hourStart)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var countHourse = hourEnd - hourStart;
                //מעבר על 24 שעות ועדכון של שעה + יום בשבוע רלוונטי
                for (; hourStart < hourEnd; hourStart++)
                {
                    var scheduleHour = db.WorkerScheduler_tbl.FirstOrDefault(x => x.workerId == workerId && x.hour == hourStart);
                   //בדיקה של יום 
                    switch (day)
                    {
                        case 1:
                            scheduleHour.day1 = codeStore;
                            break;
                        case 2:
                            scheduleHour.day2 = codeStore;
                            break;
                        case 3:
                            scheduleHour.day3 = codeStore;
                            break;
                        case 4:
                            scheduleHour.day4 = codeStore;
                            break;
                        case 5:
                            scheduleHour.day5 = codeStore;
                            break;
                        case 6:
                            scheduleHour.day6 = codeStore;
                            break;
                        case 7:
                            scheduleHour.day7 = codeStore;
                            break;
                  
                    }
                    db.SaveChanges();
                }
            }
            return true;
        }

        public static bool UpdateWorkerScheduler(WorkerSchedulerDto WorkerScheduler)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updatedWorkerScheduler = db.WorkerScheduler_tbl.FirstOrDefault(x => x.workerSchedulerID == WorkerScheduler.workerSchedulerID);
                updatedWorkerScheduler.day1 = WorkerScheduler.day1;
                updatedWorkerScheduler.day2 = WorkerScheduler.day2;
                updatedWorkerScheduler.day3 = WorkerScheduler.day3;
                updatedWorkerScheduler.day4 = WorkerScheduler.day4;
                updatedWorkerScheduler.day5 = WorkerScheduler.day5;
                updatedWorkerScheduler.day6 = WorkerScheduler.day6;
                updatedWorkerScheduler.day7 = WorkerScheduler.day7;
                db.SaveChanges();
                return true;

            }
        }
    }
}
