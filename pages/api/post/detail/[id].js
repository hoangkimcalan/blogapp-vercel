import prisma from "../../../../lib/prisma";

import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handle(req, res) {
    console.log("req method", req.method);
    if (req.method === "GET") {
        try {
            console.log("req.query.id", req.query.id);
            const idpost = req.query.id;
            const checkPost = await prisma.post.findFirst({
                where: {
                    id: idpost,
                },
                include: { author: true },
            });
            console.log("checkUser", checkPost);
            if (checkPost) {
                res.status(200).json(checkPost);
            } else {
                res.status(400).json({ msg: "Error, try again" });
            }
            console.log(post);
        } catch (error) {}
    } else {
        if (req.method == "PUT") {
            try {
                console.log(req.method);
                const tokenHeader = req.headers.cookie;
                const idpost = req.query.id;
                const cookies = cookie.parse(tokenHeader || "");
                // console.log(".....", cookies.user);
                var decoded = jwt.verify(cookies.user, "1234");
                console.log("decoded", decoded.userId);
                const userIdLiked = decoded.userId;
                const { likes } = req.body.data;
                console.log("like", typeof userIdLiked);

                const isLikedPost = await prisma.post.findFirst({
                    where: {
                        idLiked: {
                            has: userIdLiked,
                        },
                    },
                });
                console.log("isLikedPost", isLikedPost);
                if (!isLikedPost) {
                    const checkPost = await prisma.post.update({
                        where: {
                            id: idpost,
                        },
                        data: {
                            idLiked: {
                                push: userIdLiked,
                            },
                            likes: likes + 1,
                        },
                        include: { author: true },
                    });
                    console.log("checkPost", checkPost);
                    res.status(200).json(checkPost);
                } else {
                    try {
                        const { idLiked } = await prisma.post.findUnique({
                            where: { id: idpost },
                            select: { idLiked: true },
                        });

                        const checkPost = await prisma.post.update({
                            where: {
                                id: idpost,
                            },
                            data: {
                                idLiked: {
                                    set: idLiked.filter((id) => id == ""),
                                },
                                likes: likes - 1,
                            },
                            include: { author: true },
                        });
                        console.log("checkPost222", checkPost);
                        res.status(200).json(checkPost);
                    } catch (err) {
                        console.log("err", err);
                    }
                }
            } catch (error) {
                res.status(400).json({ msg: "Error, try again" });
            }
        } else {
            try {
                console.log("Patchhhh", req.method);
                const idpost = req.query.id;
                const { views } = req.body.data;
                // console.log("req.body", views);
                const checkPost = await prisma.post.update({
                    where: {
                        id: idpost,
                    },

                    data: {
                        views: views + 1,
                    },
                    include: { author: true },
                });
                // console.log("checkPost", checkPost);
                res.status(200).json(checkPost);
            } catch (error) {
                res.status(400).json({ msg: "Error, try again" });
            }
        }
    }
}
