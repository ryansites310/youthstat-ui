import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import { SettingsService } from '../shared/settings/settings.service';
import { AlertService } from '../shared/alert.service';
import { Alert } from 'selenium-webdriver';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss', './layout-variants.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {

    public toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right',
        timeout: 7000
    });

    constructor(private settings: SettingsService,
                private toasterService: ToasterService,
                private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.listen().subscribe(alert => {
            console.log('alert - ' + JSON.stringify(alert));
            this.toasterService.pop(alert.type, alert.header, alert.message);
        });
     }

    layout() {
        return [

            this.settings.app.sidebar.visible ? 'sidebar-visible' : '',
            this.settings.app.sidebar.coverMode ? 'sidebar-cover' : '',
            this.settings.app.sidebar.coverModeVisible ? 'sidebar-cover-visible' : '',
            this.settings.app.footer.fixed ? 'footer-fixed' : ''

        ].join(' ');
    }

    closeSidebar() {
        this.settings.app.sidebar.coverModeVisible = false;
        this.settings.app.sidebar.visible = false;
    }

    showToaster(type, message) {
       
        this.toasterService.pop(type, '', message);
    }
}
