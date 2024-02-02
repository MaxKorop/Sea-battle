class UserController {
    async logIn(req, res) {
        return res.json({ token: "..." });
    }

    async signUp(req, res) {
        return res.json({ token: "..." });
    }
}

module.exports = new UserController()