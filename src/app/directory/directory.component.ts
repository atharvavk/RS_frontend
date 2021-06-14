import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
})
export class DirectoryComponent implements OnInit {
  @Input('name') dirname: string = 'init';
  constructor(private fileSys: StorageService) {}

  async browseDirectory() {
    this.fileSys.pwd = this.fileSys.pwd + '/' + this.dirname;
    await this.fileSys.loadDirectory();
  }

  setSourcePath(isMethodCopy: boolean) {
    this.fileSys.sourcePath = this.fileSys.pwd + '/' + this.dirname;
    this.fileSys.isMethodCopy = isMethodCopy;
  }

  deleteThis() {
    this.fileSys.delete(this.fileSys.pwd + '/' + this.dirname);
  }

  ngOnInit(): void {}
}
