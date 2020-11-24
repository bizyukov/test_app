import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RequestService {

	constructor(private http: HttpClient) { }

	get(): Observable<any> {
		return this.http.get('https://swapi.dev/api/');
	}

	list(url): Observable<any> {
		return this.http.get(`https://swapi.dev/api/${url}/`);
	}

	detail(url): Observable<any> {
		return this.http.get(`https://swapi.dev/api/${url}/`);
	}
}
