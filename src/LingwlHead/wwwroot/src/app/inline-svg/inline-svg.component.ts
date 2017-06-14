import {
	Component,
	OnInit
} from '@angular/core';

import { AppState } from '../app.service';

@Component({
	selector: 'inline-svg',
	styleUrls: ['inline-svg.css'],
	templateUrl: './inline-svg.html'
})
export class InlineSvgComponent implements OnInit {
	constructor() {}

	public ngOnInit() {
		console.log( 'created svg component' );
	}
}