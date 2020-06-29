const User = require('../models/userModel');
const axios = require('axios');

const userController = {};

userController.getUserId = (req, res, next) => {
  const {
    username
  } = req.body;
  User.find({
      username
    }, '_id')
    .then((found) => {
      console.log('the unique autogen user id found is ', found);
      res.locals.userId = found;
      return next();
    })
    .catch((err) => {
      console.log('error at userController.getUserId!');
      next(err);
    });
};

// get all users 
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log('Err at get users:', err);
      return res.status(500).send(err);
    }
    res.locals.users = users;
    return next();
  })
}

// create user and save user to DB
userController.createUser = (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  User.create({
    username,
    password
  }, (err, data) => {
    if (err) {
      console.log('Error at create user:', err);
      // say it's a duplicate user for now
      return res.status(500).send('Username has been taken!');
    }
    // Handle duplicate username
    // if data is falsy
    if (data) {
      console.log('data from createUser:', data);
      return res.status(200).json({
        logStatus: true
      });
    }
  });
};

// verify user and log in
userController.verifyUser = (req, res) => {
  const {
    username,
    password
  } = req.body;
  console.log(req.body);
  User.findOne({
    username,
    password
  }, (err, data) => {
    if (err) {
      console.log('Error at verify user:', err);
      return res.status(500).send('Username or password is invalid!');
    }
    if (!data) {
      return res.status(500).send('Username or password is invalid!');
    }
    res.status(200).json({
      logStatus: true
    });
  })
}

userController.createCanvas = (req, res, next) => {
  const {
    userId
  } = res.locals;
  // const userId = res.locals.userId;  // equivalent to above
  let canvasData = {};
  console.log('userId is ', userId);
  User.create({
      roomId: userId,
      canvas: canvasData
    }) // <- insert canvas data somehow?
    .then((data) => {
      console.log('A canvas Session created in database');
      next();
    })
    .catch((err) => {
      console.log('error happening in userController.createSession!');
      next(err);
    });
};

userController.getToken = (req, res, next) => {
  const code = req.query.code;
  console.log('clientid: ', process.env.CLIENT_ID)
  console.log('client secret: ', process.env.CLIENT_SECRET)
  axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      res.locals.accessToken = response.data.access_token;
      // send back to client & redirect
      next();
    })
}

userController.getGithubUser = (req, res, next) => {
  axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${res.locals.accessToken}`
      }
    })
    .then(data => {
      if (data) {
        res.cookie('signedin', 'true')
        return res.redirect('/')
      } else {
        return res.redirect('/login')
      }
    })
}

module.exports = userController;