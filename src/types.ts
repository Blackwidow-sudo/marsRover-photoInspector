type RoverName = "Curiosity" | "Opportunity" | "Spirit";
type Status = "active" | "complete";

type CamAbbr =
    | "FHAZ"
    | "RHAZ"
    | "MAST"
    | "CHEMCAM"
    | "MAHLI"
    | "MARDI"
    | "NAVCAM"
    | "PANCAM"
    | "MINITES";

interface RoverInformation {
    landing_date: string;
    max_date: string;
    max_sol: number;
    name: RoverName;
}

interface RoverManifest extends RoverInformation {
    launch_date: string;
    photos: object[];
    status: Status;
    total_photos: number;
}

interface Rover {
    id: number;
    name: RoverName;
    landing_date: string;
    launch_date: string;
    status: Status;
}

interface AvailableCams {
    [name: string]: CamAbbr[];
}

interface Camera {
    id: number;
    name: RoverName;
    rover_id: number;
    full_name: string;
}

interface Photo {
    id: number;
    sol: number;
    camera: Camera;
    img_src: string;
    earth_date: string;
    rover: Rover;
}

interface UserInputs {
    solOrDate: number | string;
    pages: number;
    camera: CamAbbr;
}

type RoverPhotos = Photo[];

type DateString = string;

export {
    RoverName,
    CamAbbr,
    RoverInformation,
    RoverManifest,
    Photo,
    RoverPhotos,
    Camera,
    Rover,
    AvailableCams,
    UserInputs,
    DateString,
};
