/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import { AppState } from './app.service';
import book from '../assets/icon/book.svg';


/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./app.component.scss'
	],
	template: `
	 	<inline-svg style="position: absolute"></inline-svg>
    <nav class="navbar navbar-toggleable-md navbar-light">
			<div class="collapse navbar-collapse">
				<ul class="navbar-nav mr-auto">
					<li  class="nav-item">
						<a [routerLink]=" ['./'] "
							routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
							Index
						</a>
					</li>
					<li class="nav-item">
						<a class="movie" [routerLink]=" ['./home'] "
								routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
								<svg id="icon-movie">
  <use xlink:href="#movie" />
</svg>					
						</a>	
								
					</li>
					<li  class="nav-item">
						<a class="music" [routerLink]=" ['./detail'] "
								routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
						<svg id="icon-music">
  <use xlink:href="#music" />
</svg>							</a>	
							
					</li>
					<li  class="nav-item">
						<a class="book" [routerLink]=" ['./barrel'] "
								routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
					<svg id="icon-book">
  <use xlink:href="#book" />
</svg>						</a>	
							
						
					</li>
					<li  class="nav-item">
						<a class="bookmark" [routerLink]=" ['./about'] "
								routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
														
						<svg id="icon-bookmark">
  <use xlink:href="#bookmark" />
</svg>		</a>	
					
					</li>
				</ul>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

    <footer>
      <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
      <div>
        <a [href]="url">
          <img [src]="angularclassLogo" width="25%">
        </a>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
	public angularclassLogo = 'assets/img/angularclass-avatar.png';
	public name = 'Angular 2 Webpack Starter';
	public url = 'https://twitter.com/AngularClass';

	constructor(
		public appState: AppState
	) { }

	public ngOnInit() {
		console.log('Initial App State - ngOnInit', this.appState.state);
	}
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */


/** DOCUMENTATION
 *  router-outlet(default angular2 feature) - в нем отображаеться шаблон выбраного(в роутере) компонента
 *  
 *  
 */