import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contattaci',
  imports: [],
  templateUrl: './contattaci.component.html',
  styleUrl: './contattaci.component.css'
})
export class ContattaciComponent {
 @Input() email: string = "";
 @Input() numeroTelefono: string = ""; 
}
