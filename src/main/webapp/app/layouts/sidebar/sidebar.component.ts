import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

import {Principal} from '../../shared';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {


    sideBarFIXED: boolean;

    constructor(private principal: Principal) {}

    ngOnInit() {
    }

    isUserAuthenticated() {
        //      return false;
        return this.principal.isAuthenticated();
        //      && this.principal.hasAuthority("'ROLE_ADMIN'");
        ///&& !this.principal.hasAnyAuthority(['ROLE_ADMIN']);
    }

    @Output() toogleSidebar = new EventEmitter();

    @Input()
    get isSideBarFIXED() {
        return this.sideBarFIXED;
    }

    set isSideBarFIXED(val) {
        this.sideBarFIXED = val;
        this.toogleSidebar.emit(this.sideBarFIXED);
    }

    fixSidebar(event) {
        this.isSideBarFIXED = !this.isSideBarFIXED;
        console.log("fix: " + event + " " + this.isSideBarFIXED);
    }


    //
    //
    //    close() {
    //        console.log('mikeias: close ' + this.sideBarOpen);
    //        this.isSideBarOpen = false;
    //    }

}
