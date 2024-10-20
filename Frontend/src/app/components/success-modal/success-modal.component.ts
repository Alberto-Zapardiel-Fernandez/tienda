import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css'],
})
export class SuccessModalComponent {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<SuccessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
