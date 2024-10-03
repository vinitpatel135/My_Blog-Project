const { httpErrors, httpSuccess } = require("../constents");
const PostModel = require("./PostModel");

class PostController extends PostModel {
    constructor() {
        super()
        this.addPost = this.addPost.bind(this)
        this.listPost = this.listPost.bind(this)
        this.listUserPost = this.listUserPost.bind(this)
        this.editPost = this.editPost.bind(this)
        this.deletePost = this.deletePost.bind(this)
    }
    async addPost(req, res) {
        let { userId, title, content } = req.body
        if (!userId || !title || !content) throw httpErrors[400]
        const result = await this.model.create({ ...req.body })
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async listPost(req, res) {
        const result = await this.model.find({}).populate([{path: "userId"}])
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async listUserPost(req, res) {
        const { id } = req.params
        if (!id) throw httpErrors[400]
        const result = await this.model.find({ userId: id })
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async editPost(req, res) {
        let { id } = req.params
        let { title, content } = req.body
        const result = await this.model.findOneAndUpdate({ _id: id }, { title, content }, { new: true });
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async deletePost(req, res) {
        let { id } = req.params
        if(!id) throw httpErrors[400]
        const result = await this.model.deleteOne({_id: id})
        if (!result || result.deletedCount <= 0) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
}

const postController = new PostController()

module.exports = postController