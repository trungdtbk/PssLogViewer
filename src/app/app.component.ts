import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '1830PSS Log Viewer';

  constructor(private titleSvc: Title) {
    this.titleSvc.setTitle(this.title);
  }
}
