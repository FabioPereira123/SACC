(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<menu >
    <li id="form"><input id="aps_text" type="string"></li>
    
    <li id="form2"><input id="aps_text2" type="string"></li>
  </menu>
    `;

    customElements.define('com-sap-sample-helloworld6', class HelloWorld extends HTMLElement {


		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
            this._tagContainer;
           
            
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
			this._shadowRoot.getElementById("form2").addEventListener("submit", this._submit.bind(this));
		


            this._tagType = "h1";
            this._tagText = "Hello World";
            
            this._tagnum="string";
            this._tagn="xD"
            //Adding event handler for click events
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
            });
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


        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this._firstConnection = true;
            this.redraw(); 
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this._firstConnection){
                this.redraw();
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        
        }

        
        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default
        /*
        onCustomWidgetResize(width, height){
        
        }
        */

        //Getters and Setters
        get widgetText() {
            return this._tagType;
            
        }

        set widgetText(value) {
            this._tagText = value;
        }


        get headingType() {
            return this._tagType;
            }

        set headingType(value) {
            this._tagType = value;
        }


        get widgetnumber() {
            return this._tagnum;
            }

        set widgetnumber(value) {
            this._tagn = value;
        }


        // End - Getters and Setters

        redraw(){
            if (this._tagContainer){
                this._tagContainer.parentNode.removeChild(this._tagContainer);
              
            }

            var shadow = window.getSelection(this._shadowRoot);
            
          
            this._tagContainer = document.createElement(this._tagType);
            this._tagContainer = document.createElement(this._tagnum);

            var theText = document.createTextNode(this._tagText);    
            var theTexte = document.createTextNode(this._tagn);    
            this._tagContainer.appendChild(theTexte); 
          
            
            this._tagContainer.appendChild(theText); 
            this._shadowRoot.appendChild(this._tagContainer);
            


        }
        
    
        
    });
        
})();