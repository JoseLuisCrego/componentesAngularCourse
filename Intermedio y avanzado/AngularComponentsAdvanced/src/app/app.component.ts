import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit, AfterViewInit {

  constructor(private cdRef : ChangeDetectorRef, private renderer: Renderer2, private resolver :ComponentFactoryResolver) { 
    // Renderer2 nos permite acceder al DOM independientemente de la plataforma (algunas dan problemas), como algunos moviles o tablets.
    //  es recomendable usarlo cuando necesitamos acceder al DOM para modificarlo.
    this.timers = [2,20,40];
  }

  public isAddTimerVisible:boolean=false;
  //public isEndTimerAlertVisible:boolean=false;

  public time: number=0;
  public timers:Array<number> = [];

  //@ViewChildren(SimpleAlertViewComponent) alerts: QueryList<SimpleAlertViewComponent>;
  @ViewChild("timerInput") timerInput:ElementRef;

  //Elemento contenedor del componente SimpleAlertViewComponent que se instanciará dentro de él.
  @ViewChild("alert", {read:ViewContainerRef}) alertContainer : ViewContainerRef;
  //Referencia al componente dinámico.
  public simpleAlert : ComponentRef<SimpleAlertViewComponent> = null;

  ngAfterViewInit(): void {
    console.log(this.timerInput);

    this.renderer.setAttribute(this.timerInput.nativeElement, "placeholder", "Enter seconds");
    this.renderer.addClass(this.timerInput.nativeElement, 'time-in');

    // this.timerInput.nativeElement.setAttribute("placeholder", "Enter seconds");
    // this.timerInput.nativeElement.classList.add("time-in");

    // this.alerts.forEach(alert=>{
    //   if(!alert.title){
    //     alert.title = "HI!";
    //     alert.message = "Hello world!";
    //   }
    // });
    this.cdRef.detectChanges();
  }
  

  //ElementRef nos permite acceder a las propiedades del DOM del elemento que recibamos por ViewChild o ViewChildren

  //@ViewChild(SimpleAlertViewComponent) alert: SimpleAlertViewComponent;
  //@ViewChild es igual que contentHild, pero en lugar de acceder a propiedades que nos vienen desde el ts
  //del hijo, recibiremos los elementos que se pasan por el template del hijo en html. Por ejemplo @Input.

  ngAfterContentInit(): void {
    const alertFactory = this.resolver.resolveComponentFactory(SimpleAlertViewComponent);
    this.simpleAlert = this.alertContainer.createComponent(alertFactory);
    this.simpleAlert.instance.title="TIMER ended!!";
    this.simpleAlert.instance.message="your countdown has finished";
    this.simpleAlert.instance.onDismiss.subscribe(()=>{
      this.simpleAlert.destroy();
      //Cuando se ha terminado la cuenta atrás y hemos aceptado el mensaje de alerta, queremos eliminar el componente
      //  dinámico que se ha generado para evitar almacenar componentes renderizados que no se van a volver a utilizar.
    });
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
    this.simpleAlert.instance.show();//devuelve una instancia de un componente.
    //this.alerts.first.show();
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
