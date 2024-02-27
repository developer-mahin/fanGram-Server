/* eslint-disable no-undef */
import { Request, Router } from 'express';
import { BannerImageController } from './bannerImg.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BannerImageValidation } from './bannerImg.validation';
import { imageUpload } from '../../middlewares/uploadImage';

const router = Router();

router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  imageUpload.fields([{ name: 'images', maxCount: 8 }]),
  (req, res, next) => {
    const imagesFile = req?.files?.images;

    const images = imagesFile?.map((file: Express.Multer.File) => ({
      path: file.path,
    }));

    // req.body = JSON.stringify(images);
    req.body = images;

    next();
  },
  validateRequest(BannerImageValidation.createBannerImageValidation),
  BannerImageController.createBannerImage,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager, USER_ROLE.seller),
  BannerImageController.getBannerImage,
);

router.delete(
  '/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.manager),
  BannerImageController.deleteBannerImage,
);

export const bannerImageRoutes = router;
