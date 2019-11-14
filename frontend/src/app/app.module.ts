import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { PostEditorComponent } from './post-editor/post-editor.component';
import {ReactiveFormsModule} from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CommentComponent } from './comment/comment.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PostEditorComponent,
    PostListComponent,
    PostDetailsComponent,
    CommentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
      .forRoot([
        {path: 'createPost', component: PostEditorComponent, canActivate: [AuthGuard], data: {kind: 'create'}},
        {path: 'posts/:postId', component: PostDetailsComponent},
        {path: 'login', component: LoginComponent},
        {path: 'posts/:postId/edit', component: PostEditorComponent, canActivate: [AuthGuard], data: {kind: 'edit'}},
         {path: '', component: PostListComponent},
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
