import {Component, HostListener, OnInit} from '@angular/core';
import {HomeService} from '../_service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs: boolean;

  constructor(private homeService: HomeService){
    // debugger
    // window.addEventListener('beforeunload', (event) => {
    //   event.returnValue = `You have unsaved changes, leave anyway????????`;
    // });
  }

  ngOnInit(): void {
    this.homeService.getAllBlogs().subscribe(blogs => {
      if (blogs){
        this.blogs = true;
      }
    });
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadHandler(event: Event): void {
  //   // Your logic on beforeunload
  //   debugger
  //   console.log('here');
  //
  // }
}
