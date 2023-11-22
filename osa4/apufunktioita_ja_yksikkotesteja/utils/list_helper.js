const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (blogs) => {
    total = 0
    blogs.forEach(blog => {
        total += blog.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    favBlog = {}
    blogs.forEach(blog => {
        if (!favBlog.likes)
            favBlog = blog
        else 
            if (favBlog.likes < blog.likes) 
            favBlog = blog
    });
    return favBlog
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }