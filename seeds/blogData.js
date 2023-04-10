const { Blog } = require('../models');

const blogdata = [
  {
    title: 'Tesla',
    content: `Tesla, Inc. is an American multinational automotive and clean energy company headquartered in Austin, Texas.`,
    creator_id: 'Sal',
    created_date: 'April 20, 2021 07:00:00'
  },
  {
    title: 'Elon Musk',
    content: `Elon Reeve Musk is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner and CEO of Twitter, Inc.; founder of the Boring Company. `,
    creator_id: 'Lernantino',
    created_date: 'June 22, 2021 09:00:00'
  },
  {
    title: 'SpaceX',
    content: `The Space Exploration Technologies Corporation (SpaceX)[9] is an American spacecraft manufacturer, launcher, and a satellite communications corporation headquartered in Hawthorne, California.`,
    creator_id: 'Amiko',
    created_date: 'September 23, 2021 08:30:00'
  },
  {
    title: 'Cryptocurrency',
    content: `A cryptocurrency is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.`,
    creator_id: 'Jordan',
    created_date: 'December 22, 2020 11:00:00'
  },
  {
    title: 'The Boring Company',
    content: `The Boring Company (TBC) is an American infrastructure and tunnel construction services company founded by Elon Musk.`,
    creator_id: 'Blake',
    created_date: 'January 25, 2021 11:00:00'
  },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;