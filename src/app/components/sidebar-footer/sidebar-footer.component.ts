import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-sidebar-footer',
    templateUrl: './sidebar-footer.component.html',
    imports: [RouterLink, RouterLinkActive]
})
export class SidebarFooterComponent {
  @Output() abrirPerfil = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onAbrirPerfil() {
    this.abrirPerfil.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
