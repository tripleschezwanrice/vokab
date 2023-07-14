export default async function getMeanings(word){
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+encodeURIComponent(word))
    .then(response=>{
        if(!response.ok){
            return 404
        }
        return response.json()
    })
    .catch(err=>{
        console.log("error")
    })
}