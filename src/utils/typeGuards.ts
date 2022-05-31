import { DateString, Photo, RoverManifest } from "../types";

function isManifest(mani: unknown): mani is RoverManifest {
    return (mani as RoverManifest).launch_date !== undefined
}

function isPhoto(photo: unknown): photo is Photo {
    return (photo as Photo).img_src !== undefined
}

function isArrOfPhotos(arr: unknown): arr is Photo[] {
    if (!Array.isArray(arr)) {
        return false
    }
    if (arr.length === 0) {
        return false
    }
    return isPhoto(arr[0])
}

function isDateString(date: string): date is DateString {
    return isNaN(Date.parse(date))
}

export {
    isManifest,
    isPhoto,
    isArrOfPhotos,
    isDateString,
}