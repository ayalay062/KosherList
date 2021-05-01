
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { WorkerSchedulerService } from '../WorkerScheduler.service';
import { Worker } from "../classes/Worker";
import { WorkerScheduler } from '../classes/workerScheduler';
import { StoreService } from '../store.service';
import { Store } from '../classes/Store';
import { AddEditEventComponent } from '../add-edit-event/add-edit-event.component';
import { MatDialog } from '@angular/material';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3', },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF', },
  yellow: {
    primary: '#e3bc08', secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-WorkerScheduler',
  templateUrl: './WorkerScheduler.component.html',
  styleUrls: ['./WorkerScheduler.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class WorkerSchedulerComponent {
  ngOnInit() {
    this.serviceStore.getStores().subscribe(x=>this.stores=x);
    this.userCurrent = <Worker>JSON.parse(localStorage.getItem("userCurrent"));
   this.getWorkerScheduler();
  }
  setEventModal(startDate?: Date) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: { startDate },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
   this.getWorkerScheduler();
    //TODO - function drawEvents
    });
  }
  getWorkerScheduler()
  {
    this.serviceSchedular.getWorkerSchedulerById(this.userCurrent.codeWorker).subscribe((x) => {
      this.scheduleDate = x;
      var curr = new Date; // get current date var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var firstDayDate = new Date(curr.setDate(first));
      firstDayDate= new Date(firstDayDate.getFullYear(),firstDayDate.getMonth(),firstDayDate.getDate(),0,0,0);
     // var firstday = firstDayDate.toUTCString();
      var i = 0;
      var curEventDate:Date;
      var hour: number = 0, startHour = 0;
      var storeId = this.scheduleDate[0].day1;
      console.log(this.scheduleDate);
      for (var d = 1; d < 8; d++) {
        curEventDate = addDays(firstDayDate, d -1);
        for (var h = 0; h < 24; h++) {
        storeId = this.scheduleDate[h]["day" + d];
          startHour = h;
          var countHours = 0;
          if (this.scheduleDate[h]["day" + d] != null) { countHours = 1; }
          while (storeId != null && h < 23 && this.scheduleDate[++h]["day" + d] == storeId) {
            console.log(h);

            countHours++;

            console.log(h);
          }

          if (countHours === 0 && storeId != null && h < 23) h--;
          else if (storeId != null) {
            //add event – Push to array events
            var startDateEvent = this.addHours(curEventDate, startHour);
            var endDateEvent = this.addHours(startDateEvent, countHours);
            this.events.push(
              {
                start: startDateEvent,
                end: endDateEvent,
                title: this.nameStoreById(storeId),
                color: colors.yellow,
                actions: this.actions
              });
            // this.addEvent1(storeId.toString(),startDateEvent,endDateEvent);
          }
        }
        this.refresh.next()
      }
    });
  }


  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  addHours(date:Date, h:number) {
    var datetime =new Date(date.getFullYear (), date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()) ;
    datetime.setTime(datetime.getTime() + (h * 60 * 60 * 1000));
    return datetime;
  }

nameStoreById(id:number)
{
  return this.stores.find(x=>x.codeStore===id).nameStore;
}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  userCurrent: Worker = new Worker();
  stores:Store[];
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [

    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  scheduleDate: WorkerScheduler[];

  // events.push()
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions,
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true,
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: addHours(new Date(), 2),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true,
  //     },
  //     draggable: true,
  //   },
  // ];

  activeDayIsOpen: boolean = true;

  constructor(public dialog: MatDialog,
    private modal: NgbModal, private serviceSchedular: WorkerSchedulerService,private serviceStore:StoreService) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd, }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  addEvent1(title, start, end): void {
    this.events = [
      ...this.events,
      {
        title: title,
        start:  startOfDay(start),
        end:  endOfDay(end),
        color: colors.yellow,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
