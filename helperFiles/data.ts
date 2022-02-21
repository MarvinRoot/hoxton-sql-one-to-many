import { Museum, Work } from "./types";

export const museums: Museum[] = [
    {
        name: 'Louvre',
        city: 'Paris'
    },
    {
        name: 'The Metropolitan',
        city: 'New York'
    },
    {
        name: 'The British Museum',
        city: 'London'
    },
    {
        name: 'Rijksmuseum',
        city: 'Amsterdam'
    }
]

export const works: Work[] = [
    {
        name: 'Mona Lisa',
        image: 'monaLisa.jpeg',
        museumId: 1
    },
    {
        name: 'The Wedding at Cana',
        image: 'weddingAtCana.jpeg',
        museumId: 1
    },
    {
        name: 'Self-Portrait with a Straw Hat',
        image: 'SelfPortraitwithaStrawHat.jpeg',
        museumId: 2
    },
    {
        name: 'The Dance Class',
        image: 'TheDanceClass.jpeg',
        museumId: 2
    },
    {
        name: 'Self-Portrait with Skeleton Arm',
        image: 'SelfPortraitwithSkeletonArm.jpeg',
        museumId: 3
    },
    {
        name: 'The milkmaid',
        image: 'TheMilkmaid.jpeg',
        museumId: 4
    }
]