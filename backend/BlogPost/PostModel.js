const { default: mongoose } = require("mongoose");

class PostModel {
    constructor() {
        this.schema = new mongoose.Schema({
            userId: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_users" },
            title: { type: String, required: true },
            content: { type: String, required: true },
        }, { timestamps: true })

        this.model = mongoose.model("tbl_posts", this.schema)
    }
}

module.exports = PostModel