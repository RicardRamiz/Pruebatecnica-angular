import { Component } from '@angular/core';
import { DashboardComponent } from './cursos/cursos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `<app-cursos />`,
})
export class AppComponent {}