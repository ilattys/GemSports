import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) { }

  submitCoachForm(name: string, email: string, phone: string, address: string, previousAddress: string, status: string,
                  occupation: string, experience: string, history: string, backgroundAuth: any): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/mqkwlayv',
      { 'form': 'Coach Form', name, email, phone, address, previousAddress, status, occupation, experience, history, backgroundAuth },
      { headers }).subscribe(
      response => {
        console.log(response);
        this.log('success', 'Email Successfully Sent');
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      }
    );
  }

  submitPlayerForm(name: string, grade: string, age: string, school: string, jerseySize: string,
                   parentsName: string, parentsEmail: string, phoneNo: string): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/mvodpajl',
      { 'form': 'Player Form', name, grade, age, school, jerseySize, parentsName, parentsEmail, phoneNo },
      { headers }).subscribe(
      response => {
        console.log(response);
        this.log('success', 'Registration Form Submitted');
      }, error => {
        console.warn(error.responseText);
        console.log({error});
      }
    );
  }
  private log(severity: string, details: string): void {
    this.messageService.add(severity, 'Gem Sports Club', details);
  }
}
