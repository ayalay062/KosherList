//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Worker_tbl
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Worker_tbl()
        {
            this.Updates_tbl = new HashSet<Updates_tbl>();
            this.WorkerScheduler_tbl = new HashSet<WorkerScheduler_tbl>();
        }
    
        public int codeWorker { get; set; }
        public string nameWorker { get; set; }
        public string addressWorker { get; set; }
        public string telWorker { get; set; }
        public Nullable<int> experience { get; set; }
        public Nullable<System.DateTime> dateStart { get; set; }
        public string email { get; set; }
        public Nullable<bool> mobility { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Updates_tbl> Updates_tbl { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<WorkerScheduler_tbl> WorkerScheduler_tbl { get; set; }
    }
}
