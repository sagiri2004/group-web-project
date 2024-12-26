const searchService = require("~/services/searchService");

class SearchController {
  async search(req, res) {
    try {
      const results = await searchService.search(req.query.q);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
