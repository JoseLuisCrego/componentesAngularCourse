import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { DisplayComponent } from "./display/display.component";
import { TimerComponent } from './timer/timer.component';
import { AlertViewComponent } from './alert-view/alert-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { SimpleAlertViewComponent } from './simple-alert-view/simple-alert-view.component';
import { TimerNoneComponent } from './timer-none/timer.component';
import { TimerNativeComponent } from './timer-native/timer.component';
//import { TimerService } from './timer/timer.service';



@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    DisplayComponent,
    TimerComponent,
    AlertViewComponent,
    TabsComponent,
    TabComponent,
    SimpleAlertViewComponent,
    TimerNativeComponent,
    TimerNoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [/*TimerService*/],//este timerService es un Singleton común a todos los componentes que lo usen.
  bootstrap: [AppComponent]
})
export class AppModule { }
