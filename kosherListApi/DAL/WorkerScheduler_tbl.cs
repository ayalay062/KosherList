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
    
    public partial class WorkerScheduler_tbl
    {
        public int workerSchedulerID { get; set; }
        public int workerId { get; set; }
        public int hour { get; set; }
        public Nullable<int> day1 { get; set; }
        public Nullable<int> day2 { get; set; }
        public Nullable<int> day3 { get; set; }
        public Nullable<int> day4 { get; set; }
        public Nullable<int> day5 { get; set; }
        public Nullable<int> day6 { get; set; }
        public Nullable<int> day7 { get; set; }
    
        public virtual Worker_tbl Worker_tbl { get; set; }
    }
}
