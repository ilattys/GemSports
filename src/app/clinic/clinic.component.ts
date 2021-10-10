import { Component, OnInit } from '@angular/core';
import { HomeService } from '../_service/home.service';
import { ClinicForm } from '../_model/clinic-form';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  model: ClinicForm;
  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  relationships = ['Parent/Guardian', 'Grandparent', 'Sibling', 'Aunt/Uncle'];
  formData: any;
  form: FormGroup;

  constructor(private http: HttpClient,
              public fb: FormBuilder,
              private homeService: HomeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.model = new ClinicForm();
  }

  waiverDialog(model: ClinicForm): void {
    if (!model.childName && !model.childAge){
      this.homeService.log('error', 'Please Enter Child Information');
      return;
    }
    this.appendFormData(model);
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '100vh',
      maxWidth: '80vh',
      data: {
        formData: this.formData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.appendFile(result);
      }
    });
  }

  private appendFormData(model: ClinicForm): any {
    this.formData = new FormData();

    this.form = this.fb.group({
      waiver: [null],
      childName: [model.childName],
      childAge: [model.childAge],
      childSchool: [model.childSchool],
      childCoachName: [model.childCoachName],
      childPhoneNo: [model.childPhoneNo],
      parentName: [model.parentName],
      parentPhoneNo: [model.parentPhoneNo],
      parentEmail: [model.parentEmail],
      emergencyContactName: [model.emergencyContactName],
      emergencyContactPhoneNo: [model.emergencyContactPhoneNo],
      emergencyContactRelationship: [model.emergencyContactRelationship],
      shirtSize: [model.shirtSize],
      allergies: [model.allergies],
      committed: [model.committed]
    });

    for (const modelKey in model) {
      if (model[modelKey]){
        this.formData.append(modelKey, this.form.get(modelKey).value);
      }
    }
  }

  private appendFile(result: any): void {
    this.form.patchValue({
      waiver: result
    });
    this.form.get('waiver').updateValueAndValidity();
    this.formData.append('waiver', this.form.get('waiver').value);
    debugger
    this.homeService.submitClinicForm(this.formData);
  }
}
