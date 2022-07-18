import {
    reactive, watchEffect
} from 'vue';

interface PostState<T> {
    loading: boolean;
    error: string;
    data: T | null;
}


export default function usePost<T>(id: string, isFavorite: boolean) {
    const state = reactive<PostState<T>>({
        loading: false,
        error: '',
        data: null,
    });

    const favorite: string = isFavorite ? 'favorite' : 'unfavorite';
    const url = `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/${favorite}`

    const postData = async () :Promise<void> => {
        state.loading = true;
        state.data = null;
        state.error = '';
        try {
            const response = await fetch(url, { method: 'post', headers: {'Content-Type': 'accept: application/json'} });

            if (response.ok) {
                const json = await response.json();
                state.data = json;
            } else {
                state.error = 'Error posting data.';
            }
        } catch (error) {
            if (error instanceof Error) {
                state.error = `Error posting data. ${error.message}`;
            } else {
                console.log('Unexpected error', error);
            }
        }
        state.loading = false;
    };

    // watchEffect(() => {
    postData();
    // });
    

    return state;

}



// export default function favoritePokemon(): void {

//     const postData = async () :Promise<void> => {
//         try {
//             const response = await fetch('https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${id}/favorite',
//                 { 
//                     method: 'post',
//                     headers: {'Content-Type': 'accept: application/json'}
//                 });

//             if (response.ok) {
//                 return await response.json();
//             } 
//         } catch (error) {
//             if (error instanceof Error) {
//                 console.log(error.message)
//             } else {
//                 console.log('Unexpected error', error);
//             }
//         }
//     };
// }
