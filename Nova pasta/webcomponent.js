(function()  {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
        :root {
            /* --gray: rgb(253, 251, 252);; */ 
            --gray: rgb(34, 48, 64);
            --blue: rgb(0, 122, 253);
            --green: rgb(6, 215, 108);
            --white: rgb(253, 251, 252);
            /* --white: rgb(34, 48, 64); */
        }
        
        * {
            margin:0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            height: 100vh;
            background-color: var(--gray);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        
        .gauge {
            position: relative;
            width: 200px;
            height: 200px;
        }
        
        .progress {
            position: absolute;
            width: 100%;
            height: 100%;
            border: .1rem solid var(--white);
            border-bottom: .1rem solid var(--gray);
            border-radius: 50%;
            outline: .2rem solid var(--white);
            outline-offset: .4rem;
            overflow: hidden;
        }
        
        .progress::before{
            position: absolute;
            content: '';
            top:50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            background-color: var(--gray);
            border-radius: 50%;
            z-index: 200;
        }
        .progress::after{
            position: absolute;
            content: '';
            top:50%;
            width: 100%;
            height: 50%;
            background-color: var(--gray);
        }
        
        .bar {
            position: absolute;
            width: 50%;
            height: 100%;
            background-color: var(--green);
            transform: rotate(90deg);
            transform-origin: center right;
            animation: rotate 2s ease-in-out;
        }
        
        .needle {
            position: absolute;
            width: 100%;
            height: 50%;
            background-color: var(--white)!important;
            clip-path: polygon(50% 0, 50% 0, 52% 100%, 48% 100%);
            transform: rotate(90deg);
            transform-origin: bottom center;
            animation: rotate 2s ease-in-out;
            z-index: 300;
        
        }
        
        @keyframes rotate {
            0% {
                background-color: var(--blue);
                transform: rotate(-90deg);
            }
            80% { background-color: var(--blue); }
        }
        
        .msg {
            margin-top: 100px;
            font: 1.3rem sans-serif;
        }
        
        .process, .success {
            border-radius: .4rem;
            padding: .8rem 1rem;
            transform: translateY(100px);
            opacity: 0;
            transition: .4s ease-out;
        }
        
        .process {
            color: var(--white);
            border: 1.5px solid var(--white);
        }
        
        .success {
            color: var(--green);
            border: 1.5px solid var(--green);
        }
        
        .process.active {
            transform: translateY(0px);
            opacity: 1;
        }
        .success.active {
            transform: translateY(-52px);
            opacity: 1;
        }


        <div class="gauge">
        <div class="progress">
            <div class="bar"></div>
            <div class="needle"></div>
        </div>
    </div>
    <div class="msg">
        <p class="process">Verification process</p>
        <p class="success">Successfully done!</p>
    </div>



    `;

    class Widget extends HTMLElement {

		constructor() {
			super(); 
			this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this.firstConnection = false;
            this._Width=200;
            this.getcolor='';
            const process_txt = document.querySelector('.process');
            const success_txt = document.querySelector('.success');

            this._props = {};




            this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
        }

        //Fired when the widget is added to the html DOM of the page
        connectedCallback(){
            this.firstConnection = true; 


            setTimeout(() => {
                process_txt.classList.add('active');
            }, 0)
    
            setTimeout(toggleMsg, 1600);
        }

         //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback(){
        }

         //When the custom widget is updated, the Custom Widget SDK framework executes this function first
		onCustomWidgetBeforeUpdate(oChangedProperties) {

            this._props = { ...this._props, ...changedProperties };
		}

        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
		onCustomWidgetAfterUpdate(oChangedProperties) {
            if (this.firstConnection === true) {
                if ("value" in changedProperties) {
                    this.$value = changedProperties["value"];
                }
                
                if ("info" in changedProperties) {
                    this.$info = changedProperties["info"];
                }
                
                if ("color" in changedProperties) {
                    this.$color = changedProperties["color"];
                }
            }
        }
        
        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy(){
        }
        
         toggleMsg() {
            process_txt.classList.remove('active');
            success_txt.classList.add('active');
        }

        
        //Getters and Setters
      

       

        get Width() {
			return this._Width;
		}

        set Width(value) {
			this._Width = value;
		}
    };
    customElements.define('com-sap-sample-widgetapp1', Widget);
})();