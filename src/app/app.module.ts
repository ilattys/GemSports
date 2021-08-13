import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService as PrimeMessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { MessageComponent } from './message/message.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogComponent } from './blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BlogListComponent } from './blog-list/blog-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ClinicComponent } from './clinic/clinic.component';
import { FormtestComponent } from './formtest/formtest.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CarouselTestComponent } from './carousel-test/carousel-test.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    AboutComponent,
    MessageComponent,
    SigninComponent,
    DashboardComponent,
    BlogDialogComponent,
    BlogComponent,
    BlogListComponent,
    ClinicComponent,
    FormtestComponent,
    ThankYouComponent,
    CarouselTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    CardModule
  ],
  providers: [PrimeMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
