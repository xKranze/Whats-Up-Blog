const { Comment } = require('../models');

const commentdata = [
  {
    creator_id: 'Blake',
    created_date: 'March 30, 2018',
    blog_id: 1,
    content:
      'Tesla is soo cool with their fsd.',
  },
  {
    creator_id: 'Jordan',
    created_date: 'May 05, 2017',
    blog_id: 1,
    content: 'Tesla sucks!!!.',
  },
  {
    creator_id: 'Sal',
    created_date: 'June 10, 2019',
    blog_id: 2,
    content: 'Elon has cool hair.',
  },
  {
    creator_id: 'Amiko',
    created_date: 'July 4, 2020',
    blog_id: 2,
    content: 'Elon talks way too much!.',
  },
  {
    creator_id: 'Jordan',
    created_date: 'August 14, 2016',
    blog_id: 2,
    content: 'Elon is like the tony stark!.',
  },
  {
    creator_id: 'Sal',
    created_date: 'October 15, 2018',
    blog_id: 3,
    content:
      'SpaceX needs to make thier stock public!.',
  },
  {
    creator_id: 'Lernantino',
    created_date: 'November 3, 2016',
    blog_id: 3,
    content:
      'SpaceX is soo cool!.',
  },
  {
    creator_id: 'Amiko',
    created_date: 'December 24, 2020',
    blog_id: 4,
    content:
      'I used all my savings to buy bitcoin!.',
  },
  {
    creator_id: 'Blake',
    created_date: 'January 20, 2018',
    blog_id: 4,
    content:
      'I went bankrupt due to dogecoin!!!.',
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
