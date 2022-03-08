const RANK_API = "https://host.io/api/web";
const accessToken = "9dd57a5b4d34c8";


export const getWebsiteRank = (websiteName) => {
    return(
        fetch(`${RANK_API}/${websiteName}?token=${accessToken}`)
            .then(response => response.json()))
}

export default getWebsiteRank;