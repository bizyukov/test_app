import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPageComponent } from './components/pages/detail-page/detail-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ListPageComponent } from './components/pages/list-page/list-page.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'list/:code', component: ListPageComponent },
	{ path: 'detail/:code/:id', component: DetailPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
