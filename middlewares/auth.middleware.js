const User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
    const userId = req.signedCookies.userId
    const user = await User.findOne({_id: userId})

    if(!userId || !user) {
        res.redirect('/auth/login')
    }

    res.locals.user = user;

    next();
}