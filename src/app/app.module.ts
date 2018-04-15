import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Import your library
import { NgxPermissionsModule } from 'ngx-permissions';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';
import { AuthService } from './shared/auth.service';
import { AlertService } from './shared/alert.service';

import { ApiModule } from './shared/generated/api.module'

import { BASE_PATH } from './shared/generated/variables';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/static/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [AuthService,AlertService,{
        provide: BASE_PATH,
        useValue: environment.apiBaseUrl
    }],
    imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
        // BrowserModule,     
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        ApiModule,
        NgxPermissionsModule.forRoot(),
        SharedModule.forRoot(),
        RoutesModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],    
    bootstrap: [AppComponent]
})
export class AppModule {};
