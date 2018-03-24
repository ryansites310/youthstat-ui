import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SharedModule } from '../../shared/shared.module';
import { ClassicComponent } from './classic/classic.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { NgxdatatableComponent } from './ngxdatatable/ngxdatatable.component';

const routes: Routes = [
    { path: 'classic', component: ClassicComponent },
    { path: 'responsive', component: ResponsiveComponent },
    { path: 'ngxdatatable', component: NgxdatatableComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        NgxDatatableModule
    ],
    declarations: [
        ClassicComponent,
        ResponsiveComponent,
        NgxdatatableComponent
    ],
    providers: [
    ],
    exports: [
        RouterModule
    ]
})
export class TablesModule { }