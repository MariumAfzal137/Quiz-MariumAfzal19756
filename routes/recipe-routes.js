import { Router } from 'express';
const router= Router();
import multer from 'multer';
import { postrecipe, allrecipes, recipedetails, updaterecipe, deleterecipe } from '../controllers/recipe-controller';
import { verifyAccessToken } from '../middleware/check-auth';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single('image');

router.post('/postrecipe', upload,verifyAccessToken, postrecipe);
router.get('/allrecipes', allrecipes);
router.get('/:id',  recipedetails);
router.patch('/:id',verifyAccessToken, updaterecipe);
router.delete('/:id', verifyAccessToken,deleterecipe);

export default router;
