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

        public static List<StoreDto> GetBadUpdates()
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updates = db.Updates_tbl.Where(x => x.dateVisit >= DateTime.Now.AddDays(-30)
                && x.result ==3
                ).GroupBy(x => new { codeStore= x.codeStore, result= x.result })
                .Select(x => new { codeStore = x.Key.codeStore, result = x.Count()}).Where(y=>y.result >= 2).ToList();
                var storesIds = updates.Select(x => x.codeStore);
                var stores = db.Store_tbl.Where(x => storesIds.Contains(x.codeStore)).ToList();
                var storesDto = StoreConvertion.convertToListDto(stores);
                foreach (var store in storesDto)
                {
                    store.countResultInfo = updates.FirstOrDefault(x => x.codeStore == store.codeStore).result;
                }

                return storesDto.OrderByDescending(x=>x.countResultInfo).ToList();

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
