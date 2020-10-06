import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './timer.service';//Importo el servicio

@Component({
  selector: 'app-timer-none',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None

  /*
    Con el ChangeDetectionStrategy.OnPush le estamos diciendo al componente de Angular que no detecte cambios
    a menos que reciba un evento como el clcik a un botón, o que la referencia a un objeto cambie.
    Cuando hacemos onPush, Angular lo que hace es compara la posición en la pila y memoria. Si es la misma no lo contará
    como cambio, si lo dejamos como Default, Angular permitirá cambiar el objeto en memoria y por lo tanto detectará continuamente
    cambios. No obstante, podemos indicarle al componente de Angular que fuerce la detección de eventos cuando nosotros queramos
    utilizando ChangeDetectorRef.
  */

  /*
    Recibo el provider a nivel de módulo, ya que tenemos 3 timers.
    Si comentamos el provider de este componente y lo descomentamos de app.module, tendremos los tiempos iguales de inicio para cada componente,
    ya que todos los componentes del mismo módulo beberán de la misma instancia del provider TimerService.
  */
})

export class TimerNoneComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number;

  private countdownEndSubscription : Subscription = null;
  private countdownSubscription : Subscription = null;
  public countdown:number = 0;

  get progress(){
    return (this.init-this.countdown)/this.init*100;
  }
  
  constructor(public timer:TimerService, private changeDetectorRef:ChangeDetectorRef) { }
  /*
    Inyectamos el servicio al componente.
    Así conseguimos aplicar el Single Responsability Principle (S)OLID, este componente no tiene porqué saber como
    se están calculando los tiempos, únicamente tiene que iniciar o parar el timer, el cómo se hace lo recibe inyectado del servicio timer.
  */

  ngOnDestroy(): void {
    this.timer.destroy();
    this.countdownEndSubscription.unsubscribe();
    this.countdownSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.timer.restartCountdown(this.init);

    //subscribe() lo que hace es suscribirse a los cambios que nos devuelva un objeto observable.
    //Cuando éste devuelva cambios, entonces entraremos en el código que hay dentro de las llaves.
    //Es como hacer un async/await pero de un objeto observable que nosotros hayamos definido.
    this.timer.countdownEnd$.subscribe(()=>{
      //console.log("Countdown ended!!");
      this.onComplete.emit();//informamos al componente padre de que ya ha acabado la cuenta atrás
    });

    this.countdownSubscription = this.timer.countdown$.subscribe((data) =>{
      this.countdown = data;

      //Forzamos a que detecte cambios aquí, ya que es donde estamos recibiendo los valores del contador cada segundo.
      //En el momento en que recibimos un valor nuevo, le diremos al componente que actualice cambios y cuante este evento como válido.
      this.changeDetectorRef.markForCheck();
    })

  }

}
