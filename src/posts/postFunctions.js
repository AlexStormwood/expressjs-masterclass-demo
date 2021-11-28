const {Post} = require('../database/schemas/PostSchema');

// Model.find() with no conditions inside "find()" will return all documents of that Model
async function getAllPosts(){
    let allPosts = await Post.find();
    return JSON.stringify(allPosts);
}

// The ".exec()" helps the query just run instead of saving it for re-use.
async function getSpecificPost(postID){
    let specificPostQuery = await Post.findById(postID).exec();
    return specificPostQuery;
}

// New Post instance needs to be specifically saved for it to be stored in the database.
async function createSpecificPost(postDetails){
    let newPost = new Post({
        postTitle: postDetails.postTitle,
        postContent: postDetails.postContent,
        postAuthorID: postDetails.postAuthorID
    })
    let creationResult = await newPost.save();
    return creationResult;
}

// Theoretically, you could use this instead of "new Post({})" thanks to upsert.
async function updateSpecificPost(postDetails){
    let updateResult = await Post.findByIdAndUpdate(
        {_id: postDetails.postID},
        {
            postTitle: postDetails.postTitle,
            postContent: postDetails.postContent,
            postAuthorID: postDetails.postAuthorID
        },
        { 
            upsert: true, // upsert means it'll create document if it doesn't exist
            new: true // return the new modified doc. if false, original is returned.
        } 
    );

    return updateResult;
}

// Returns an empty object if all goes well.
async function deleteSpecificPost(postID){
    let deletionResult = await Post.deleteOne({ _id: postID});
    return deletionResult;
}

module.exports = {
    getAllPosts, getSpecificPost, createSpecificPost, updateSpecificPost, deleteSpecificPost
}