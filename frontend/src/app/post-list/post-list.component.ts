import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogPostsService } from '../blog-posts.service';
import {AuthService} from '../auth.service';
import {concatMap, map} from 'rxjs/operators';
import {from, Observable, of} from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [BlogPostsService]
})
export class PostListComponent implements OnInit {
  posts = [];
  constructor(private blogPostService: BlogPostsService, public authService: AuthService) {
      this.blogPostService.getPosts().subscribe(posts => {
          posts.map(post => {
            const time = moment(new Date(post.created).toISOString())
            post.created = time.format('MMMM Do YYYY, h:mm:ss a');
            return post;
          });
          this.posts = posts as any[];
        });
  }

  ngOnInit() {
  }

  archivePost(postId : number) {
    this.blogPostService.deletePost(postId);
    this.posts.find(post => post.id == postId).archived = true;
  }
  unarchivePost(postId : number) {
    this.blogPostService.unDeletePost(postId);
    this.posts.find(post => post.id == postId).archived = false;
  }
}
