const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((previous, blog) =>
    previous.likes > blog.likes ? previous : blog
  )
  return {
    title: result.title,
    author: result.author,
    likes: result.likes,
  }
}

const mostBlogs = (blogs) => {
  const authorCount = blogs.reduce((counts, blog) => {
    counts[blog.author] = counts[blog.author] ? counts[blog.author] + 1 : 1
    return counts
  }, {})
  const authors = Object.keys(authorCount)
  const authorWithMostBlogs = authors.reduce((previous, author) => {
    return authorCount[previous] > authorCount[author] ? previous : author
  })
  return {
    author: authorWithMostBlogs,
    blogs: authorCount[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = likes[blog.author]
      ? likes[blog.author] + blog.likes
      : blog.likes
    return likes
  }, {})
  const authors = Object.keys(authorLikes)
  const authorWithMostLikes = authors.reduce((previous, author) => {
    return authorLikes[previous] > authorLikes[author] ? previous : author
  })
  return {
    author: authorWithMostLikes,
    likes: authorLikes[authorWithMostLikes],
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
