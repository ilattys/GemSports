import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogDb } from '../_model/blogDb';
import { HomeService } from '../_service/home.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent implements OnInit {

  submitDisabled: boolean;
  url: any;
  blogError: boolean;
  deleteIcon: boolean;
  errorMessage: any;

  constructor(public dialogRef: MatDialogRef<BlogDialogComponent>, private homeService: HomeService,
              @Inject(MAT_DIALOG_DATA) public data: BlogDb) {}

  ngOnInit(): void {
    this.submitDisabled = true;
    if (this.data.title === 'Create A New Blog'){
      this.deleteIcon = false;
    }
    else {
      this.deleteIcon = true;
    }
  }

  onSelectFile(event): void {
    console.log(event.target.files[0].type);
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
        this.blogError = false;
        const reader = new FileReader();
        this.data.urlName = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.data.url = event.target.result;
        };
      }
      else {
        this.blogError = true;
        this.data.url = '';
        this.data.urlName = '';
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  verifyData(): boolean {
    if (!this.checkTitle(this.data.title)){
      return true;
    }
    if (!this.checkData(this.data.body)){
      return true;
    }
    if (this.blogError === true) {  // submit without image
      return true;
    }
    return false;
  }

  private checkData(data): boolean {
    if (data === null || data === undefined){
      return false;
    }
    return true;
  }

  private checkTitle(data): boolean {
    if (data === null || data === undefined){
      return false;
    }
    if (data.length > 100){
      return false;
    }
    return true;
  }

  removePhoto(): void {
    this.data.url = '';
    this.data.urlName = '';
  }

  deleteBlog(): void {
    this.data.delete = true;
    this.closeDialog();
  }

  viewBlog(): void {
    this.data.view = true;
    this.closeDialog();
  }
}
