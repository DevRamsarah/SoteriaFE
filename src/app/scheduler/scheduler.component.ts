import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { SchedulerService } from 'src/services/scheduler/scheduler.service';
import { element } from 'protractor';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
}; @Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
    description: string;
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

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },

    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal, public firebaseCrud: SchedulerService) { }

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
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {
      event,
      action,
      description: "Dev"
    };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
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
  ngOnInit(): void {
    this.firebaseCrud.getScheduler().subscribe((schedule: any) => {
      console.log(schedule);
      schedule.forEach(doc => {
        let dummyE = new Date(doc.end)
        let dummyS = new Date(doc.start)

        let dummyC = colors.red
        let dummyA = this.actions
        let  data = {...doc,end:dummyE,start:dummyS,color:dummyC,actions:dummyA}
        this.events.push(data)
        console.log(data);
        
      })
    })
setTimeout(() => {
  this.refresh.next()
}, 2000);
setTimeout(() => {
  this.refresh.next()
}, 3000);
    console.log(this.events);
    
  }

}
