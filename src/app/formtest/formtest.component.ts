import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-formtest',
  templateUrl: './formtest.component.html',
  styleUrls: ['./formtest.component.scss']
})

export class FormtestComponent implements OnInit {
  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<FormtestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['Covid Waiver/Release'],
      waiver: [null]
    });
  }

  ngOnInit(): void {}

  uploadFile(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.dialogRef.close(file);
  }
}
