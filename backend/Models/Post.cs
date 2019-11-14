using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi
{
    //[Table("posts")]
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public DateTime Created { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public bool Archived { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
