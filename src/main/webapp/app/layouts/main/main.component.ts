import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized} from '@angular/router';
import {EventManager} from 'ng-jhipster';
import {JhiLanguageHelper, StateStorageService, Principal} from '../../shared';


@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {


    isSideBarOpen: Boolean = false;
    sideBarFIXED: Boolean = false;

    openSidebar() {
        this.isSideBarOpen = !this.isSideBarOpen && this.principal.isAuthenticated();
    }
    closeSidebar() {
        console.log("sid: " + this.sideBarFIXED);
        this.isSideBarOpen = (this.isSideBarOpen && !this.sideBarFIXED) ? false : this.isSideBarOpen;
    }



    constructor(
        private jhiLanguageHelper: JhiLanguageHelper,
        private router: Router,
        private $storageService: StateStorageService,
        private principal: Principal,
        private eventManager: EventManager
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'itgmappApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof RoutesRecognized) {
                let params = {};
                let destinationData = {};
                let destinationName = '';
                let destinationEvent = event.state.root.firstChild.children[0];
                if (destinationEvent !== undefined) {
                    params = destinationEvent.params;
                    destinationData = destinationEvent.data;
                    destinationName = destinationEvent.url[0].path;
                }
                let from = {name: this.router.url.slice(1)};
                let destination = {name: destinationName, data: destinationData};
                this.$storageService.storeDestinationState(destination, params, from);
            }
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.openSidebar();
        });
    }
}
