import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  @Input() via: string = '';
  @Input() nome: string = '';
  @Input() numeroTelefono: string = '';

}
