import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './header/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';

import { ToasterModule, ToasterService } from 'angular2-toaster';

@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        ToasterModule
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        SearchComponent,
        FooterComponent,
        SettingsComponent,
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        SearchComponent,
        SettingsComponent,
    ],
    providers: [ToasterService]
})
export class LayoutModule { }
