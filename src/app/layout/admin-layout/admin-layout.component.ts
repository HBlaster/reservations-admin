import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

  constructor(
  ) { }
  showMenu = true;
  logout(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto cerrará tu sesión.',
      icon: 'warning',
      iconColor: '#0a1157ff',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d1013ff',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    });
  }
}
