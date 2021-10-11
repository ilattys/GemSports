import {Component, OnInit} from '@angular/core';
import {HomeService} from '../_service/home.service';
import {BlogDb} from '../_model/blogDb';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousel-test',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  blogs: BlogDb[];

  constructor(private homeService: HomeService, private router: Router){
  }

  ngOnInit(): void {
    this.homeService.getAllBlogs().subscribe(blogs => {
      if (blogs) {
        this.blogs = [];
        blogs.forEach(b => this.blogs.push(b));
      }
    });
  }

  viwBlog(blog): void {
    this.homeService.selectedBlog = blog;
    this.router.navigateByUrl('blog/' + blog.blogId).then();
  }
}
