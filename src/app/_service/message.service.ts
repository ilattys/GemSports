import { Injectable } from '@angular/core';
import { MessageService as PrimeMessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private primeMessage: PrimeMessageService) {}

  messages: string[] = [];

  add(severity: string, summary: string, detail: string): void {
    this.messages.push(`(${severity}) ${summary}: ${detail}`);
    this.primeMessage.add({severity, summary, detail});
  }

  clear(): void {
    this.messages = [];
    this.primeMessage.clear();
  }
}
