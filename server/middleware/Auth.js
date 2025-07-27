function isAuthenticated(req, res, next) {
    console.log('🔒 Checking auth middleware...');
    console.log('🔑 req.session:', req.session);
    if (req.session && req.session.user) {
        req.user = req.session.user;
        return next();
    }
    return res.status(401).json({message: 'Unauthorized'});
}
module.exports = {isAuthenticated};