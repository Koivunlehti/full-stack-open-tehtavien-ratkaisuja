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

const mostBlogs = (blogs) => {
    const blogAmounts = []
    // Käydään läpi kaikki blogit ja kerätään pelkät authorit ja niiden esiintymiskerrat uuteen taulukkoon
    blogs.forEach(blog => {
        // Jos blogAmounts on tyhjä, lisätään sinne tämän kierroksen author ja merkataan että sillä on 1 blogi
        if (blogAmounts.length === 0) {     
            blogAmounts.push({author:blog.author, blogs:1})
        }
        else {
            let found = false
            // Käydään läpi blogAmountsiin tähän mennessä lisätyt authorit
            blogAmounts.forEach(author => {
                // jos author löytyy jo blogAmounts taulukosta, lisätään authorin blogilaskuria yhdellä ja merkataan että author löytyi.
                if (blog.author === author.author){
                    author.blogs += 1
                    found = true
                }
            })
            // Jos authoria ei löytynyt blogAmounts taulukosta tällä kierroksella, lisätään uusi author blogAmounts taulukkoon ja merkataan että sillä on 1 blogi
            if (found === false){      
                blogAmounts.push({author:blog.author, blogs:1})
            }
        }
    });
    // Käydään läpi yllä kerätyt authorit ja selvitetään kenellä on eniten blogeja.
    let mostBlogs = {}
    blogAmounts.forEach(author => {
        if (!mostBlogs.blogs)
            mostBlogs = author
        else 
            if (mostBlogs.blogs < author.blogs) 
            mostBlogs = author
    })
    return mostBlogs
}

module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
}