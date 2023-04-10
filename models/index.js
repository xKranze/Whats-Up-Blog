const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

User.hasMany(Blog, {
  foreignKey: 'creator_id',
});

Blog.belongsTo(User, {
  foreignKey: 'creator_id',
});

module.exports = { User, Blog, Comment };
