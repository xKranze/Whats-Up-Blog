const router = require('express').Router();
const {  Blog, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll();

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
// Use the custom middleware before allowing the user to access the blog
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await  Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'creator_id',
            'created_date',
            'content',
          ],
        },
      ],
    });
    const blog = dbBlogData.get({ plain: true });
    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for currently logged in user
router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }

  try {
    const dbBlogData = await Blog.findAll({
      where: {
        creator_id: res.session.username
      }
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
