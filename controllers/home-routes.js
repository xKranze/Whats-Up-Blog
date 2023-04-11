const router = require('express').Router();
const { Blog, Comment } = require('../models');
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
      username: req.session.username 
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
    const dbBlogData = await Blog.findByPk(req.params.id, {
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
    res.render('blog', { blog, loggedIn: req.session.loggedIn, username: req.session.username  });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
// Use the custom middleware before allowing the user to access the blog
// Comment just added, blog is redrawn with the new comments.
router.post('/blog/comment/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }

  try {
    const newComment = await Comment.create({
      blog_id: req.params.id,
      content: req.body.content,
      creator_id: req.session.username,
      created_date: new Date()
    })

    if (!newComment) {
      res.status(400).send("Could not create new comment.");
      return;
    }

    const dbBlogData = await Blog.findByPk(req.params.id, {
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
    for(var i = 0; i < blog.comments.length; i++){
      blog.comments[i].username = req.session.username
    }
    res.render('blog', { blog, loggedIn: req.session.loggedIn, username: req.session.username });
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
        creator_id: req.session.username
      }
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for currently logged in user
router.get('/dashboard/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }
  
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
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
    res.render('dashboard_blog', { blog, loggedIn: req.session.loggedIn, username: req.session.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add new blog post
router.post('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }

  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      creator_id: req.session.username,
      created_date: new Date()
    })

    if (!newBlog) {
      res.status(400).send("Could not create new blog.");
      return;
    }

    const dbBlogData = await Blog.findAll({
      where: {
        creator_id: req.session.username
      }
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit blog post
router.post('/dashboard/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }

  try {
    const newBlog = await Blog.update({
      title: req.body.title,
      content: req.body.content,
      creator_id: req.session.username,
      created_date: new Date()
    }, 
    {
      where: {id: req.params.id}
    })

    if (!newBlog) {
      res.status(400).send("Could not create new blog.");
      return;
    }

    const dbBlogData = await Blog.findAll({
      where: {
        creator_id: req.session.username
      }
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for currently logged in user after a delete of a blog
router.post('/dashboard/delete/:id', async (req, res) => {
  console.log("asdaskfbhaisfhgbaishdbfgakjdfhnajkdfhsnakjfhdnkajsdfbhnakjsfbn");
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }
  
  try {
    const destroyedBlog = await Blog.destroy({
      where: { id: req.params.id},
    });

    if (!destroyedBlog) {
      res.status(400).send("Could not create new blog.");
      return;
    }

    const dbBlogData = await Blog.findAll({
      where: {
        creator_id: req.session.username
      }
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
// Use the custom middleware before allowing the user to access the blog
// Comment just added, blog is redrawn with the new comments.
router.post('/dashboard/comment/:id', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.render('login');
    return;
  }

  try {
    const newComment = await Comment.create({
      blog_id: req.params.id,
      content: req.body.content,
      creator_id: req.session.username,
      created_date: new Date()
    })

    if (!newComment) {
      res.status(400).send("Could not create new comment.");
      return;
    }

    const dbBlogData = await Blog.findByPk(req.params.id, {
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
    for(var i = 0; i < blog.comments.length; i++){
      blog.comments[i].username = req.session.username;
    }
    res.render('dashboard_blog', { blog, loggedIn: req.session.loggedIn, username: req.session.username });
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
