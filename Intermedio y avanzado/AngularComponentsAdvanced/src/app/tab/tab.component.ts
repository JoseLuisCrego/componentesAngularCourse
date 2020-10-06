import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TabsComponent } from 'app/tabs/tabs.component';
import { Tab } from "./tab.interface";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})

//Implementa la interfaz Tab
export class TabComponent implements OnInit, Tab {

  @Input() title:string;
  @Output() OnClick:EventEmitter<void> = new EventEmitter<void>();

  public isActive:boolean = false;

  /*
    Inyectamos el componente padre en el componente hijo para poder acceder a los tabs
    del componente padre y así registrar el tag que se instancia en el array de componentes del padre.
  */
  constructor(/*public tabs:TabsComponent*/) { }

  clickTabContent(){
    //esto emitirá cada vez que se detecte un click en el componente tab.
    this.OnClick.emit();
  }

  ngOnInit() {
    //this.tabs.addTab(this);
  }

}
