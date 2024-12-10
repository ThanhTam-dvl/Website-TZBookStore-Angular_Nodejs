import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None // Không ảnh hưởng tới Angular global CSS
})
export class DashboardComponent {

}
