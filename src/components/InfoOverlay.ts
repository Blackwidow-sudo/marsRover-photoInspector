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

/**
 * Displays a Popover with a Message inside. Can be closed with a click anywhere.
 * @param {string} msg A string or HTMLString that will be presented as the Message
 */
export default class InfoOverlay extends HTMLElement {
    private _message: string;
    private _slot: HTMLSlotElement;

    constructor(msg?: string) {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));

        this._slot = this.shadowRoot!.querySelector(
            'slot[name="message"]'
        ) as HTMLSlotElement;

        if (typeof msg !== 'undefined') {
            this._message = msg;
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
        this._slotSelf(this._message);
        this._slot.addEventListener('slotchange', (e: Event) => console.log(e));
        this.addEventListener('click', this._handleClick.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
    }

    private _handleClick() {
        this.remove();
    }

    private _slotSelf(content: string) {
        const span = document.createElement('span');
        span.slot = 'message';
        span.innerHTML = content;

        this.appendChild(span);
    }

    public slotWith(element: HTMLElement | string) {
        if (element instanceof HTMLElement) {
            element.slot = "message"
            this.appendChild(element)
        } else if (typeof element === "string") {
            const span = document.createElement("span")
            span.slot = "message"
            span.innerHTML = element
            this.appendChild(span)
        } else {
            throw new TypeError("element is not of type HTMLElement or string")
        }
    }
}

window.customElements.define('message-overlay', InfoOverlay);
