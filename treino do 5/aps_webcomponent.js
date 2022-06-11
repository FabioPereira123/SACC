(function() {
	let template = document.createElement("template");
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
				</form>
				</fieldset>
				
				<form id="form2">
				<table >
					<tr> <br>
						<td>Text2</td>
						<td><input id="aps_text2" type="string"></td>
					</tr>
				</table>
			</form>
		
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