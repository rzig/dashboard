/**
 * Executes the provided cloud function with the provided parameters
 * @param name name of the cloud function to execute
 * @param params parameters to provide to the cloud function
 * @param ResponseType the expected response type from firebase
 */
async function executeCloudFunction<ResponseType>(name: string, params?: {[key:string]: any}) {
    const result = await fetch(
        "https://us-central1-cbus-hack-2020.cloudfunctions.net/" + name,
        {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const json: ResponseType = await result.json();
    return json;
}

export default executeCloudFunction;