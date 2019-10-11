import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BlogPostsService } from '../blog-posts.service';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts;
  constructor(private blogPostService: BlogPostsService, public authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.blogPostService.getPosts().subscribe(data => this.processPosts(data));
    } else {
      this.blogPostService.getPublicPosts().subscribe(data => this.processPosts(data));
    }
  }

  processPosts( posts) {
    posts.forEach((post) => {
      const time = moment(new Date(post.created).toISOString())
      post.created = time.format('MMMM Do YYYY, h:mm:ss a');
    });
    this.posts = posts;
  }

  ngOnInit() {
  }
}
