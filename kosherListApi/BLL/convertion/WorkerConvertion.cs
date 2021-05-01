using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BLL.convertion
{
   public class WorkerConvertion
    {
        //המרה מDB
        public static WorkerDto convertToDto(Worker_tbl w)
        {
            WorkerDto newWorker = new WorkerDto();
            newWorker.addressWorker= w.addressWorker;
            newWorker.codeWorker = w.codeWorker;
            newWorker.dateStart = w.dateStart;
            newWorker.email = w.email;
            newWorker.experience = w.experience;
            newWorker.mobility = w.mobility;
            newWorker.nameWorker = w.nameWorker;
            newWorker.telWorker = w.telWorker;
            newWorker.passwordWorker = w.passwordWorker;

            return newWorker;
        }
        public static WorkerDto convertToDtoWithShceduler(Worker_tbl w)
        {
            WorkerDto newWorker = new WorkerDto();
            newWorker.addressWorker = w.addressWorker;
            newWorker.codeWorker = w.codeWorker;
            newWorker.dateStart = w.dateStart;
            newWorker.email = w.email;
            newWorker.experience = w.experience;
            newWorker.mobility = w.mobility;
            newWorker.passwordWorker = w.passwordWorker;
            newWorker.nameWorker = w.nameWorker;
            newWorker.telWorker = w.telWorker;
            newWorker.WorkerScheduler_tbl = w.WorkerScheduler_tbl==null? null: WorkerSchedulerConvertion.convertToListDto(w.WorkerScheduler_tbl.ToList());
            return newWorker;
        }
        
        public static List<WorkerDto> convertToListDto(List<Worker_tbl> w)
        {
            List<WorkerDto> newWorker = new List<WorkerDto>();
            w.ForEach(x =>
            {
                newWorker.Add(convertToDto(x));
            });
            return newWorker;
        }
        public static List<Worker_tbl> convertToListStore(List<WorkerDto> w)
        {
            List<Worker_tbl> newWorker = new List<Worker_tbl>();
            w.ForEach(x =>
            {
                newWorker.Add(convertToWorker(x));
            });
            return newWorker;
        }
        //המרה לDB
        public static Worker_tbl convertToWorker(WorkerDto w)
        {
            Worker_tbl newWorker = new Worker_tbl();
            newWorker.addressWorker = w.addressWorker;
            newWorker.codeWorker = w.codeWorker;
            newWorker.dateStart = w.dateStart;
            newWorker.email = w.email;
            newWorker.experience = w.experience;
            newWorker.mobility = w.mobility;
            newWorker.passwordWorker = w.passwordWorker;
            newWorker.nameWorker = w.nameWorker;
            newWorker.telWorker = w.telWorker;
            return newWorker;
        }
    }
}
