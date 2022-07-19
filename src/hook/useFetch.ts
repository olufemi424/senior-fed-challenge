import {
    ComputedRef, reactive, watchEffect,
} from 'vue';

interface FetchState<T> {
    loading: boolean;
    error: string;
    data: T | null;
}

export default function useFetch<T>(url: ComputedRef<string>) {
    const state = reactive<FetchState<T>>({
        loading: false,
        error: '',
        data: null,
    });

    const fetchData = async () :Promise<void> => {
        state.loading = true;
        state.data = null;
        state.error = '';
        try {
            const response = await fetch(url.value);
            if (response.ok) {
                const json = await response.json();
                state.data = json;
            } else {
                state.error = 'Error fetching data.';
            }
        } catch (error) {
            if (error instanceof Error) {
                state.error = `Error fetching data. ${error.message}`;
            } else {
                console.log('Unexpected error', error);
            }
        }
        state.loading = false;
    };

    watchEffect(() => {
        fetchData();
    });

    return state;
}
