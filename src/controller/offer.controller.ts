import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { CreateOfferInput, DeleteOfferInput, GetOfferInput, UpdateOfferInput } from "../schema/offer.schema.js";
import { createOffer, deleteOffer, getOfferById, getOffers, updateOffer } from "../service/offer.service.js";


export const createOfferHandler = asyncHandler(
    async(req: Request<{}, {}, CreateOfferInput['body']>, res: Response) => {
        const offer = await createOffer(req.body)
        return res.status(201).json(offer)
    }
)

export const getOffersHandler = asyncHandler(
    async(req: Request, res: Response) => {
        const offers = await getOffers()
        return res.status(200).json(offers)
    }
)

export const getOfferByIdHandler = asyncHandler(
    async(req: Request<GetOfferInput['params']>, res: Response) => {
        const offer = await getOfferById({id: req.params.id})

        if(!offer) return res.status(404).json({message: 'Offer not found'})

        return res.status(200).json(offer)
    }
)

export const updateOfferHandler = asyncHandler(
    async(
        req: Request<UpdateOfferInput['params'], {}, UpdateOfferInput['body']>,
        res: Response
    ) => {
            const existingOffer = await getOfferById({id: req.params.id})
            
            if(!existingOffer) return res.status(404).json({message: 'Offer not found'})
            
            const updatedOffer = await updateOffer({id: req.params.id}, req.body)
            return res.status(200).json(updatedOffer)
    }
)

export const deleteOfferHandler = asyncHandler(
    async(
        req: Request<DeleteOfferInput['params']>,
        res: Response
    ) => {
        const existingOffer = await getOfferById({id: req.params.id})

        if(!existingOffer) return res.status(404).json({message: 'Offer not found'})

        await deleteOffer({id: req.params.id})
        return res.status(200).json({message: 'Offer successfully archived'})
    }
)