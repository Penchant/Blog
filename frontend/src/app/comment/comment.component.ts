import { Component, OnInit } from '@angular/core';
import {BlogPostsService} from '../blog-posts.service';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments;
  commentForm;
  postId;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private blogPostService: BlogPostsService, ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      body: ''
    });
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId');
      this.blogPostService.getComments(this.postId).subscribe(data => {
        const time = moment(new Date(data.created).toString())
        data.created = time.format('MMMM Do YYYY, h:mm:ss a');
        console.log(data);
        this.comments = data;
      });
    });
  }

  onSubmit(commentData) {
    // Process checkout data here
    console.warn('Your post has been submitted', commentData);

    this.blogPostService.createComment(this.postId, commentData.body);
    this.commentForm.reset();
  }

}
