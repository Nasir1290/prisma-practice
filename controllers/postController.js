import prisma from "../prisma/index.js";

const createPost = async (req, res, next) => {
  try {
    const user = await req.user;
    if (!user) {
      throw new Error("Un authenticated user");
    }
    // take info
    const { title, body } = req.body;
    if (!title || !body) {
      throw new Error("Title and body are required");
    }
    // create post
    const createdPost = await prisma.post.create({
      data: {
        title,
        body,
        author: {
          connect: {
            id: user.id,
          },
        },
        userId: user.id,
      },
    });
    if (!createdPost) {
      throw new Error("Failed to create post");
    }
    // send response
    res.status(201).json({
      success: true,
      data: createdPost,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
    console.log(error);
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include:{
        author:{
          select:{
            name:true,
            email:true
          }
        }
      }
    });
    res.status(200).json({
      success: true,
      data: posts,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
  }
};

const getSinglePost = async (req,res) => {
  try {
    // postid
    const postId = req.params.id;
    if (!postId) {
      throw new Error("Invalid post id");
    }
    // get post
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include:{
        author:{
          select:{
            name:true,
            email:true
          }
        }
      }
    });
    if (!post) {
      throw new Error("Post not found");
    }
    // send response
    res.status(200).json({
      success: true,
      data: post,
      message: "Post fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    })
    console.log(error)
  }
};

const updatePost = async (req, res) => {
  try {
    // get user
    const user = req.user;
    if (!user) {
      throw new Error("Unauthenticated user");
    }
    // get post id
    const postId = req.params.id;
    if (!postId) {
      throw new Error("Invalid post id");
    }
    // get info
    const { title, body } = req.body;

    if (!title && !body) {
      throw new Error("Title or body are required");
    }
    // update post
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        body,
      },
    });
    if (!updatedPost) {
      throw new Error("Failed to update post");
    }
    // send response
    res.status(200).json({
      success: true,
      data: updatedPost,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
    console.log(error)
  }
};

export { createPost, updatePost, getAllPost,getSinglePost };
