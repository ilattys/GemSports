import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_service/home.service';
import { CoachForm } from '../_model/coach-form';
import { PlayerForm } from '../_model/player-form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: CoachForm;
  playerModel: PlayerForm;
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
    this.model = new CoachForm();
    this.playerModel = new PlayerForm();
  }

  onSubmitCoachForm(model): void {
    this.homeService.submitCoachForm(model);
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

  onSubmitPlayerForm(playerModel): void {
    this.homeService.submitPlayerForm(playerModel);
    this.player = false;
  }
}
