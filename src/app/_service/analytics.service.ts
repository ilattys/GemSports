import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject, timer} from 'rxjs';

export class Session {
  public id: string;
  public duration: number;
  public pagesVisited: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements OnDestroy{

  private session: Session;
  public sessionSummary: BehaviorSubject<Session>;

  // session = new Session();
  timePassed: number;
  interval;

  constructor() {
    debugger
    this.session = new Session();
    this.sessionSummary = new BehaviorSubject<Session>(null);
    this.session.id = localStorage.getItem('sessionId');
  }

  initializeSession(): void {
    debugger
    this.startTimer();

    // new session
    if (this.session.id === null || this.session.id === undefined) {
      this.session.id = this.generateSessionId();
      localStorage.setItem('sessionId', this.session.id);
    }
    // current user session
    else {
      this.session.id = localStorage.getItem('sessionId');
    }
  }

  generateSessionId(): string {
    return 'S' + Math.random().toString(36).substr(2, 9);
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      this.timePassed++;
    }, 1000);
  }

  pauseTimer(): void {
    clearInterval(this.interval);
  }

  ngOnDestroy(): void {
    this.timePassed = 0;
    debugger
  }

}
