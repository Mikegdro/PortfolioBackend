import { eq } from "drizzle-orm";
import { db } from "../db";
import { Tecnology } from "../db/schema";

export const retrieveAllTecnologies = async () => {
    return await db.query.Tecnology.findMany()
}

export const retrieveTecnology = async (id: string) => {
    return await db.query.Tecnology.findFirst({
        where: eq(Tecnology.id, id)
    })
}