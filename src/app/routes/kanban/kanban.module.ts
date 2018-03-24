import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { SharedModule } from '../../shared/shared.module';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
    { path: '', component: KanbanComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DragulaModule
    ],
    declarations: [KanbanComponent],
    providers: [DragulaService],
    exports: [
        RouterModule
    ]
})
export class DashboardModule { }
