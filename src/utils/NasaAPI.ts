import { CamAbbr, Photo, RoverManifest, RoverName } from "../types";

export default class NasaAPI {
    private static _apiKey = "api_key=DEMO_KEY";
    private static _baseUrl = "https://api.nasa.gov/mars-photos/api/v1";
    private static _roversUrl = this._baseUrl.concat("/rovers");
    private static _manifestsUrl = this._baseUrl.concat("/manifests");

    public static async fetchManifest(
        roverName: RoverName
    ): Promise<RoverManifest> {
        const reqParams = [`/${roverName.toLowerCase()}`, `?${this._apiKey}`];

        try {
            const response = await fetch(
                this._manifestsUrl.concat(...reqParams)
            );
            const data = await response.json();
            return data.photo_manifest;
        } catch (err: unknown) {
            throw err;
        }
    }

    public static async fetchPhotos(
        roverName: RoverName,
        cam: CamAbbr,
        solOrDate: number | string,
        page: number = 1
    ): Promise<Photo[] | undefined> {
        const reqParams = [`/${roverName}/photos`];

        if (typeof solOrDate === "number") {
            reqParams.push(`?sol=${solOrDate}`);
        } else if (!isNaN(Date.parse(solOrDate))) {
            reqParams.push(`?earth_date=${solOrDate}`);
        } else {
            throw new Error("The given Sol/Date is not valid.");
        }

        reqParams.push(`&camera=${cam}`);
        reqParams.push(`&page=${page}`);
        reqParams.push(`&${this._apiKey}`);

        try {
            const response = await fetch(this._roversUrl.concat(...reqParams));
            const data = await response.json();

            return data.photos;
        } catch (err: unknown) {
            throw err;
        }
    }
}
