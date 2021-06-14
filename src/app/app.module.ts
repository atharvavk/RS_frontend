import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserStorageComponent } from './user-storage/user-storage.component';
import { FileComponent } from './file/file.component';
import { DirectoryComponent } from './directory/directory.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, UserStorageComponent, FileComponent, DirectoryComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule ,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
