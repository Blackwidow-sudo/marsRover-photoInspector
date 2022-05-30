import "./style.scss";

import { roverNames, cameraNames } from "./globals";
import { CamAbbr, RoverName } from "./types";

// Components
import MissionManifest from "./components/MissionManifest";
import NasaAPI from "./utils/NasaAPI";

const el_manifests = document.querySelector("#manifests") as HTMLDivElement;
const el_photos = document.querySelector("#photos") as HTMLDivElement;
const el_selectRover = document.querySelector(
    "#selectRover"
) as HTMLSelectElement;

// Populate the select element with the available Rovers
roverNames.forEach((roverName) => {
    const option = document.createElement("option");
    option.textContent = roverName;
    option.value = roverName;

    el_selectRover.add(option);
});

el_selectRover.addEventListener("change", (e: Event) => {
    const option_el = e.target as HTMLOptionElement;
    const mani = new MissionManifest(option_el.value as RoverName);

    el_manifests.innerHTML = "";
    el_manifests.appendChild(mani);
});
