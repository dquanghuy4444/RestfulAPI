const express = require('express');
const router = express.Router();
const Post = require('../models/Posts');

router.get('/' , async (req , res) =>{
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err){
        res.json({ message : err })
    }
})

router.get('/:postid' , async (req , res) =>{
    try {
        const postid = req.params.postid;
        const post = await Post.findById(postid);
        res.json(post);
    } catch (error) {
        res.json({ message : error })
    }
})

router.delete('/:postid' , async (req , res) =>{
    try {
        const postid = req.params.postid;
        const removedPost = await Post.remove({_id: postid});
        res.json(removedPost);
    } catch (error) {
        res.json({ message : error })
    }
})

router.patch('/:postid' , async (req , res) =>{
    try {
        const postid = req.params.postid;
        const title = req.query.title;
        const updatedPost = await Post.updateOne({_id: postid},{
            $set:{
                title: title
            }
        });
        res.json(updatedPost);
    } catch (error) {
        res.json({ message : error })
    }
})

router.post('/' , async (req , res) =>{
    const post = new Post({
        title: req.query.title,
        text: req.query.text
    })

    const savePost = await post.save()
    .then((data) =>{
        res.json(data);
    })
    .catch((err) => res.json({ message : err }));

    res.json(savePost);

})

module.exports = router;