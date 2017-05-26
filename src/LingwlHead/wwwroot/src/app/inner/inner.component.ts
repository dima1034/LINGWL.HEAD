import { Component, OnChanges } from '@angular/core';


@Component({
	selector: 'inner',
	template: `<div>HELLO BEACH {{nameOf}}</div>`
})
export class InnerComponent {
	public nameOf: string = 'HOOLI';
}