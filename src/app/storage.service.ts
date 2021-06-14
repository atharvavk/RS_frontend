import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  files: string[];
  dirs: string[];
  pwd: string = '.';
  sourcePath: string = '';
  destinationPath: string = '';
  isMethodCopy = false;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.files = [];
    this.dirs = [];
  }

  async download(filename: string) {
    await this.auth.getSession();
    window.open(
      '/api/download?path=' +
        this.pwd +
        '/' +
        filename +
        '&owner=' +
        this.auth.session.username
    );
  }

  async loadDirectory() {
    await this.http
      .post('/api/storage', { pwd: this.pwd })
      .toPromise()
      .then((data: any) => {
        this.files = data.files;
        this.dirs = data.dirs;
      });
  }

  uploadFile(upFile: any) {
    let formData = new FormData();
    console.log('upfile is', upFile);
    formData.set('pwd', this.pwd);
    formData.append('uploadedFile', upFile);
    const options = {
      reportProgress: true,
    };
    const req = new HttpRequest('POST', '/api/upload', formData, options);
    this.http
      .request(req)
      .toPromise()
      .then((data) => {
        console.log(data);
        this.loadDirectory();
      })
      .catch((err) => console.log(err));
  }
  async mkdir(dirName: string) {
    await this.http
      .post('/api/mkdir', {
        pwd: this.pwd,
        dirName: dirName,
      })
      .toPromise()
      .then((data: any) => {
        window.alert(data.message);
      });
    this.loadDirectory();
  }

  copy() {
    this.http
      .post('/api/copy', {
        source: this.sourcePath,
        destination: this.destinationPath,
      })
      .subscribe((data: any) => {
        window.alert(data.message);
        this.loadDirectory();
      });
    window.alert('pls wait until we copy files for you');
    this.sourcePath = '';
  }

  move() {
    this.http
      .post('/api/move', {
        source: this.sourcePath,
        destination: this.destinationPath,
      })
      .subscribe((data: any) => {
        window.alert(data.message);
        this.loadDirectory();
      });
    window.alert('pls wait until we move files for you');
    this.sourcePath = '';
  }

  delete(path: string) {
    this.http.post('/api/delete', { path: path }).subscribe((data: any) => {
      window.alert(data.message);
      this.loadDirectory();
    });
    window.alert('pls wait until we delete');
  }

  toggleSharing(filename: string) {
    this.http
      .post('/api/toggleSharing', {
        path: this.pwd + '/' + filename,
      })
      .subscribe((data: any) => {
        window.alert(data.message);
      });
    window.alert('pls wait');
  }
}
