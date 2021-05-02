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
    public class UpdatesBL
    {
        public static List<UpdatesDto> GetAllUpdates()
        {
            using (KosherListEntities db = new KosherListEntities())
            {


                var updates = db.Updates_tbl.ToList();
                return UpdatesConvertion.convertToListDto(updates);

            }
        }
        public static List<UpdatesDto> GetAllWorkerUpdates(int code)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var last30Date = DateTime.Now.AddDays(-30);
                var updates = db.Updates_tbl.Include("Store_tbl").Where(x=>x.codeWorker == code
                && x.dateVisit >= last30Date).ToList();
                return UpdatesConvertion.convertToListDto(updates);

            }
        }
        

        public static bool UpdateUpdate(UpdatesDto update)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updatedUpdate = db.Updates_tbl.FirstOrDefault(x => x.updatesId == update.updatesId);
                updatedUpdate.begginingTime = update.begginingTime;
                updatedUpdate.codeStore = update.codeStore;
                updatedUpdate.codeWorker = update.codeWorker;
                updatedUpdate.dateVisit = update.dateVisit;
                updatedUpdate.exitingTime = update.exitingTime;
                updatedUpdate.remarks = update.remarks;
                updatedUpdate.result = update.result;
                db.SaveChanges();
                return true;

            }
        }
        public static bool AddUpdate(UpdatesDto update)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var newUpdate = UpdatesConvertion.convertToUpdates(update);
                db.Updates_tbl.Add(newUpdate);
                db.SaveChanges();
                return true;

            }
        }

        public static bool UpdateUpdates(UpdatesDto updates)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updatedUpdates = db.Updates_tbl.FirstOrDefault(x => x.updatesId == updates.updatesId);
               // updatedUpdates.nameUpdates = updates.nameUpdate;
                //TODO
                db.SaveChanges();
                return true;

            }
        }

        public static List<UpdatesDto> GetBadUpdatesOfStore(int codeStore)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var last30Date = DateTime.Now.AddDays(-30);
                var updates = db.Updates_tbl.Where(x => x.dateVisit >= last30Date
                && x.result == 3 && x.codeStore == codeStore).OrderByDescending(x => x.dateVisit).ToList();

                return UpdatesConvertion.convertToListDto(updates);

            }
        }


        public static List<UpdatesDto> GetWarningUpdatesOfStore(int codeStore)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var last30Date = DateTime.Now.AddDays(-30);
                var updates = db.Updates_tbl.Where(x => x.dateVisit >= last30Date
                && x.result == 2 && x.codeStore == codeStore).OrderByDescending(x => x.dateVisit).ToList();

                return UpdatesConvertion.convertToListDto(updates);

            }
        }

        public static UpdatesDto getUpdatesById(int update)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updateById = db.Updates_tbl.FirstOrDefault(x => x.updatesId == update);
                if (updateById == null) return null;

                return UpdatesConvertion.convertToDto(updateById);

            }
        }
    }
}
