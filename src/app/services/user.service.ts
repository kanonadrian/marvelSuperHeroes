import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable()

export class ConfigService {

    PUBLIC_KEY = GLOBAL.publicKey;
    PRIVATE_KEY = GLOBAL.privateKey;
    HASH = GLOBAL.hash;
    URL_API = `${GLOBAL.urlApi}characters?ts=1&limit=31&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
    URL_API_DETAIL : string;

    constructor(
        private http: HttpClient
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    getAllCharacters(): Observable<any> {
        return this.http.get(this.URL_API)
    }
    getCharacterId(id): Observable<any> {
        this.URL_API_DETAIL = `${GLOBAL.urlApi}characters/${id}?ts=1&limit=21&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`
        return this.http.get(this.URL_API_DETAIL)
    }
}