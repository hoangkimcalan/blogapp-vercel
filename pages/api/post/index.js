import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    if (req.method === "POST") {
        try {
            console.log(req.method);
            const { title, content, category, published, authorId } = req.body;
            console.log("authorid", authorId);
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    category,
                    published,
                    authorId,
                },
            });
            console.log("post", post);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json({ msg: "Erorr, try again" });
        }
    } else {
        try {
            console.log("req.query", req.query.category == "all");
            console.log("req.query", req.query);
            if (req.query.title == "" || req.query.title == undefined) {
                const posts = await prisma.post.findMany({
                    where: { published: "True" },
                    include: {
                        author: true,
                    },
                    orderBy: {
                        views: "desc",
                    },
                });
                res.status(200).json(posts);
            } else {
                if (req.query.category == "all") {
                    const posts = await prisma.post.findMany({
                        where: { published: "True" },
                        include: {
                            author: true,
                        },
                        orderBy: {
                            views: "desc",
                        },
                    });
                    res.status(200).json(posts);
                } else {
                    const posts = await prisma.post.findMany({
                        where: {
                            published: "True",
                            AND: [
                                {
                                    title: {
                                        contains: req.query.title,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    category: req.query.category,
                                },
                            ],
                        },
                        orderBy: {
                            views: "desc",
                        },
                        include: {
                            author: true,
                        },
                    });
                    console.log("postss", posts);
                    res.status(200).json(posts);
                }
            }
        } catch (error) {
            res.status(400).json({
                message: "Không lấy được danh sách",
            });
        }
    }
}
