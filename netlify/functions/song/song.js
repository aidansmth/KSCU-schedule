import fetch from 'node-fetch';
// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
var show_title
var current_show
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    const url = `https://spinitron.com/api/`
    const access_string = `?access-token=`
    const key = `fsr9w2R8irUUqUkze_QUcyB3`

    show_url = url + `shows/` + access_string + key + `&count=1`
    fetch(show_url)
      .then((response) => response.json())
      .then((data) => {

        console.log("Recieved data");
        items = data["items"][0]
        console.log(items['title'])
        show_title = items['title']

        // Testing dates
        let start_time = new Date(items['start'])
        const current_time = new Date()
        console.log(start_time < current_time)
        if (start_time < current_time) {
          current_show = true
        } else {
          current_show = false
        }
      }
      );
    // let name = alert(data["items"])
    // console.log

    // Parse response object
    console.log(show_title)
    console.log(current_show)
    return {
      statusCode: 200,
      body: JSON.stringify({
        show: `${show_title}`,
        live: `${current_show}`
      },
      ),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
