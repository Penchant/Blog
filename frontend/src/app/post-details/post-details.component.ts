import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {BlogPostsService} from '../blog-posts.service';
import * as moment from 'moment';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post;
  constructor(private route: ActivatedRoute, private blogPostService: BlogPostsService, public router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.blogPostService.getPost(+params.get('postId')).subscribe(data => {
        const time = moment(new Date(data.created).toString());
        data.created = time.format('MMMM Do YYYY, h:mm:ss a');
        // If the post is deleted, route unauthenticated users to the list of posts
        if (data.archived && !this.authService.isLoggedIn) {
          this.router.navigateByUrl('/');
          return;
        }
        this.post = data;
      });
    });
  }

}
