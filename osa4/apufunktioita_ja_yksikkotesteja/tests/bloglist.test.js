const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Testing 1',
          author: 'Mr Tester',
          url: 'test_url',
          likes: 5,
          __v: 0
      }
    ]
    const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Testing 1',
            author: 'Mr Tester',
            url: 'test_url',
            likes: 5,
            __v: 0
        },
        {
            _id: '558b3292f3572652a58525c7',
            title: 'Something is out there',
            author: 'Fear',
            url: 'testtesttest',
            likes: 6,
            __v: 0
        },
    ]

    test('of empty list is zero', () => {
        blogs = []
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(11)
    })
})

describe('favorite blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Testing 1',
            author: 'Mr Tester',
            url: 'test_url',
            likes: 5,
            __v: 0
        }
    ]
    const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Testing 1',
            author: 'Mr Tester',
            url: 'test_url',
            likes: 5,
            __v: 0
        },
        {
            _id: '558b3292f3572652a58525c7',
            title: 'Something is out there',
            author: 'Fear',
            url: 'testtesttest',
            likes: 6,
            __v: 0
        },
        {
            _id: '538b3d92f3572852a58a25c7',
            title: 'I dont know what im doing',
            author: 'Lost',
            url: 'testtesttest',
            likes: 6,
            __v: 0
        },
    ]

    test('of empty list is empty object', () => {
        blogs = []
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({})
    })

    test('when list has only one blog is the favorite blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('of a bigger list is the one with most likes', () => {
        const result = listHelper.favoriteBlog(listWithMoreBlogs)
        expect(result).toEqual(listWithMoreBlogs[1])
    })
})