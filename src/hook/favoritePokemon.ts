export function favoritePokemon (id: string, isFavorite: boolean): Promise<Response> {
    const favorite: string = isFavorite ? 'favorite' : 'unfavorite';

    return fetch(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/${favorite}`,
        {
            method: 'post',
            headers: {'Content-Type': 'accept: application/json'}
        })

};
