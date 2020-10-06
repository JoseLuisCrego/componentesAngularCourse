import { Injectable, Input } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
/*
Un injectable es en tipo de clase que puede ser inyectado a un módulo o componente.
- Los servicios son Singleton. Si necesitamos un servicio para usar desde varios componentes, tiene sentido pasar a modo de provider en el módulo 
    en que estemos trabajando, ya que todos los componentes del módulo compartirán esta estancia única.
- Si queremos trabajar únicamente con un servicio en un componente determinado, lo normal es que pasemos como provider en única.
- De este modo, estamos informando a Angular sobre cuándo vamos a necesitar que éste instancie el provider (servicio), pqara tenerlo disponible.
*/

@Injectable()
export class TimerService {
    
    private countdownTimerRef:any = null;
    private init:number = 0;

    private countdownEndSource = new Subject<void>();//http://reactivex.io/rxjs
    public countdownEnd$ = this.countdownEndSource.asObservable();
    /*  Un Subject es un objeto Observable que es capaz de manejar múltiples suscripciones y emitir eventos.
        Queremos que el timer cree evento, pero no que el componente en el que lo inyectamos pueda hacerlo, por lo tanto,
            sólo le daremos acceso al observable, para que espere respuestas del servicio, pero no emita eventos.
        Para ello creamos countdownEnd$, que es donde se suscribe el componente y desde donde esperará cambios.

        countdownEndSource --> se encarga de CREAR eventos.
        countdownEnd$ --> se encarga de EMITIR eventos creados por countdownEndSource al componente suscrito a éste.
    */

    private countdownSource = new BehaviorSubject<number>(0);
    public countdown$ = this.countdownSource.asObservable();
    /*
        Un BehaviorSubject es igual que un Subject, salvo que siempre tendrá un valor asignado, por eso lo incializamos con un 0.
        Además, podemos obtener su valor actual cuando llamamos a next(), y podemos acceder a su valor actual en cualquier momento.
    */

    public paused:boolean = true;

    constructor(){}

    destroy():void{
        this.clearTimeout();
    }
    
    restartCountdown(init?: number){
        if(init)
            this.init = init;

        if(this.init && this.init >0){
            this.paused = true;
            this.clearTimeout();
            this.countdownSource.next(this.init);
        }
    }

    toogleCountdown(){
        this.paused = !this.paused;
        if(!this.paused){
            this.doCountdown();
        }else{
            this.clearTimeout();
        }
    }

    private doCountdown(){
        this.countdownTimerRef = setTimeout(()=>{
            this.countdownSource.next(this.countdownSource.getValue()-1);
            this.processCountdown();
        }, 1000);
    }

    private processCountdown(){
        if(this.countdownSource.getValue() <= 0){
            this.countdownEndSource.next();
            /*
                Con next() emitimos el evento.
                Podríamos meter dentro de next() un valor como parámetro y le llegaría al componente que está observando.
                En este caso, como únicamente queremos emitir una "señal" conforme la cuenta atrás ha terminado, es decir,
                enviar un eventos al componente, no escribiremos ningún parámetro.
            */
        }else{
            this.doCountdown();
        }
    }

    private clearTimeout(){
        if(this.countdownTimerRef){
            clearTimeout(this.countdownTimerRef);
            this.countdownTimerRef = null;
        }
    }

}