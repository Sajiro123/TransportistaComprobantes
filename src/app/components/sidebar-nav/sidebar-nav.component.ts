import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar-nav',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar-nav.component.html'
})
export class SidebarNavComponent {
  @Output() navigate = new EventEmitter<void>();
  cargaOpen = true;

  toggleCarga() {
    this.cargaOpen = !this.cargaOpen;
  }

  onNavigate() {
    this.navigate.emit();
  }
}
