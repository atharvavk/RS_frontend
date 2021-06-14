import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-user-storage',
  templateUrl: './user-storage.component.html',
  styleUrls: ['./user-storage.component.css'],
})
export class UserStorageComponent implements OnInit {
  username: string = '';
  newDir: string = '';

  get sourcePath() {
    return this.fileSys.sourcePath;
  }

  pasteHere() {
    this.fileSys.destinationPath = this.fileSys.pwd;
    if (this.fileSys.isMethodCopy) {
      this.fileSys.copy();
    } else {
      this.fileSys.move();
    }
  }

  constructor(
    private auth: AuthenticationService,
    private fileSys: StorageService
  ) {}

  get pwd() {
    return this.fileSys.pwd;
  }

  get Dirs() {
    return this.fileSys.dirs;
  }
  get Files() {
    return this.fileSys.files;
  }

  parentDirectory() {
    let lastSlash = this.fileSys.pwd.lastIndexOf('/');
    this.fileSys.pwd = this.fileSys.pwd.slice(0, lastSlash);
    this.fileSys.loadDirectory();
  }

  selectedFiles(event: any) {
    let files = event.target.files;
    for (let file of files) {
      console.log(file);
      this.fileSys.uploadFile(file);
    }
  }

  mkdir() {
    let exists = false;
    for (let dir of this.Dirs) {
      if (dir === this.newDir) {
        exists = true;
        break;
      }
    }
    if (exists) {
      window.prompt('directory already exists');
    } else {
      this.fileSys.mkdir(this.newDir);
    }
  }

  async ngOnInit() {
    await this.auth.getSession();
    this.username = this.auth.session.username;
    await this.fileSys.loadDirectory();
  }

}
