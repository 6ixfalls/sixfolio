// file deepcode ignore
import {
    createVNode,
    defineComponent,
    nextTick,
    warn,
} from "@vue/runtime-core";
import { camelize, extend, hyphenate, isArray, toNumber } from "@vue/shared";
import HTMLParsedElement from "html-parsed-element";
import { hydrate, render } from "@vue/runtime-dom";
const __DEV__ = process.env.NODE_ENV !== "production";
export function defineCustomElement(options, config, hydrate) {
    const Comp = defineComponent(options);
    class VueCustomElement extends VueElement {
        constructor(initialProps) {
            super(Comp, initialProps, config, hydrate);
        }
    }
    VueCustomElement.def = Comp;
    return VueCustomElement;
}
export const defineSSRCustomElement = (options, config) => {
    // @ts-expect-error
    return defineCustomElement(options, config, hydrate);
};
const BaseClass =
    typeof HTMLElement !== "undefined" ? HTMLParsedElement : class { };
export class VueElement extends BaseClass {
    constructor(_def, _props = {}, _config = {}, hydrate) {
        super();
        this._def = _def;
        this._props = _props;
        this._config = _config;
        /**
         * @internal
         */
        this._instance = null;
        this._connected = false;
        this._resolved = false;
        this._numberProps = null;
        this._config = extend(
            {
                shadowRoot: true,
            },
            this._config
        );
        if (this._config.shadowRoot) {
            if (this.shadowRoot && hydrate) {
                hydrate(this._createVNode(), this._root);
            } else {
                if (__DEV__ && this.shadowRoot) {
                    warn(
                        `Custom element has pre-rendered declarative shadow root but is not ` +
                        `defined as hydratable. Use \`defineSSRCustomElement\`.`
                    );
                }
                this.attachShadow({ mode: "open" });
            }
        } else {
            if (hydrate) {
                hydrate(this._createVNode(), this._root);
            }
        }
    }
    get _root() {
        return this._config.shadowRoot ? this.shadowRoot : this;
    }
    connectedCallback() {
        if (this._config.shadowRoot) {
            this._connect();
        } else {
            super.connectedCallback();
        }
    }
    // use of parsedCallback when shadowRoot is disabled
    // to wait for slots to be parsed
    // see https://stackoverflow.com/a/52884370
    parsedCallback() {
        if (!this._config.shadowRoot) {
            this._connect();
        }
    }
    _connect() {
        this._connected = true;
        if (!this._instance) {
            this._resolveDef();
        }
    }
    disconnectedCallback() {
        this._connected = false;
        nextTick(() => {
            if (!this._connected) {
                render(null, this._root);
                this._instance = null;
            }
        });
    }
    /**
     * resolve inner component definition (handle possible async component)
     */
    _resolveDef() {
        if (this._resolved) {
            return;
        }
        this._resolved = true;
        // set initial attrs
        for (let i = 0; i < this.attributes.length; i++) {
            this._setAttr(this.attributes[i].name);
        }
        // watch future attr changes
        new MutationObserver((mutations) => {
            for (const m of mutations) {
                this._setAttr(m.attributeName);
            }
        }).observe(this, { attributes: true });
        const resolve = (def) => {
            const { props, styles } = def;
            const hasOptions = !isArray(props);
            const rawKeys = props
                ? hasOptions
                    ? Object.keys(props)
                    : props
                : [];
            // cast Number-type props set before resolve
            let numberProps;
            // add props check to fix https://github.com/vuejs/core/issues/5326
            if (hasOptions && props) {
                for (const key in this._props) {
                    const opt = props[key];
                    if (opt === Number || (opt && opt.type === Number)) {
                        this._props[key] = toNumber(this._props[key]);
                        (numberProps || (numberProps = Object.create(null)))[
                            key
                        ] = true;
                    }
                }
            }
            this._numberProps = numberProps;
            // check if there are props set pre-upgrade or connect
            for (const key of Object.keys(this)) {
                if (key[0] !== "_") {
                    this._setProp(key, this[key], true, false);
                }
            }
            // defining getter/setters on prototype
            for (const key of rawKeys.map(camelize)) {
                Object.defineProperty(this, key, {
                    get() {
                        return this._getProp(key);
                    },
                    set(val) {
                        this._setProp(key, val);
                    },
                });
            }
            // replace slot
            if (!this._config.shadowRoot) {
                this._slots = Array.from(this.children).map((n) =>
                    n.cloneNode(true)
                );
                this.replaceChildren();
            }
            // apply CSS
            this._applyStyles(styles);
            // initial render
            this._update();
        };
        const asyncDef = this._def.__asyncLoader;
        if (asyncDef) {
            asyncDef().then(resolve);
        } else {
            resolve(this._def);
        }
    }
    _setAttr(key) {
        let value = this.getAttribute(key);
        if (this._numberProps && this._numberProps[key]) {
            value = toNumber(value);
        }
        this._setProp(camelize(key), value, false);
    }
    /**
     * @internal
     */
    _getProp(key) {
        return this._props[key];
    }
    /**
     * @internal
     */
    _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
        if (val !== this._props[key]) {
            this._props[key] = val;
            if (shouldUpdate && this._instance) {
                this._update();
            }
            // reflect
            if (shouldReflect) {
                if (val === true) {
                    this.setAttribute(hyphenate(key), "");
                } else if (typeof val === "string" || typeof val === "number") {
                    this.setAttribute(hyphenate(key), val + "");
                } else if (!val) {
                    this.removeAttribute(hyphenate(key));
                }
            }
        }
    }
    _update() {
        render(this._createVNode(), this._root);
    }
    _createVNode() {
        let childs = null;
        // web components without shadow DOM do not supports native slot
        // so, we create a VNode based on the content of child nodes.
        if (!this._config.shadowRoot) {
            childs = Object.fromEntries(
                this._slots.map((slot) => [
                    slot.slot?.length ? slot.slot : "default",
                    () => {
                        const toObj = (a) => {
                            const res = {};
                            for (let i = 0, l = a.length; i < l; i++) {
                                const attr = a[i];
                                res[attr.nodeName] = attr.nodeValue;
                            }
                            return res;
                        };

                        const attrs = slot.attributes
                            ? toObj(slot.attributes)
                            : {};
                        attrs.innerHTML = slot.innerHTML;
                        return createVNode(slot.tagName, attrs);
                    },
                ])
            );
        }
        const vnode = createVNode(this._def, extend({}, this._props), childs);
        if (!this._instance) {
            vnode.ce = (instance) => {
                this._instance = instance;
                if (this._config.shadowRoot) {
                    instance.isCE = true;
                }
                // HMR
                if (__DEV__) {
                    instance.ceReload = (newStyles) => {
                        // always reset styles
                        if (this._styles) {
                            this._styles.forEach((s) =>
                                this._root.removeChild(s)
                            );
                            this._styles.length = 0;
                        }
                        this._applyStyles(newStyles);
                        // if this is an async component, ceReload is called from the inner
                        // component so no need to reload the async wrapper
                        if (!this._def.__asyncLoader) {
                            // reload
                            this._instance = null;
                            this._update();
                        }
                    };
                }
                // intercept emit
                instance.emit = (event, ...args) => {
                    this.dispatchEvent(
                        new CustomEvent(event, {
                            detail: args,
                        })
                    );
                };
                // locate nearest Vue custom element parent for provide/inject
                let parent = this;
                while (
                    (parent = parent && (parent.parentNode || parent.host))
                ) {
                    if (parent instanceof VueElement) {
                        instance.parent = parent._instance;
                        break;
                    }
                }
            };
        }
        return vnode;
    }
    _applyStyles(styles) {
        if (styles) {
            styles.forEach((css) => {
                const s = document.createElement("style");
                s.textContent = css;
                this._root.appendChild(s);
                // record for HMR
                if (__DEV__) {
                    (this._styles || (this._styles = [])).push(s);
                }
            });
        }
    }
}
