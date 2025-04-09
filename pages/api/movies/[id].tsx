import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id },
    } = req;

    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movie = await db
            .collection("movies")
            .findOne({ _id: new ObjectId(id as string) });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to load movie' });
    }
};
