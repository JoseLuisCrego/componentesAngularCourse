import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})

export class ProgressBarComponent {

  @Input() progress:number = null; //esto me permite usar esta propiedad desde el tag html (<app-progress-bar></app-progress-bar>) de este componente

  constructor() { }

}
