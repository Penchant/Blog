using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BlogApi.Models
{
    public partial class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions<BlogContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comment { get; set; }
        public virtual DbSet<Post> Post { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("posts");

                entity.HasIndex(e => e.Id)
                    .HasName("id_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");
                

                entity.Property(e => e.Archived).HasColumnName("archived");

                entity.Property(e => e.Body)
                    .HasColumnName("body")
                    .HasColumnType("varchar(1000)")
                    .HasCharSet(Pomelo.EntityFrameworkCore.MySql.Storage.CharSet.Utf8Mb4);

                entity.Property(e => e.Created)
                    .HasColumnName("created")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("'CURRENT_TIMESTAMP'");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasColumnType("varchar(120)")
                    .HasCharSet(Pomelo.EntityFrameworkCore.MySql.Storage.CharSet.Utf8Mb4);

                #region Owned Types

                var comment = entity.OwnsMany(post => post.Comments, comment => 
                {
                    comment.WithOwner().HasForeignKey("PostId");

                    comment.ToTable("comments");

                    comment.HasIndex(e => e.PostId)
                        .HasName("postId_idx");

                    comment.Property(e => e.Id)
                        .HasColumnName("id")
                        .HasColumnType("int(11)");
                    comment.HasKey("Id");

                    comment.Property(e => e.Body)
                        .HasColumnName("body")
                        .HasColumnType("varchar(280)")
                        .HasCharSet(Pomelo.EntityFrameworkCore.MySql.Storage.CharSet.Utf8Mb4);

                    comment.Property(e => e.PostId)
                        .HasColumnName("postId")
                        .HasColumnType("int(11)");
                    comment.HasOne(d => d.Post)
                        .WithMany(p => p.Comments)
                        .HasForeignKey(d => d.PostId)
                        .HasConstraintName("postId");
                });

                #endregion

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
