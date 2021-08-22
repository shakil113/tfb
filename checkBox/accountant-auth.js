module.exports = (req, res, next) => {
    if (!req.session.isAccountantLoggedIn) {
        return res.redirect('/accountant/accountant-login');
    }
    next();
}