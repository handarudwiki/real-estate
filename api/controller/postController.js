import prisma from "../lib/prisma.js";

export const addPost = async (req, res) => {
  try {
    const body = req.body;
    const id = req.userId;

    console.log("Post Data:", body.postData);
    console.log("Post Detail:", body.postDetail);
    console.log(id);
    const newPost = await prisma.post.create({
      data: {
        title: body.postData.title,
        address: body.postData.address,
        bathroom: body.postData.bathroom,
        bedroom: body.postData.bedroom,
        city: body.postData.city,
        latitude: body.postData.latitude,
        longitude: body.postData.longitude,
        userId: id,
        price: body.postData.price,
        property: body.postData.property,
        type: body.postData.type,
        images: body.postData.images,
        postDetail: {
          create: {
            description: body.postDetail.description,
            bus: body.postDetail.bus,
            income: body.postDetail.income,
            pet: body.postDetail.pet,
            restaurant: body.postDetail.restaurant,
            school: body.postDetail.school,
            size: body.postDetail.size,
            utilities: body.postDetail.utilities,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getAllPost = async (req, res) => {
  try {
    const query = req.query;
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    return res.status(200).json({
      status: "error",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "post not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
export const deletePost = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
