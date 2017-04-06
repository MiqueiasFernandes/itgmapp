import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe} from '@angular/common';



import {CookieService} from 'angular2-cookie/services/cookies.service';
import {
    ItgmappSharedLibsModule,
    ItgmappSharedCommonModule,
    CSRFService,
    AuthService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective,
    JhiLoginModalComponent,
    ItgmrestService
} from './';

@NgModule({
    imports: [
        ItgmappSharedLibsModule,
        ItgmappSharedCommonModule
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        CookieService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        AuthService,
        UserService,
        DatePipe,
//        {provide: ItgmrestService, useClass: ItgmrestService}
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        ItgmappSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ItgmappSharedModule {}
