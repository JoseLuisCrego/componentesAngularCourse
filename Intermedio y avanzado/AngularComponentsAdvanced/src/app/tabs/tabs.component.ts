import { AfterContentInit, Component, ContentChild, ContentChildren, OnDestroy, OnInit, QueryList } from '@angular/core';
import { TabComponent } from "app/tab/tab.component";
import { Subscription } from 'rxjs';
import { Tab } from "../tab/tab.interface";


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, OnDestroy {

  /*
    ContentChild(tipoDeComponenteHijo) permite acceder al componente hijo (en caso de tener varios instanciados del mismo tipo, sólo accederemos al primero) 
    desde el padre. Tendremos acceso tanto a las propiedades y métodos del hijo, como a sus @Output.
    IMPORTANTE: Si accedemos con ContentChild al hijo, y el hijo a su vez tiene inyectado por constructor
      al padre, deberemos eliminar uno de los dos, o la inyección del padre en el hijo o el ContentChild,
      puesto que se crearía una referencia circular.
  */

  //@ContentChild(TabComponent) tab:TabComponent;


  //public tabs:Tab[] = [];

  @ContentChildren(TabComponent) public tabs:QueryList<TabComponent>;

  private tabClickSubscriptions:Subscription[] = [];

  constructor() { }
  ngOnDestroy(): void {
    this.tabClickSubscriptions.forEach(tab =>tab.unsubscribe());
  }
  
  ngAfterContentInit(): void {
    //Se lanza cuando el contenido ya está inicializado.

    console.log(this.tabs);
    this.tabs.forEach(tab=>{
      let subscription = tab.OnClick.subscribe(()=>{
        console.log(`tab hijo ${tab.title} content clicado.`);
      });
      //Me suscribo a todos los tabs hijos para detectar cuando son clicados.
      this.tabClickSubscriptions.push(subscription);
      //Guardo estas suscripciones en el array de suscripciones.
    });
    
    this.selectTab(this.tabs.first);
    //Seleccionamos como clicado el primer elemento de los tabs, para que aparezca como activo una vez nos hemos suscrito al 
    //Output OnClick de todos los hijos.
    
    //-----------------------------
    
    // if(this.tab){
    //   console.log(this.tab);
    //   this.addTab(this.tab);
    //   this.tabClickSubscription = this.tab.OnClick.subscribe(()=>
    //     {
    //       console.log("Me he suscrito a mi hijo "+ this.tab.title);
    //       /*
    //         OnClick es un Output del componente hijo al que nos subscribimos para recibir sus eventos.
    //         Cada vez que cliquemos en un componente hijo tab, escribiremos el nombre del componente al que nos hemos suscrito.
    //       */
    //     }
    //   );
    // }
  }

  ngOnInit() {
    
  }

  //Con contentchildren y la querylist recibo directamente un array de los componentes TabComponent intanciados en 
  // dentro de este componente Tabs, por lo tanto, ya no necesito añadir tabs hijos al array.
  // addTab(tab:Tab){
  //   if (this.tabs.length === 0) {
  //     tab.isActive = true;
  //   }
  //   this.tabs.push(tab);
  // }

  selectTab(tab:Tab) {
    this.tabs.forEach(tab => tab.isActive = false);//pongo todos los tabs a inactivos.
    tab.isActive = true;//activo el tab que reciba desde el hijo con su evento.

    //Del mismo modo que en addTab, ahora ya no es necesario usar un bucle for, podemos usar las propiedades de la querylist
    //como por ejemplo, foreach() que es una función que permite programar de manera funcional.
    // for (let tab of this.tabs){
    //   tab.isActive = false;
    // }
    // tab.isActive = true;
  }
  

}
