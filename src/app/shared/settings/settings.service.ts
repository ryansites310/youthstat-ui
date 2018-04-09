import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class SettingsService {

    app: any;

    constructor() {

        // Global Settings
        // -----------------------------------
        this.app = {
            name: 'YouthStat',
            description: 'Bootstrap 4 Admin Template',
            layout: {
                rtl: false
            },
            sidebar: {
                showtoolbar: false, // profile area in sidebar
                visible: false, // mobile sidebar visible
                coverMode: false,  // cover mode
                coverModeVisible: false // cover mode sidebar visible
            },
            footer: {
                fixed: true
            },
            theme: 'theme-dark' // no actively used
        };

    }

    getSetting(name) {
        return name ? this.app[name] : this.app;
    }

    setSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }

    toggleSetting(name) {
        return this.setSetting(name, !this.getSetting(name));
    }

}
