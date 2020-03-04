import mongoose from "mongoose";

const {Schema} = mongoose;

const PostSchema = new Schema({
    title: String,
    level: String,
    time: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
