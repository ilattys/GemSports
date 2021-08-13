import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import {SigninComponent} from './signin/signin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BlogComponent} from './blog/blog.component';
import {BlogListComponent} from './blog-list/blog-list.component';
import { ClinicComponent } from './clinic/clinic.component';
import {ThankYouComponent} from './thank-you/thank-you.component';
import {CarouselTestComponent} from './carousel-test/carousel-test.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'clinic', component: ClinicComponent },
  { path: 'thankyou', component: ThankYouComponent },
  // { path: 'test', component: CarouselTestComponent },
  // { path: 'signin', component: SigninComponent },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'admin/blogs', component: BlogListComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
