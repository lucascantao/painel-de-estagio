import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-header-title',
  standalone: true,
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() title: string = '';
}