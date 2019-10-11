import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  constructor(private http: HttpClient) { }

  createPost(post) {
    this.http.post('/api/posts', post).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  getPosts() {
   return this.http.get<any[]>('/api/posts').pipe(map(res => {
     return res;
   }));
  }
  getPublicPosts() {
    return this.http.get<any[]>('/api/posts?archived=false').pipe(map(res => {
      return res;
    }));
  }
  getPost(postId) {
    return this.http.get<any>(`/api/posts/${postId}`).pipe(map(res => {
      return res;
    }));
  }
  deletePost(postId) {
    return this.http.delete(`/api/posts/${postId}`).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }
  unDeletePost(postId) {
    return this.http.put(`/api/posts/${postId}?archived=false`, new FormData()).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  updatePost(postId, title, body) {
    const formData = new FormData();
    formData.append('body', body);
    formData.append('title', title)
    this.http.put(`/api/posts/${postId}`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  createComment(postId, comment) {
    const formData = new FormData();
    formData.append('body', comment);
    this.http.post(`/api/posts/${postId}/comments`, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getComments(postId) {
    return this.http.get<any>(`/api/posts/${postId}/comments`).pipe(map(res => {
      return res;
    }));
  }

}
