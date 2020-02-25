(function()  {
    let template = document.createElement('template');
    template.innerHTML = `
    <form id="form">
        <fieldset>
            <legend>Custom Widget Text</legend>
            <table>
                <tr>
                    <td>Text</td>
                    <td><input id="aps_text" type="string"></td>
                </tr>
            </table>
        </fieldset>
    </form>
`;

    class HelloWorldApps extends HTMLElement {
        constructor() {
            super(); 
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default.  If it is enabled, SAP Analytics Cloud will track DOM size changes and call this callback as needed
        //  If you don't need to react to resizes, you can save CPU by leaving it uncommented.
        /*
        onCustomWidgetResize(width, height){
        
        }
        */
       _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            widgetText: this.widgetText
                        }
                    }
            }));
        }

        set widgetText(newText) {
            this._shadowRoot.getElementById("aps_text").value = newText;
        }

        get widgetText() {
            return this._shadowRoot.getElementById("aps_text").value;
        }
}

customElements.define("com-sap-sample-helloworld3-aps",HelloWorldApps);
})();