import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

    // MODEL
    public pendingItems: Array<any> = [{
        name: 'Sia Rhodes',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/01.jpg'
    }, {
        name: 'Kenzi Barnett',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/02.jpg'
    }, {
        name: 'Sam Hughes',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/03.jpg'
    }];

    public inprogressItems: Array<any> = [{
        name: 'Erika Carroll',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/05.jpg'
    }];

    public doneItems: Array<any> = [{
        name: 'Curtis Vasquez',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/02.jpg'
    }, {
        name: 'Tim Hopkins',
        address: 'Address, 123 Route',
        budget: 1555,
        image: 'assets/img/user/06.jpg'
    }];

    public pendingTotal = 0;
    public inprogressTotal = 0;
    public doneTotal = 0;

    constructor(private dragulaService: DragulaService) {

        this.calculateTotals();

        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
            this.calculateTotals();
        });
    }

    ngOnInit() {
    }

    private onDrop(args) {
        let [el, target, source, sibling] = args;
    }

    private calculateTotals() {
        this.pendingTotal = this.pendingItems.length === 0 ? 0 : this.pendingItems.reduce((a, b) => { return { budget: a.budget + b.budget } }).budget;
        this.inprogressTotal = this.inprogressItems.length === 0 ? 0 : this.inprogressItems.reduce((a, b) => { return { budget: a.budget + b.budget } }).budget;
        this.doneTotal = this.doneItems.length === 0 ? 0 : this.doneItems.reduce((a, b) => { return { budget: a.budget + b.budget } }).budget;
    }

}
