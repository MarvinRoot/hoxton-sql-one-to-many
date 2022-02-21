export type Museum = {
    id?: number,
    name: string,
    city: string,
    works?: Work[]
}

export type Work = {
    id?: number,
    name: string,
    image: string,
    museumId: number,
    museum?: Museum
}
