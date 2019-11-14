using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApi;
using BlogApi.Models;

namespace BlogApi.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly BlogContext _context;

        public PostController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts(bool archived = true)
        {
            // If only unarchived posts should be returned
            if(!archived){
                return await _context.Post.Where(post => post.Archived == false).ToListAsync();
            }
            return await _context.Post.ToListAsync();
        }

        // GET: api/posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/posts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, [FromForm]Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/posts
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost([FromForm]Post post)
        {
            _context.Post.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/posts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            post.Archived = true;
            await _context.SaveChangesAsync();

            return post;
        }

        // PUT: api/posts/5/archived
        [HttpPut("{id}/archived")]
        public async Task<ActionResult<Post>> PatchPost(int id, [FromForm]bool archived)
        {
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            post.Archived = archived;
            await _context.SaveChangesAsync();

            return post;
        }

        private bool PostExists(int id)
        {
            return _context.Post.Any(e => e.Id == id);
        }

        // GET: api/posts/5/comments
        [HttpGet("{postId}/comments")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int postId)
        {
            return Ok((await _context.Post.FindAsync(postId)).Comments);
        }

        // GET: api/posts/5/comments
        [HttpGet("{postId}/comments/{commentId}")]
        public async Task<ActionResult<Comment>> GetComment(int postId, int commentId)
        {
            return Ok((await _context.Post.FindAsync(postId)).Comments.First(comment => comment.Id == commentId));
        }

        // POST: api/posts/comments
        [HttpPost("{postId}/comments")]
        public async Task<ActionResult<Post>> PostComment(int postId, [FromForm]Comment comment)
        {
            (await _context.Post.FindAsync(postId)).Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { postId = postId, commentId = comment.Id }, comment);
        }

    }
}
