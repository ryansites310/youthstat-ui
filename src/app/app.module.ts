import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
    AuthModule,
    OidcSecurityService,
    OpenIDImplicitFlowConfiguration,
    OidcConfigService,
    AuthWellKnownEndpoints
} from 'angular-auth-oidc-client';


import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/static/i18n/', '.json');
}

export function loadConfig(oidcConfigService: OidcConfigService) {
    console.log('APP_INITIALIZER STARTING');
    return () => oidcConfigService.load_using_stsServer('https://accounts.google.com');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        AuthModule.forRoot(),
        // BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
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
    providers: [
        OidcSecurityService,
        OidcConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: loadConfig,
            deps: [OidcConfigService],
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private oidcSecurityService: OidcSecurityService,
        private oidcConfigService: OidcConfigService,
    ) {
        this.oidcConfigService.onConfigurationLoaded.subscribe(() => {

            const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
            openIDImplicitFlowConfiguration.stsServer = 'http://accounts.google.com';
            openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:4300';
            openIDImplicitFlowConfiguration.client_id = '1076316369658-75dskh1to8l5iiq58lnbl2dt02rqmtev.apps.googleusercontent.com';
            openIDImplicitFlowConfiguration.response_type = 'id_token token';
            openIDImplicitFlowConfiguration.scope = 'openid email profile';
            openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:4300/signup';
            openIDImplicitFlowConfiguration.post_login_route = '/dashboard';
            openIDImplicitFlowConfiguration.forbidden_route = '/lock';
            openIDImplicitFlowConfiguration.unauthorized_route = '/signup';
            openIDImplicitFlowConfiguration.trigger_authorization_result_event = true;
            openIDImplicitFlowConfiguration.log_console_warning_active = true;
            openIDImplicitFlowConfiguration.log_console_debug_active = true;
            openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 20;

            const authWellKnownEndpoints = new AuthWellKnownEndpoints();
            authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

            this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);

        });

        console.log('APP STARTING');
    }

}
