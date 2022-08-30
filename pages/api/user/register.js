import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
export default async function handler(req, res, next) {
    try {
        const { method } = req;
        console.log("method", method);
        const { email, password, name } = req.body;
        console.log(req.body);
        const checkUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: email }, { name: name }],
            },
        });
        console.log("checkUser", checkUser);
        if (checkUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const saltRounds = 10;
        const myPlaintextPassword = password;
        const pwhashed = await bcrypt.hash(myPlaintextPassword, saltRounds);
        console.log("password", pwhashed);
        const user1 = await prisma.user.create({
            data: {
                ...req.body,
                password: pwhashed,
            },
        });
        res.status(200).json(user1);
    } catch (err) {
        res.status(400).json({ msg: "Erorr, try again" });
    }
}
