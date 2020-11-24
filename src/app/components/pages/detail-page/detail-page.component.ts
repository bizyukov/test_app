import { Component, /* OnChanges, */ OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/_services/request.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, from } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mergeMap, last, tap } from 'rxjs/operators';

@Component({
	selector: 'app-detail-page',
	templateUrl: './detail-page.component.html',
	styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit/* , OnChanges */ {

	code: string;
	id: number;
	data: any;
	form: FormGroup;

	constructor(
		private activateRoute: ActivatedRoute,
		private service: RequestService,
		private http: HttpClient
	) {
		this.code = activateRoute.snapshot.params['code'];
		this.id = activateRoute.snapshot.params['id'];
		this.form = new FormGroup({});
		this.service.detail(`${this.code}/${this.id}`).subscribe((res) => {
			if (res) {
				this.data = res;
				this.populateData();
			}
		});
	}

	ngOnInit(): void {
	}

	populateData(): void {
		const urlArr = [];
		for (const key of Object.keys(this.data)) {
			if (this.isURL(this.data[key]) && key !== 'url') {
				urlArr.push({ name: key, urls: [this.data[key]] });
			}
			if (Array.isArray(this.data[key])) {
				const arr = this.data[key].filter(x => this.isURL(x));
				if (arr && arr.length) {
					urlArr.push({ name: key, urls: arr });
				}
			}
		}
		this.request(urlArr);
	}

	request(data): void {
		from(data)
			.pipe(
				mergeMap((prop: any) => {
					const httpRequests = [];
					for (const u of prop.urls) {
						httpRequests.push(this.http.get(u));
					}
					return forkJoin(httpRequests).pipe(
						tap(e => {
							this.data[prop.name] = e;
						})
					);
				}),
				last()
			)
			.subscribe(res => {
				this.buildForm();
			});
	}

	buildForm(): void {
		for (const key of Object.keys(this.data)) {
			if (!this.isArray(this.data[key]) && !this.isObject(this.data[key])) {
				this.form.addControl(key, new FormControl(this.data[key], Validators.required));
			}
		}
	}

	isArray(val): boolean {
		return Array.isArray(val);
	}

	isObject(val): boolean {
		return (typeof val === 'object' && !Array.isArray(val));
	}

	isURL(str): boolean {
		const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
		return !!pattern.test(str);
	}

}
