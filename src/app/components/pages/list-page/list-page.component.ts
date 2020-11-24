import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/_services/request.service';

@Component({
	selector: 'app-list-page',
	templateUrl: './list-page.component.html',
	styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

	code: string;
	data: any;

	constructor(
		private activateRoute: ActivatedRoute,
		private service: RequestService
	) {
		this.code = activateRoute.snapshot.params['code'];
		this.service.list(this.code).subscribe((res) => {
			if (res && res.results) {
				this.data = res.results.filter(r => {
					const url = r.url.split('/').filter(x => !!x);
					r.id = url[url.length - 1];
					return !!r.id;
				});
			}
		});
	}

	ngOnInit(): void {
	}

}
