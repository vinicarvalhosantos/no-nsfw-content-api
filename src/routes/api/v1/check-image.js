import express from 'express';
import asyncHandler from 'express-async-handler';
import { imageContentService } from '../../../services/images-content/image-content.service';

export const imageContentRouter = express.Router();

// Send an image to check the content
imageContentRouter.post(
    '/check',
    asyncHandler(async (req, res) => {
        const { urlImage } = req.body;
        const imageContent = await imageContentService.checkImageContent(urlImage);
        res.send(imageContent);
    })
);
