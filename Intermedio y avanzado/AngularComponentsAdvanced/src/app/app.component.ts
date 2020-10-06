import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {

  constructor(private cdRef : ChangeDetectorRef, private renderer: Renderer2) { 
    // Renderer2 nos permite acceder al DOM independientemente de la plataforma (algunas dan problemas), como algunos moviles o tablets.
    //  es recomendable usarlo cuando necesitamos acceder al dOM para modificarlo.
    this.timers = [5,15,30];
  }

  public isAddTimerVisible:boolean=false;
  //public isEndTimerAlertVisible:boolean=false;

  public time: number=0;
  public timers:Array<number> = [];

  @ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild("timerInput") timerInput:ElementRef;

  ngAfterViewInit(): void {
    console.log(this.timerInput);

    this.renderer.setAttribute(this.timerInput.nativeElement, "placeholder", "Enter seconds");
    this.renderer.addClass(this.timerInput.nativeElement, 'time-in');

    // this.timerInput.nativeElement.setAttribute("placeholder", "Enter seconds");
    // this.timerInput.nativeElement.classList.add("time-in");

    this.alerts.forEach(alert=>{
      if(!alert.title){
        alert.title = "HI!";
        alert.message = "Hello world!";
      }
    });
    this.cdRef.detectChanges();
  }
  

  //ElementRef nos permite acceder a las propiedades del DOM del elemento que recibamos por ViewChild o ViewChildren

  //@ViewChild(SimpleAlertViewComponent) alert: SimpleAlertViewComponent;
  //@ViewChild es igual que contentHild, pero en lugar de acceder a propiedades que nos vienen desde el ts
  //del hijo, recibiremos los elementos que se pasan por el template del hijo en html. Por ejemplo @Input.

  ngAfterContentInit(): void {

    // this.alert.show();
    // this.alert.title = "HI!";
    // this.alert.message = "Hello world.";
  }

  logCountdownEnd(){
    console.log("Countdown ended!!");
  }

  public showAddTimer(){
    this.isAddTimerVisible = true;
    setTimeout(() => {
      this.renderer.selectRootElement(this.timerInput.nativeElement).focus();
      //this.timerInput.nativeElement.focus();  
    }, );
  }

  public hideAddTimer(){
    this.isAddTimerVisible = false;
  }

  public showEndTimerAlert(){
    this.alerts.first.show();
    //this.isEndTimerAlertVisible = true;
  }

  public hideEndTimerAlert(){
    //this.isEndTimerAlertVisible = false;
  }

  public submitAddTimer(){
    this.timers.push(this.time);
    this.hideAddTimer();
  }

}
