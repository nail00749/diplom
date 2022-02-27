interface IOptions {
    method: string,

}

export const useFetch = <T>(url: string, {method}: any) => {
    const fetchData = async () => {
        let options = {
            method: method || 'GET',
        }

        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
        return data
    }
}
