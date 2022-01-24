const Express = require('express');
const router = Express.Router();

router.get('/user', (req, res) => {
    res.send('To register add /register to your current path!', 'To log in add /login to your path!')
});

module.exports = router;