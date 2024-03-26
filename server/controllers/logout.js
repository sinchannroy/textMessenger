
export const logout = (req, res) => {
    req.rootUser.tokens = req.rootUser.tokens.filter((e) => e.token != req.token);
};
