import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        // prevent empty links to reload page
        $(document).on('click', 'a[href="#"]', (e) => e.preventDefault());
    }
}
