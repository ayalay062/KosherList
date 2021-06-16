import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from "date-fns";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from "angular-calendar";
import { WorkerSchedulerService } from "../WorkerScheduler.service";
import { Worker } from "../classes/Worker";
import { WorkerScheduler } from "../classes/workerScheduler";
import { StoreService } from "../store.service";
import { WorkerService } from "../worker.service";
import { Store } from "../classes/Store";
import { AddEditEventComponent } from "../add-edit-event/add-edit-event.component";
import { MatDialog } from "@angular/material";

const colors: any = {
  red: { primary: "#ad2121", secondary: "#FAE3E3" },
  blue: { primary: "#1e90ff", secondary: "#D1E8FF" },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  selector: "app-all-workers-schedulers",
  templateUrl: "./all-workers-schedulers.component.html",
  styleUrls: ["./all-workers-schedulers.component.css"],
})
export class AllWorkersSchedulersComponent {
  workers: Worker[];
  workerId: number;
  ngOnInit() {
    this.serviceStore.getStores().subscribe((x) => (this.stores = x));
    this.workerService.getWorkers().subscribe((x) => {
      this.workers = x;
      this.workerId = this.workers[0].codeWorker;
      this.getWorkerScheduler();
    });
  }
  setEventModal(startDate?: Date) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: { startDate, workerCode: this.workerId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getWorkerScheduler();
      //TODO - function drawEvents
    });
  }
  getWorkerSchedulerId(id) {
    this.workerId = id;
    this.getWorkerScheduler();
  }
  //מילוי טבלת השיבוץ בזמנים ובחנויות המתאימים
  getWorkerScheduler() {
    this.serviceSchedular
      .getWorkerSchedulerById(this.workerId)
      .subscribe((x) => {
        this.events = [];
        this.scheduleDate = x;
        var curr = new Date();
        var first = curr.getDate() - curr.getDay();
        //יום ראשון
        var firstDayDate = new Date(curr.setDate(first));
        firstDayDate = new Date(
          firstDayDate.getFullYear(),
          firstDayDate.getMonth(),
          firstDayDate.getDate(),
          0,
          0,
          0
        );

        var curEventDate: Date;
        var startHour = 0;
        var storeId = this.scheduleDate[0].day1;
        //מעבר על כל ימות השבוע -עמודות
        for (var d = 1; d < 8; d++) {
          curEventDate = addDays(firstDayDate, d - 1);
          //מעבר על השעות בכל יום - שורות
          for (var h = 0; h < 24; h++) {
            storeId = this.scheduleDate[h]["day" + d];
            startHour = h;
            var countHours = 0;
            // אם יש שיבוץ בשעה הנוכחית
            if (this.scheduleDate[h]["day" + d] != null) {
              countHours = 1;
            }
            // בדיקה כל עוד יש שיבוץ זהה בשעות הבאות
            while (
              storeId != null &&
              h < 23 &&
              this.scheduleDate[++h]["day" + d] == storeId
            ) {
              countHours++;
            }

            if (countHours === 0 && storeId != null && h < 23) h--;
            //אם היה שיבוץ של חנות
            else if (storeId != null) {
              //הוספת ארוע- שיבוץ בלוח
              var startDateEvent = this.addHours(curEventDate, startHour);

              this.events.push({
                start: addHours(startOfDay(curEventDate), startHour),
                end: addHours(
                  startOfDay(startDateEvent),
                  startHour + countHours
                ),
                title: this.nameStoreById(storeId),
                color: colors.red,
                actions: this.actions,
              });
            }
          }
          this.refresh.next();
        }
      });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  addHours(date: Date, h: number) {
    var datetime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    );
    datetime.setTime(datetime.getTime() + h * 60 * 60 * 1000);
    return datetime;
  }

  nameStoreById(id: number) {
    return this.stores.find((x) => x.codeStore === id).nameStore;
  }

  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;
  userCurrent: Worker = new Worker();
  stores: Store[];
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
      a11yLabel: "Edit",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent("Edited", event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: "Delete",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent("Deleted", event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  scheduleDate: WorkerScheduler[];

  activeDayIsOpen: boolean = true;

  constructor(
    public dialog: MatDialog,
    private modal: NgbModal,
    private serviceSchedular: WorkerSchedulerService,
    private serviceStore: StoreService,
    private workerService: WorkerService
  ) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
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
    this.handleEvent("Dropped or resized", event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: "lg" });
  }

  addEvent1(title, start, end): void {
    this.events = [
      ...this.events,
      {
        title: title,
        start: startOfDay(start),
        end: endOfDay(end),
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
