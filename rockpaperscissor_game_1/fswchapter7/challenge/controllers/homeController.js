module.exports = {
    landingpage: (req, res) => {
        res.render("landingpage")
        console.log("im in home")
    },
    game: (req, res) => res.render("game"),
    signup: (req, res) => res.render("signup"),
    work: (req, res) => res.render("work"),
    contact: (req, res) => res.render("contact"),
    aboutme: (req, res) => res.render("aboutme"),
    home: (req, res) => res.render("home"),
  
}
