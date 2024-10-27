const authService = require("~/services/authService");

class AuthController {
    
    async login(req, res) {
      const rawUserData = req.body;
      const result = await authService.loginUser(rawUserData);
  
      res.json(result);
    }
  
    async logout(req, res) {
      const result = await authService.logoutUser();
  
      res.json(result);
    }
}

module.exports = new AuthController();
