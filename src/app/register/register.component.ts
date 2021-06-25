import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_service/home.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  experienceYears = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];
  maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
  grades = ['7th', '8th', '9th'];
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  coach: boolean;
  player: boolean;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.coach = false;
    this.player = false;
  }

  onSubmitCoachForm(name: string, email: string, phone: string, address: string, pAddress: string, status: string, occupation: string, experience: string, history: string, auth: any): void {
    this.homeService.submitCoachForm(name, email, phone, address,
      pAddress, status, occupation, experience, history, auth);
    this.coach = false;
  }

  openCoachForm(): void {
    this.coach = true;
    this.player = false;
  }

  openPlayerForm(): void {
    this.player = true;
    this.coach = false;
  }

  onSubmitPlayerForm(name: string, grade: string, age: string, school: string, jersey: string, pName: string, pEmail: string, phone: string): void {
    this.homeService.submitPlayerForm(name, grade, age, school, jersey, pName, pEmail, phone);
    this.player = false;
  }
}
