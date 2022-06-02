const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 100vw;
            height: 100vh;

            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;

            background-color: rgba(0, 0, 0, 0.6);
            color: #fff;

            cursor: pointer;
        }

        #msg-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        span {
            padding: 5px 10px;
            background-color: #000;
        }
    </style>

    <div id="msg-container">
        <slot name="message"></slot>
    </div>
    <span>Click anywhere to close this Message</span>
`;

export default class InfoOverlay extends HTMLElement {
    private _message: string;
    private _msgContainer: HTMLDivElement;

    constructor(msg?: string) {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this._msgContainer = this.shadowRoot!.querySelector(
            '#msg-container'
        ) as HTMLDivElement;

        if (typeof msg !== 'undefined') {
            this._message = msg;

            const span = document.createElement('span');
            span.slot = 'message';
            span.textContent = msg;

            // Slot the custom component
            this.appendChild(span);
        } else {
            this._message = 'No message';
        }
    }

    get message() {
        return this._message;
    }

    set message(msg: string) {
        this._message = msg;
    }

    connectedCallback() {
        this.addEventListener('click', this._handleClick.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
    }

    private _handleClick() {
        this.remove();
    }
}

window.customElements.define('message-overlay', InfoOverlay);
