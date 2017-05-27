import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];

/**
 * pathMatch: 'full' means, that the whole URL path needs to match and is consumed by the route matching algorithm.
 * pathMatch: 'prefix' means, the first route where the path matches the start of the URL is choosen, but then the
 * route matching algorithm is continuing searching for matching child routes where the rest of the URL matches.
 *
 * ActivatedRouteSnapshot (interface)
 * route.snapshot - contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
 */


