(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		
			<menu >
			<li id="form"><button onclick="copy()"><input id="aps_text" type="string"></button></li>
			
			<li id="form2"><button onclick="paste()"><input id="aps_text2" type="string"></button></li>
		  </menu>


			
		
	`;

	class HelloWorldAps extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("form2").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							widgetnumber: this.widgetnumber
						}
					}
			}));
		}

		_submit(a) {
			a.preventDefault();
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



		set widgetnumber(newTexte) {
			this._shadowRoot.getElementById("aps_text2").value = newTexte;
		}

		get widgetnumber() {
			return this._shadowRoot.getElementById("aps_text2").value;
		}

	}

customElements.define("com-sap-sample-helloworld6-aps", HelloWorldAps);
})();