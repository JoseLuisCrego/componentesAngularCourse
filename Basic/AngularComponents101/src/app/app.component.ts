import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  counterProgress : number = 0;
  totalCountdown : number = 15;

  constructor() { }

  updateProgress($event){
    //progreso en porcentaje del progreso que llevamos
    //$event es el valor number que recibimos en el html (onDecrease)="updateProgress($event)"
    this.counterProgress = (this.totalCountdown - $event) / this.totalCountdown * 100;
  }

  countdownFinished(){
    console.log("Countdown has finished!");
  }

}
