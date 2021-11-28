const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postTitle: String,
    postContent: String,
    postAuthorID: String
})

PostSchema.methods.getAuthorName = async function getAuthorName(){
    console.log(`Use your auth system to search for a user with ID of ${this.postAuthorID} and get their username/displayname.`)
}


// Make sure this is last;
// The ".model()" process bundles up all properties & methods written above into the model,
// but it won't capture properties or methods written after ".model()" within this file.
const Post = mongoose.model('Post', PostSchema);

module.exports = {Post}