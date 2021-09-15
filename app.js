const express = require('express');
const sequelize = require('./db/db');
const {Op} = require('sequelize');
const User = require('./models/models');
const models = require('./models/models');

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  try {
    const users = await User.findAll({where: {
      [Op.or]: [
        { age: { [Op.between]: [15, 23] }},
        { name: { [Op.in]: ['Даниэль', 'Kirill'] }}
      ]
    }});
    res.render('index', {
      users
    });
  } catch (e) {
    console.log(e);
  }
});

app.get('/create', (req, res) => {
  res.render('create')
});

app.post('/create', async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);

    const {name, age} = req.body;
    const user = await User.create({name, age});
    res.redirect('/')
  } catch (e) {
    console.log(e);
  }
});

app.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({where: {id: id}, raw: true});
    user.active = 'no_active',
    await User.update({active: 'no_active'}, { where: {id}, raw: true});
    console.log(user);
    res.render('edit', {
      user
    })
  } catch (e) {
    console.log(e);
  }
});

app.post('/edit', async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(404);

    const {id, name, age} = req.body;
    const user = await User.update({name, age}, {where: {id}});
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

app.post('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.destroy({where: {id} });
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Start is port - ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();