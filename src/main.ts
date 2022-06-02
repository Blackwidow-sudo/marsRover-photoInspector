import './style.scss';

import { roverNames } from './globals';
import { RoverName } from './types';

// Components
import MissionManifest from './components/MissionManifest';
import NasaAPI from './utils/NasaAPI';
import PhotoForm from './components/PhotoForm';
import MessageOverlay from './components/InfoOverlay';

const el_manifests = document.querySelector('#manifests') as HTMLDivElement;
const el_photos = document.querySelector('#photos') as HTMLDivElement;
const el_selectRover = document.querySelector('#selectRover') as HTMLSelectElement;

// Populate the select element with the available Rovers
roverNames.forEach((roverName) => {
    const option = document.createElement('option');
    option.textContent = roverName;
    option.value = roverName;

    el_selectRover.add(option);
});

el_selectRover.addEventListener('change', (e: Event) => {
    const option_el = e.target as HTMLOptionElement;
    const mani = new MissionManifest(option_el.value as RoverName);

    el_manifests.innerHTML = '';
    el_manifests.appendChild(mani);
});

const openOverlay = document.querySelector('#openOverlay') as HTMLButtonElement;

openOverlay.addEventListener('click', (e: Event) => {
    const warn = new MessageOverlay('Hello World');

    // const span = document.createElement('span');
    // span.slot = 'message';
    // span.textContent = 'Hello World from main.ts';

    // warn.appendChild(span);

    document.body.appendChild(warn);
});
