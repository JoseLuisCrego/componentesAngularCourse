import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, OnDestroy, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges{

  @Input() init:number = null;

  //Los output --> EventEmitter permiten enviar información desde componentes hijo a padre.
  @Output() onDecrease = new EventEmitter<number>(); //number es el tipo que vamos a emitir desde este evento
  @Output() onComplete = new EventEmitter<void>(); //como este evento es void, no devolveremos nada

  public counter:number = 0;
  private countdownTimerRef:any = null;

  constructor() { }

  ngOnChanges(changes): void {   
    //changes es un objeto con las mismas propiedades que nuestros inputs, en este caso, accedemos a nuestro init 
    if(changes.init.previousValue !== changes.init.currentValue){
      console.log("Valor anterior: " + changes.init.previousValue + ". Valor actual: " + changes.init.currentValue);
      console.log("Se ha reiniciado el contador a " + changes.init.currentValue + " segundos.");
    }
    
    //Reiniciamos el contador al cambiar el valor del input en la vista
    this.startCountdown();
  }

  ngOnDestroy(): void {
    //Esto hace que cuando el componente se elimine, por ejemplo, porque navegamos a otra página del sitio web,
    //se elimine el contador y no tengamos problemas de memory leak a la larga.
    this.clearTimeout();
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown(){
    if(this.init && this.init > 0){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    this.countdownTimerRef = setTimeout(() => {
      this.counter = this.counter-1;
      this.processCountDown();
    }, 1000);
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  processCountDown(){

    this.onDecrease.emit(this.counter);//devolvemos el contador
    console.log("Count is ", this.counter);

    if(this.counter == 0){
      this.onComplete.emit();
    }else{
      this.doCountdown();
    }

  }

}
