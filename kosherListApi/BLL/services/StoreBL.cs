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
    public class StoreBL
    {

        public static List<StoreDto> GetAllStores()
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var stores = db.Store_tbl.ToList();
                return StoreConvertion.convertToListDto(stores);

            }

        }
        public static StoreDto GetStoreByCode(int code)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var store = db.Store_tbl.FirstOrDefault(x => x.codeStore == code);
                return StoreConvertion.convertToDto(store);

            }

        }
        public static bool AddStore(StoreDto store)
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var newStore = StoreConvertion.convertToStore(store);
                db.Store_tbl.Add(newStore);
                db.SaveChanges();
                return true;

            }
        }
        //שליפה של החנויות הבעייתיות ב30 יום האחרונים
        public static List<StoreDto> GetBadStores()
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var last30Date = DateTime.Now.AddDays(-30);
                //שליפת החנויות שיש להן 2 עדכונים או יותר גרועים ב30 יום האחרונים
                var updates = db.Updates_tbl.Where(x => x.dateVisit >= last30Date
                && x.result == 3
                ).GroupBy(x => new { codeStore = x.codeStore, result = x.result })
                .Select(x => new { codeStore = x.Key.codeStore, result = x.Count() }).Where(y => y.result >= 2).ToList();
                var storesIds = updates.Select(x => x.codeStore);
                var stores = db.Store_tbl.Where(x => storesIds.Contains(x.codeStore)).ToList();
                var storesDto = StoreConvertion.convertToListDto(stores);
                foreach (var store in storesDto)
                {
                    store.countResultInfo = updates.FirstOrDefault(x => x.codeStore == store.codeStore).result;
                }

                return storesDto.OrderByDescending(x => x.countResultInfo).ToList();

            }
        }


        public static List<StoreDto> GetWarningStores()
        {
            using (KosherListEntities db = new KosherListEntities())
            {
                var last30Date = DateTime.Now.AddDays(-30);
                var updates = db.Updates_tbl.Where(x => x.dateVisit >= last30Date
                && x.result == 2
                ).GroupBy(x => new { codeStore = x.codeStore, result = x.result })
                .Select(x => new { codeStore = x.Key.codeStore, result = x.Count() }).Where(y => y.result >= 2).ToList();
                var storesIds = updates.Select(x => x.codeStore);
                var stores = db.Store_tbl.Where(x => storesIds.Contains(x.codeStore)).ToList();
                var storesDto = StoreConvertion.convertToListDto(stores);
                foreach (var store in storesDto)
                {
                    store.countResultInfo = updates.FirstOrDefault(x => x.codeStore == store.codeStore).result;
                }

                return storesDto.OrderByDescending(x => x.countResultInfo).ToList();

            }
        }



        public static bool UpdateStore(StoreDto store)
        {
            using (KosherListEntities db = new KosherListEntities())
            {

                var updatedStore = db.Store_tbl.FirstOrDefault(x => x.codeStore == store.codeStore);
                updatedStore.nameStore = store.nameStore;
                updatedStore.activityTimeEnd = store.activityTimeEnd;
                updatedStore.activityTimeStart = store.activityTimeStart;
                updatedStore.addressStore = store.addressStore;
                updatedStore.clasificationStore = store.clasificationStore;
                updatedStore.nameStore = store.nameStore;
                db.SaveChanges();
                return true;

            }
        }
    }
}
