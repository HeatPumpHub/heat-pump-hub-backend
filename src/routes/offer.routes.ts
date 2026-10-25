import { Router } from "express";
import validateResource from "../middleware/validate-resource.middleware.js";
import { createOfferHandler, deleteOfferHandler, getOfferByIdHandler, getOffersHandler, updateOfferHandler } from "../controller/offer.controller.js";
import { createOfferSchema, deleteOfferSchema, getOfferSchema, updateOfferSchema } from "../schema/offer.schema.js";


const offerRouter = Router()

offerRouter.post(
    '/',
    validateResource(createOfferSchema),
    createOfferHandler
)

offerRouter.get(
    '/',
    getOffersHandler
)

offerRouter.get(
    '/:id',
    validateResource(getOfferSchema),
    getOfferByIdHandler
)

offerRouter.patch(
    '/:id',
    validateResource(updateOfferSchema),
    updateOfferHandler
)

offerRouter.delete(
    '/:id',
    validateResource(deleteOfferSchema),
    deleteOfferHandler
)

export default offerRouter