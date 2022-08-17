using GMQ_Quotes.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GMQ_Quotes.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Quote> Quotes => Set<Quote>();
    }
}
