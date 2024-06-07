const Post = require('./models/postModel');


const createPost = async(req,res) => {

    try {


        new Post({
            id:req.body.id,
            title:req.body.title,
            url:req.file.url,
            description:req.body.description

        });
        const postData = await post.save();

        res.status(200).send({success:true, msg:'Post Data',data:postData});


    } catch (error) {
        res.status(404).send({success:false, msg:error.message});
    }
    

}
modeule.exports = {
    createPost

}