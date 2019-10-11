import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { BlogPostsService } from '../blog-posts.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {
  blogPostForm;
  postId = -1;
  constructor(private formBuilder: FormBuilder, private blogPostService: BlogPostsService, private route: ActivatedRoute,
              public router: Router, ) { }

  ngOnInit() {
    this.blogPostForm = this.formBuilder.group({
      title: '',
      body: ''
    });
    this.route.data.subscribe((data) => {
       if (data.kind === 'edit') {
        this.route.paramMap.subscribe(params => {
          this.blogPostService.getPost(+params.get('postId')).subscribe(post => {
            console.log(post);
            this.postId = post.id;
            console.log(this.blogPostForm);
            this.blogPostForm.controls.title.setValue(post.title);
            this.blogPostForm.controls.body.setValue(post.body);
          });
        });
      }
    });
  }

  onSubmit(postData) {
    // Process checkout data here
    console.warn('Your post has been submitted', postData);
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    // formData.append('title', )
    if (this.postId !== -1) {
      this.blogPostService.updatePost(this.postId, postData.title, postData.body);
    } else {
      this.blogPostService.createPost(formData);
    }
    this.router.navigateByUrl('/');
  }
}
