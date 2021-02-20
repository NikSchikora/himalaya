import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-weekly',
  templateUrl: './dashboard-weekly.component.html',
  styleUrls: ['./dashboard-weekly.component.css'],
})
export class DashboardWeeklyComponent implements OnInit {
  public name: string = 'Max Mustermann';
  public date: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
