import express from "express";
import { getAllBooks,findBook} from "../controllers/user-controller";
//import {verifyAccessToken,verifyAdminAccessToken} from "../middleware/check-auth";
const router = express.Router();


// router.post("/signup", signup);
// router.post("/login", login);
// router.get("/getProfile",verifyAccessToken || verifyAdminAccessToken, getProfile);
router.get("/getAllBooks",getAllBooks);
router.get("/findBook",findBook);

export default router;