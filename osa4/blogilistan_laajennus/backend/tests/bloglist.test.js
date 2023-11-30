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

describe('author with most blogs', () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: 'Testing 1',
            author: 'Mr Tester',
            url: 'test_url',
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: 'Something is out there',
            author: 'Fear',
            url: 'testtesttest',
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: 'What if this is not working?',
            author: 'Fear',
            url: 'testtesttest',
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: 'Im testing this',
            author: 'Tester 7',
            url: 'testtesttest',
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "Im still testing this",
            author: "Tester 7",
            url: 'testtesttest',
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Thousand tests later",
            author: "Tester 7",
            url: 'testtesttest',
            likes: 2,
            __v: 0
        }  
    ]

    test('when empty list is empty object', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('when list has only one blog is the author of the only blog in the list', () => {
        const result = listHelper.mostBlogs([blogs[0]])
        expect(result).toEqual({author:"Mr Tester", blogs:1})
    })

    test('with a bigger list is the one with highest blog count', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({author:"Tester 7", blogs:3})
    })
})

describe('author with most likes', () => {
    const blogs = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: 'Testing 1',
            author: 'Mr Tester',
            url: 'test_url',
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: 'Something is out there',
            author: 'Fear',
            url: 'testtesttest',
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: 'What if this is not working?',
            author: 'Fear',
            url: 'testtesttest',
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: 'Im testing this',
            author: 'Tester 7',
            url: 'testtesttest',
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "Im still testing this",
            author: "Tester 7",
            url: 'testtesttest',
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Thousand tests later",
            author: "Tester 7",
            url: 'testtesttest',
            likes: 2,
            __v: 0
        }  
    ]

    test('is empty object when the list is empty', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })

    test('is the only author on the list when list has only one blog on it', () => {
        const result = listHelper.mostLikes([blogs[0]])
        expect(result).toEqual({author:"Mr Tester", likes:7})
    })

    test('is the one with highest total like count when bigger list of blogs', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({author:"Fear", likes:17})
    })
})