// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
    try {
        const url = `https://spinitron.com/api/`
        const access_string = `?access-token=`
        const _key = process.env.KEY
        spins_url = url + `spins/` + access_string + _key + `&count=5`
        console.log(spins_url)
        let response = await fetch(spins_url);
        let data = await response.json();
        console.log("Recieved data...");
        spins = data["items"]
        var toReturn = [{}, {}, {}, {}, {}]
        var i = 0
        for (const song in spins) {
            toReturn[i]["song"] = spins[song]["song"];
            toReturn[i]["artist"] = spins[song]["artist"];
            toReturn[i]["image"] = spins[song]["image"];
            toReturn[i]["duration"] = spins[song]["duration"];
            toReturn[i]["released"] = spins[song]["released"];
            i++;
        }
        console.log(toReturn)
        return {
            statusCode: 200,
            body: JSON.stringify(toReturn)
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }