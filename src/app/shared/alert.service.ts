import { Injectable } from '@angular/core';

import { Alert } from './alert.model';

import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();

  constructor() { }

  listen() {
    return this.subject.asObservable();
  }

  private broadcast(alert: Alert) {
    this.subject.next(alert);
  }

  showSuccess(header: string, message: string) {
    this.broadcast({header: header, message: message, type: 'success'});
  }

  showInfo(header: string, message: string) {
    this.broadcast({header: header, message: message, type: 'info'});
  }

  showWarning(header: string, message: string) {
    this.broadcast({header: header, message: message, type: 'warning'});
  }

  showFailure(header: string, message: string) {
    this.broadcast({header: header, message: message, type: 'error'});
  }

}
