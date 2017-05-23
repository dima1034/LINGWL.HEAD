import { Component } from '@angular/core';

@Component({
    selector: 'app-shell',
    template: `
        <h1>Demo with inline template built by {{name}}</h1>
        <div>
        <button (click)='say()'>Click here</button>
        </div>  
    `
})
export class AppComponent {
    public name: string;
    constructor() {
        this.name = 'Angular 2 developer!';
    }
    public say(): void {
        alert(`Hello from ${this.name}`);
    }
}
