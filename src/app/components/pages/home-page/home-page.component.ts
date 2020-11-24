import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/_services/request.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	data: any[] = [];

	constructor(
		private service: RequestService
	) {
		this.service.get().subscribe((results) => {
			this.data = results;
		});
	}

	ngOnInit(): void {
	}

}
