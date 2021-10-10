import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { BlogDb } from '../_model/blogDb';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public selectedBlog: BlogDb;

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) {
    this.selectedBlog = new BlogDb();
  }

  submitCoachForm(coachForm): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/xnqloqow',
      { form: 'Coach Form', coachForm },
      { headers }).subscribe(
      response => {
        console.log(response);
        this.log('success', 'Email Successfully Sent');
      }, error => {
        console.log({error});
      }
    );
  }

  submitPlayerForm(playerForm): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/mbjqpjpq',
      { form: 'Player Form', playerForm },
      { headers }).subscribe(
      response => {
        console.log(response);
        this.log('success', 'Registration Form Submitted');
      }, error => {
        console.log({error});
      }
    );
  }
  public log(severity: string, details: string): void {
    this.messageService.add(severity, 'Gem Sports Club', details);
  }

  getAllBlogs(): Observable<BlogDb[]> {
    const url = this.buildUrl('GetAllBlogs');
    return this.http.get<BlogDb[]>(url);
  }

  createBlog(blog): void {
    debugger
    const url = this.buildUrl('CreateBlog');
    console.log(JSON.stringify(blog));

    this.http.post<any>(url, blog).subscribe(
      (response) => {
        debugger
        if (response.response === 'Blog Created'){
          this.log('success', 'Blog Created');
        }
        if (response.response === 'Image Exists'){
          this.log('error', 'Image With This Name Already Exists');
        }
      },
      (error => {
        console.log(error);
      })
    );
  }

  updateBlog(blog): void {
    const url = this.buildUrl('UpdateBlog');
    console.log(blog);
    this.http.post<any>(url, blog).subscribe(
      (response) => {
        if (response.response === 'Blog Updated'){
          this.log('success', 'Blog Updated');
        }
      },
      (error => {
        console.log(error);
      })
    );
  }

  deleteBlog(request): void {
    const url = this.buildUrl('DeleteBlog');
    this.http.delete<any>(url, request).subscribe(
      (response) => {
        this.log('success', 'Blog Deleted');
      },
      (error => {
        console.log(error);
      })
    );
  }

  buildDeleteRequest(blogId, urlName): any {
    const request = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        blogId,
        urlName
      },
    };
    return request;
  }

  private buildUrl(controller): any{
    return `https://localhost:44348/api/Blog/` + controller;
  }

  submitClinicForm(form): void {
    this.http.post('https://formspree.io/f/mjvjpvpz', form).subscribe(
      response => {
        console.log(response);
        window.location.href = 'https://checkout.square.site/merchant/MLVQ8P1JXD0Q5/checkout/SK4DTUPJ3LYWNMBDDICOSV37?src=embed';
      },
      error => {
        console.log(error);
        this.log('error', 'Unable To Submit Form');
      }
    );

  }

  getSelectedBlog(): BlogDb {
    return this.selectedBlog;
  }
}
