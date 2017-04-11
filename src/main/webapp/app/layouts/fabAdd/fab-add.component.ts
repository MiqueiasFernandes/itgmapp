import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar/sidebar.service';

import {FabAddModalService} from './fab-add-modal.service';
import {JhiLoginModalComponent} from '../../shared/login/login.component';
@Component({
    selector: 'jhi-fab-add',
    templateUrl: './fab-add.component.html',
    styleUrls: [
        'fabAdd.scss'
    ]
})
export class FabAddComponent implements OnInit {

    menuOpen = false;
    aberto = false;

    constructor(
        private sidebarService: SidebarService,
        private fabAddModalService: FabAddModalService
    ) {

        sidebarService.sidebarObserver$.subscribe((open: boolean) => {
            this.aberto = open;
            this.menuOpen = false;
        });

    }

    ngOnInit() {
    }

    toogleMenu() {
        this.menuOpen = !this.menuOpen;
    }
    
    addNewProjeto(){
        this.fabAddModalService.open(JhiLoginModalComponent);
    }


}
