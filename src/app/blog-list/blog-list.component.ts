import { Component, OnInit } from '@angular/core';
import { BlogDb } from '../_model/blogDb';
import { HomeService } from '../_service/home.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { BlogDialogComponent } from '../blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  blogs: BlogDb[];
  displayDialog: boolean;
  title: string;
  subject: string;
  body: string;
  url: any;
  urlName: string;
  blog: BlogDb;
  delete: boolean;
  view: boolean;

  constructor(private homeService: HomeService, public dialog: MatDialog,
              private authService: AuthService, private router: Router) {
    if (this.authService.loggedIn.value){
      this.blogs = [];
    }
    else{
      this.router.navigateByUrl('signin').then();
    }
  }

  ngOnInit(): void {
    this.displayDialog = false;
    this.homeService.getAllBlogs().subscribe(blogs => {
      debugger
      if (blogs){
        this.blogs = [];
        blogs.forEach(b => this.blogs.push(b));
      }
      else {
        this.homeService.log('error', 'No blogs found');
      }
    });
  }

  openBlogDialog(): void {
    this.title = 'Create A New Blog';
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '80%',
      height: 'auto',
      maxHeight: '100vh',
      data: {
        title: this.title, subject: this.subject, body: this.body, url: this.url, urlName: this.urlName
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.createBlog(result);
      }
    });
  }

  private createBlog(result): void {
    let url;
    this.blog = new BlogDb();
    if (result.url){
      url = this.formatUrl(result.url);
    }
    else {
      url = '';
    }
    this.blog = result;
    this.blog.url = url;
    this.homeService.createBlog(this.blog);
    // window.location.reload();
    this.blogs.push(this.blog); // refresh page
  }

  editBlogDialog(blog): void {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      width: '80%',
      height: 'auto',
      maxHeight: '100vh',
      data: {
        title: blog.title, subject: blog.subject, body: blog.body, url: blog.url,
        urlName: blog.urlName, delete: this.delete, view: this.view
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        if (result.delete){
          this.deleteBlog(blog);
        }
        if (result.view){
          this.viewBlog(blog);
        }
        else {
          this.updateBlog(result, blog);
        }
      }
    });
  }

  private updateBlog(result, blog): void {
    let url;
    let urlName;
    this.blog = new BlogDb();
    this.blog = blog;
    this.blog.title = result.title;
    this.blog.subject = result.subject;
    this.blog.body = result.body;
    if (result.url){
      url = this.formatUrl(result.url);
      urlName = result.urlName;
    }
    else {
      url = '';
      urlName = '';
    }
    this.blog.url = url;
    this.blog.urlName = urlName;
    this.homeService.updateBlog(this.blog);
    window.location.reload();

    // const index = this.blogs.indexOf(blog);
    // this.blogs[index] = blog;
  }

  deleteBlog(blog): void {
    const request = this.homeService.buildDeleteRequest(blog.blogId, blog.urlName);
    this.homeService.deleteBlog(request);
    const index = this.blogs.indexOf(blog);
    window.location.reload();
    // this.blogs.splice(index, 1);
  }

  private formatUrl(url): string {
    const currentEntry = (url as string).split(',');
    if (currentEntry[1].length % 4 === 1){
      currentEntry[1] = currentEntry[1] + '===';
    }
    if (currentEntry[1].length % 4 === 2){
      currentEntry[1] = currentEntry[1] + '==';
    }
    if (currentEntry[1].length % 4 === 3){
      currentEntry[1] = currentEntry[1] + '=';
    }

    return currentEntry[1];
  }

  private viewBlog(blog): void {
    this.homeService.selectedBlog = blog;
    this.router.navigateByUrl('blog/' + blog.blogId).then();
  }
}
