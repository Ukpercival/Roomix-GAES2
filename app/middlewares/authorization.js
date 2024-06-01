export const isAuthenticated = (req, res, next) => {
    if (req.cookies.jwt) {
        return next();
    } else {
        res.redirect('/inicio');
    }
}