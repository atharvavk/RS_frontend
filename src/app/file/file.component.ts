import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
})
export class FileComponent implements OnInit {
  @Input('name') filename: string = 'init';
  constructor(private fileSys: StorageService) {}

  setSourcePath(isMethodCopy: boolean) {
    this.fileSys.sourcePath = this.fileSys.pwd + '/' + this.filename;
    this.fileSys.isMethodCopy = isMethodCopy;
  }

  async download() {
    let res = this.fileSys.download(this.filename);
  }

  deleteThis() {
    this.fileSys.delete(this.fileSys.pwd + '/' + this.filename);
  }

  toggleSharingStatus() {
    this.fileSys.toggleSharing(this.filename);
  }

  ngOnInit(): void {}
}
