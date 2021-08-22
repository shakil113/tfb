module.exports = (req, res, next) => {
    if (!req.session.isModeratorLoggedIn) {
        return res.redirect('/moderator/moderator-login');
    }
    
    next();
}