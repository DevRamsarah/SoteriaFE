import { Component, OnInit } from '@angular/core';
import { addDays } from '@progress/kendo-date-math';
import { addWeeks } from '@progress/kendo-date-math';
import { addMonths } from '@progress/kendo-date-math';
import { convertToCSV } from '../../app/utils/generateCSV';
// import { ClientService } from 'src/services/client/client.service';
import Swal from 'sweetalert2';
import { InvoiceService } from 'src/services/invoice/invoice.service';

const date = new Date();
var day = addDays(date, -1);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  error = false;
  _loading: boolean = false;

  constructor(private reportService: InvoiceService) { }

  firstDay = new Date(); //returns first date of the month, `2000-11-1`
  weekly = (this.firstDay = addDays(date, -7));

  public range = { start: day, end: day };

  public changeWeek(x: any): void {
    this.range = { start: addWeeks(day, -x), end: day };
  }
  public changeMonth(y: any): void {
    this.range = { start: addMonths(day, -y), end: day };
  }

  generate_csv() {
    let arrguard = []
    this.error = false;
    this._loading = true;
    if (this.range.start.getTime() != this.range.end.getTime()) {
      this.range.start.setHours(this.range.start.getHours() + 4);
      this.range.end.setHours(this.range.end.getHours() + 4);
      var from =
        this.range.start.toISOString().substr(0, 10) + ' ' + '00:00:00';
      var to = this.range.end.toISOString().substr(0, 10) + ' ' + '00:00:00';
    } else {
      var from =
        this.range.start.toISOString().substr(0, 10) + ' ' + '00:00:00';
      var to = this.range.end.toISOString().substr(0, 10) + ' ' + '00:00:00';
    }
    Date.prototype.addHours = function (h) {
      this.setHours(this.getHours() + h);
      return this;
    }

    this.reportService.getStats(from, to).subscribe(
      (data: any) => {
        let reports = data;
        this._loading = false;
        // console.log(reports)

        Date.prototype.subHours = function (h) {
          this.setHours(this.getHours() - h);
          return this;
        }
        if (reports.length > 0) {
          let r3 = reports.filter(function (pilot) {
            let minDate = new Date(from.split(" 00:00:00")[0]);
            let maxDate = new Date(to.split(" 00:00:00")[0]);
            let c = new Date(pilot.Currentdate);
            minDate.addHours(20)
            maxDate.addHours(20)
            c.subHours(4)
   



            if (c >= minDate && c <= maxDate) {
              return pilot;
            }

          });
          let r2 = r3.map((r) => ({
            'Date': r.Currentdate,
            'Title': r.Title,
            'Client Name': r.Clientid,
            'Post Site': r.PostSiteid,
            'Address': r.Summary,
            'Guard': r.ArrayGuard.map((a) => {
              let arr = []
              arr.push(a.name)
              return arr
            }),
            'Amount': r.total,
            'Start': r.arrayDes.map((a) => {
              return (new Date(a.start.seconds * 1000).toISOString().split('T')[0])
            }),
            'End': r.arrayDes.map((a) => {
              return (new Date(a.end.seconds * 1000).toISOString().split('T')[0])
            })
            ,
          }

          ));
try {
  
  convertToCSV(r2, `${new Date(from).addHours(28).toISOString().split('T')[0]} to ${new Date(to).addHours(28).toISOString().split('T')[0]}.csv`);
} catch (error) {
  Swal.fire("No record found, Please try another range", '', 'error')
}
        } else {
          this.error = true;
        }
      },
      (err) => {
        Swal.fire(err.message, '', 'error')
        this._loading = false;
      }
    );
  }

  min = new Date('1/1/2015');

  max = addMonths(date, 3);

  ngOnInit(): void {
    // const {total_num_bookings,total_num_users,total_num_bookings_pending,total_num_bookings_approved,total_num_bookings_rejected} = data[0];
    // this.totalBookingsToday =total_num_bookings ;
    // this.totalUsers = total_num_users;
    // this.bookings_status.push({name:"Rejected",y:+total_num_bookings_rejected})
    // this.bookings_status.push({name:"Approved",y:+total_num_bookings_approved})
    // this.bookings_status.push({name:"Pending",y:+total_num_bookings_pending})
    // this.bookings_week = data[1]
    // this._loading=false;
  }
}
