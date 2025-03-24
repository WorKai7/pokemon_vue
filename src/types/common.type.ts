export type User = {
    email: string,
    password: string
};

export type Pokemon = {
    id: number,
    name: string,
    pokedexId: number,
    typeId: number,
    lifePoints: number,
    imageUrl: string,
    height: number,
    weight: number,
    attackId: number,
    weaknessId: number,
    type: {
        id: number,
        name: string
    },
    attack: {
        id: number,
        name: string,
        damages: number,
        typeId: number,
        type: {
            id: number,
            name: string
        }
    },
    weakness: {
        id: number,
        name: string
    }
}

export type PokemonPreview = {
    id: number,
    name: string,
    pokedexId: number,
    typeId: number,
    lifePoints: number,
    imageUrl: string,
    height: number,
    weight: number,
    attackId: number,
    weaknessId: number,
}

export type DeckInput = {
    name: string,
    cards: number[]
}

export type Deck = {
    id: number,
    name: string,
    owner: {
        id: number,
        email: string,
        password: string
    },
    ownerId: number,
    cards: {
        id: number,
        name: string,
        lifePoints: number,
        height: number,
        weight: number,
        pokedexId: number,
        typeId: number,
        weaknessId: number,
        attackId: number,
        imageUrl: string
    }[]
}