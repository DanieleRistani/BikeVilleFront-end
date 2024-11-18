import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./static/nav-bar/nav-bar.component";
import { FooterComponent } from "./static/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent, HeaderComponent, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isHome !: Boolean

  constructor(private router: Router) { }
  showHeader() {
    if (window.location.pathname == '/') { this.isHome = true } else { this.isHome = false }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showHeader();
    });
  }
}
