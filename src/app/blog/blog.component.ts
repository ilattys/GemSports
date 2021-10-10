import { Component, OnInit } from '@angular/core';
import { BlogDb } from '../_model/blogDb';
import { HomeService } from '../_service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog: BlogDb;

  constructor(private homeService: HomeService, private router: Router) {
    this.blog = new BlogDb();
  }

  ngOnInit(): void {
    this.blog = this.homeService.getSelectedBlog();
    if (this.blog.blogId === undefined){
      this.router.navigateByUrl('home').then();
    }
  }
}
