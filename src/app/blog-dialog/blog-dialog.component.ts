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
  fileError: boolean;

  constructor(public dialogRef: MatDialogRef<BlogDialogComponent>, private homeService: HomeService,
              @Inject(MAT_DIALOG_DATA) public data: BlogDb) {}

  ngOnInit(): void {
    this.submitDisabled = true;
  }

  onSelectFile(event): void {
    console.log(event.target.files[0].type);
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpeg') {
        this.fileError = false;
        const reader = new FileReader();
        this.data.urlName = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.data.url = event.target.result;
        };
      }
      else {
        this.fileError = true;
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
    if (!this.checkData(this.data.title)){
      return true;
    }
    if (!this.checkData(this.data.subject)){
      return true;
    }
    if (!this.checkData(this.data.body)){
      return true;
    }
    if (this.fileError === true) {  // submit without image
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

  removePhoto(): void {
    this.data.url = '';
    this.data.urlName = '';
  }

  deleteBlog(): void {
    this.data.delete = true;
    this.closeDialog();
  }
}
