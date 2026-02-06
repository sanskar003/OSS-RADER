import { Router, Request, Response } from "express"
import axios from "axios"

let router = Router();

router.post("/profile", async(req: Request, res: Response) => {
    const { accessToken }  = req.body;
    console.log("Received token:", accessToken);

    try {
        const response = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const profile = await response.data;
        res.json(profile);

    } catch (error) {
        console.log(error);
        
    }
})

export default router