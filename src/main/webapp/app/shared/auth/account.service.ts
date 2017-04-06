import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AccountService {
    constructor(private http: Http) {}

    get(): Observable<any> {
        return this.http.get('api/account').map((res: Response) => res.json());
    }

    save(account: any): Observable<Response> {
        return this.http.post('api/account', account);
    }

    sendImage(image: File): Observable<Response> {

        console.log("enviando imagem.... ");
        const formData = new FormData();
        formData.append('file', image);
        formData.append('user', "mikeiasFernandes");
        const headers = new Headers({});
        let options = new RequestOptions({headers});
        let url = 'api/account/image';
        console.log("imagem enviada.... ");
        return this.http.post(url, formData, options);

    }
}
