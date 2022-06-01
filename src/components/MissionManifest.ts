import PhotoForm from "./PhotoForm";
import { RoverInformation, RoverManifest, RoverName } from "../types";
import NasaAPI from "../utils/NasaAPI";

const DEBUGMODE: boolean = true;

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
            max-width: 768px;
            padding: 15px;
            border: 2px solid #9198e5;
            border-radius: 10px;
            box-shadow: 0px 3px 10px #fff;

            font-family: var(--mm-font-family, inherit);
            color: var(--mm-color, #000);
            background: var(--mm-background, #eee);
        }

        h3 {
            text-align: center;
            margin: 10px auto;
        }

        th {
            text-align: left;
        }
    </style>
    <div>
        <h3 id="roverName"></h3>
        <table>
            <tbody></tbody>
        </table>
        <hr/>
    </div>
`;

export default class MissionManifest extends HTMLElement {
    private _roverName: RoverName;

    constructor(roverName: RoverName) {
        super();

        this._roverName = roverName;
        this.attachShadow({ mode: "open" });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }

    public get name() {
        return this._roverName;
    }

    private async _getManifest() {
        const name = this.name.toLowerCase();
        let manifest: RoverManifest;

        const storedManifest = window.sessionStorage.getItem(`${name}-manifest`);

        if (storedManifest) {
            DEBUGMODE && console.log("Returning Manifest from sessionStorage");

            manifest = JSON.parse(storedManifest);
        } else {
            DEBUGMODE && console.log("Fetching the Manifest from the API");

            try {
                manifest = await NasaAPI.fetchManifest(name as RoverName);
                window.sessionStorage.setItem(
                    `${name}-manifest`,
                    JSON.stringify(manifest)
                );
            } catch (error) {
                throw error;
            }
        }

        return manifest;
    }

    private _populateTable() {
        // create the Heading
        const h3 = this.shadowRoot!.querySelector("#roverName") as HTMLHeadingElement;
        h3.textContent = this._roverName;

        // Populate table
        this._getManifest()
            .then((manifest) => {
                DEBUGMODE && console.log(manifest);

                this.shadowRoot!.appendChild(
                    new PhotoForm({
                        name: manifest.name,
                        landing_date: manifest.landing_date,
                        max_date: manifest.max_date,
                        max_sol: manifest.max_sol,
                    })
                );

                for (const [key, value] of Object.entries(manifest)) {
                    if (key === "photos" || key === "name") {
                        continue;
                    } else {
                        // Rest goes into Table
                        const tr = document.createElement("tr");
                        tr.innerHTML = `
                            <th>${key.replace("_", " ")}</th>
                            <td>${value}</td>
                        `;
                        this.shadowRoot!.querySelector("tbody")!.appendChild(tr);
                    }
                }
            })
            .catch((err) => console.error(err));
    }

    connectedCallback() {
        this._populateTable();
    }
}

window.customElements.define("mission-manifest", MissionManifest);
