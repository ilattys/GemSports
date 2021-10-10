import {Component, OnDestroy} from '@angular/core';
import {HomeService} from './_service/home.service';
import {AnalyticsService} from './_service/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GemSports';

  // constructor(private analytics: AnalyticsService){
  //   debugger
  //   this.analytics.initializeSession();
  // }
}
