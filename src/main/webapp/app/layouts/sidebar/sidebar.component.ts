import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

import {EventManager} from 'ng-jhipster';

import {Account, Principal} from '../../shared';

import {SidebarService} from '../sidebar/sidebar.service';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {

    isSidebarFixed = false;
    nome = "";
    email = "";
    image = null;

    constructor(
        private principal: Principal,
        private eventManager: EventManager,
        private sidebarService: SidebarService
    ) {
        sidebarService.lockedObserver$.subscribe((lock: boolean) => {
            this.isSidebarFixed = lock
            console.log("evento acionado")
        });
    }

    ngOnInit() {
        this.principal.identity().then((account: Account) => {
            this.getDados(account);
        });
        this.registerAuthenticationSuccess();
        this.openSidebar();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account: Account) => {
                this.getDados(account);
                this.openSidebar();
            });
        });
    }

    getDados(account: Account) {
        if (!account)
            this.closeSidebar();
        else {
            this.nome = account.firstName + " " + account.lastName;
            this.email = account.email;
            this.image = account.imageUrl;
        }
    }


    toogleBlockSideBar() {
        this.sidebarService.toogleSidebarFixed();
        if (!this.sidebarService.isLock())
            this.closeSidebar();
    }

    openSidebar() {
        this.sidebarService.openSidebar();
    }

    closeSidebar() {
        this.sidebarService.closeSidebar();
    }
    
    isUserAuthenticated(){
        return this.principal.isAuthenticated();
    }

}
