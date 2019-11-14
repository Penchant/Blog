import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {

  constructor(private http: HttpClient, public authService: AuthService) { }

  createPost(post : FormData): Subscription {
    return this.http.post('/api/posts', post).subscribe();
  }
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>('/api/posts');
  }
  getPosts(): Observable<any[]> {
  return this.authService.isLoggedIn ? this.getAllPosts() : this.getPublicPosts();
  }
  getPublicPosts(): Observable<any[]> {
    return this.http.get<any>('/api/posts?archived=false');
  }
  getPost(postId: number): Observable<any> {
    return this.http.get<any>(`/api/posts/${postId}`);
  }
  deletePost(postId: number): Subscription {
    return this.http.delete(`/api/posts/${postId}`).subscribe();
  }
  unDeletePost(postId: number): Subscription {
    const formData = new FormData();
    formData.append('archived', 'false');
    return this.http.put(`/api/posts/${postId}/archived`, formData).subscribe();
  }
  updatePost(postId: number, title: string, body: string, created: string ): Subscription {
    const formData = new FormData();
    formData.append('body', body);
    formData.append('title', title);
    formData.append('id', postId.toString());
    formData.append('created', created);
    return this.http.put(`/api/posts/${postId}`, formData).subscribe();
  }

  createComment(postId: number, comment: string): Subscription {
    const formData = new FormData();
    formData.append('body', comment);
    return this.http.post(`/api/posts/${postId}/comments`, formData).subscribe();
  }

  getComments(postId: number): Observable<any> {
    return this.http.get<any>(`/api/posts/${postId}/comments`);
  }

}
