import {Component, OnInit} from '@angular/core';

import {EventManager} from 'ng-jhipster';

import {Principal} from '../../shared';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styles: [],
//    providers: [SidebarService]
})
export class SidebarComponent implements OnInit {

    isSidebarFixed = false;

    nome = "";
    email = "";
    image = null;


    constructor(
        private principal: Principal,
        private eventManager: EventManager
    ) {}

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.nome = account.firstName + " " + account.lastName;
            this.email = account.email;
            this.image = account.imageUrl;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.nome = account.firstName + " " + account.lastName;
                this.email = account.email;
                this.image = account.imageUrl;
            });
        });
    }

 
isUserAuthenticated(){
    return true;
}


    blockSideBar() {
        this.isSidebarFixed = !this.isSidebarFixed;
    }

}

