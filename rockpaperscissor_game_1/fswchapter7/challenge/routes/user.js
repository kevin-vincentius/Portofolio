const router = require("express").Router()
const authController = require("../controllers/authController")
const userController = require("../controllers/userController")
const homeController = require("../controllers/homeController");
const restrict = require("../middlewares/restrict")


//get
router.get("/", homeController.landingpage);
router.get("/game", homeController.game);
router.get("/signup", homeController.signup);
router.get("/work", homeController.work);
router.get("/contact", homeController.contact);
router.get("/aboutme", homeController.aboutme);
router.get("/home", homeController.home);
router.get("/register", userController.register_page)
router.get("/login", userController.login_page)
router.get("/dashboard", userController.dashboard_page)
router.get("/dashboard/register", userController.register_page)
router.get("/dashboard/update/(:id)", userController.update_user_page)
router.get("/dashboard/delete/(:id)", userController.delete_user)
router.get("/user-game", userController.user_game_page)
router.get("/user-game-biodata", userController.user_game_biodata_page)
router.get("/user-game-history", userController.user_game_history_page)

//post
router.post("/login", userController.login)
router.post("/register", authController.register)
router.post("/dashboard/update/(:id)", userController.update_user)

// authorization
router.post("/create-room", restrict, authController.create_room)
router.post("/fight/(:room_id)", restrict, authController.fight)
router.get("/fight/(:room_id)", restrict, authController.fight_result)

module.exports = router;

