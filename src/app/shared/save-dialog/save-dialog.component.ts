import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-save-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>確認</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>
        キャンセル
      </button>
      <button mat-button [mat-dialog-close]="true" color="primary">
        保存する
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      h2 {
        color: #e50914;
      }
      button {
        margin: 0 8px;
      }
    `,
  ],
})
export class SaveDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  ngOnInit() {
    // ダイアログが開いたときにフォーカス管理を改善
    this.dialogRef.afterOpened().subscribe(() => {
      // フォーカスを明示的に設定
      const cancelButton = document.querySelector(
        'button[mat-dialog-close="false"]'
      );
      if (cancelButton instanceof HTMLElement) {
        cancelButton.focus();
      }
    });
  }
}
