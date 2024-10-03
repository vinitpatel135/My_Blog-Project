const { Router } = require("express")
const asyncHandeler = require("express-async-handler")
const postController = require("./PostController")
const userController = require("../Users/UserController")

const postRouter = Router()

postRouter.post("/add", userController.AuthGard ,asyncHandeler(postController.addPost))
postRouter.get("/", asyncHandeler(postController.listPost))
postRouter.get("/userpost/:id", userController.AuthGard , asyncHandeler(postController.listUserPost))
postRouter.put("/edit/:id", userController.AuthGard , asyncHandeler(postController.editPost))
postRouter.delete("/delete/:id", userController.AuthGard , asyncHandeler(postController.deletePost))

module.exports = postRouter