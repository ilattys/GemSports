import {Component, OnInit} from '@angular/core';
import {HomeService} from '../_service/home.service';
import {BlogDb} from '../_model/blogDb';

@Component({
  selector: 'app-carousel-test',
  templateUrl: './carousel-test.component.html',
  styleUrls: ['./carousel-test.component.scss']
})
export class CarouselTestComponent implements OnInit {

  blogs: BlogDb[];

  constructor(private homeService: HomeService){
  }

  ngOnInit(): void {
    this.homeService.getAllBlogs().subscribe(blogs => {
      if (blogs) {
        this.blogs = [];
        blogs.forEach(b => this.blogs.push(b));
      }
    });
  }
}
