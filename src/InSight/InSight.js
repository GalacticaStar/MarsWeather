// Retrieve your Access Token from NASA's Insight Pages for free.
const accessToken = ''; //Your Access Token here.
let jsonResponse;

export const Insight =  {

    data() {

        if (jsonResponse) {
            return jsonResponse;
        }

        const getData = async () => {
            const endpoint = `https://api.nasa.gov/insight_weather/?api_key=${accessToken}&feedtype=json&ver=1.0`;

            try {
    
                const response = await fetch(endpoint);
    
                if (response.ok) {
                    jsonResponse = await response.json();
                    console.log(jsonResponse);
                    return jsonResponse;
                }
    
            } catch(error) {
                console.log(`There was an error in fetch: ${error}`);
            };
        };

        return getData();
    },

    minTemps() {
        Insight.data()
        .then(jsonResponse => {
            const days = jsonResponse.sol_keys;
            const minTemps = {};
            days.map(sol => {
                return minTemps[sol] = jsonResponse[sol].AT.mn; 
            });

            return minTemps;
        })
    }

};
