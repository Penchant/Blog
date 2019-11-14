using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogApi
{
    [Table("comments")]
    public partial class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public int PostId { get; set; }

        [JsonIgnore]
        public virtual Post Post { get; set; } 
    }
}
