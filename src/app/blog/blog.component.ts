import { Component, OnInit } from '@angular/core';
import {BlogDb} from '../_model/blogDb';
import {HomeService} from '../_service/home.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: BlogDb[];

  constructor(private homeService: HomeService) {
    this.blogs = [];
  }

  ngOnInit(): void {
    this.homeService.getAllBlogs().subscribe(blogs => {
      if (blogs){
        this.blogs = [];
        blogs.forEach(b => this.blogs.push(b));
      }
      else {
        this.homeService.log('info', 'No Blogs currently posted');
      }
    });
  }

}
