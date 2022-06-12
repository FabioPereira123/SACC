var getScriptPromisify = (src) => {
	return new Promise(resolve => {
	  $.getScript(src, resolve)
	})
  }
  
  (function () {
	const prepared = document.createElement('template')
	prepared.innerHTML = `
		  <style>
		  </style>
		  <div id="root" style="width: 100%; height: 100%;">
		  </div>
		`
	class SamplePrepared extends HTMLElement {
	  constructor() {
		super()
  
		this._shadowRoot = this.attachShadow({
		  mode: 'open'
		})
		this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
		this._root = this._shadowRoot.getElementById('root');
		this.addEventListener("click", event => {
			var event = new Event("onClick");
			this.dispatchEvent(event);
		});	 
		this._props = {};
		this.render()
	}
		
		
  
		
  
		


		
  
	  onCustomWidgetResize(width, height) {
		this.render();
		this._props = { ...this._props, ...changedProperties };
	  }
	  onCustomWidgetAfterUpdate(changedProperties) {
		
		
		if ("opacity" in changedProperties) {
			this.$opacity = changedProperties["opacity"];
		}
		
		if ("color" in changedProperties) {
			this.$color = changedProperties["color"];
		}
		
		this.render(this.$value, this.$info, this.$color);
	   }

	   
  
	  async render(value) {
		await getScriptPromisify('https://fabiopereira123.github.io/SACC/echart/webcomponent.js')
	
		
		this.render(this.$value, this.$info, this.$color);
		const chart = echarts.init(this._root, 'dark')
		const option = {
		  series: [{
				  type: 'gauge',
				  center: ["50%", "60%"],
				  startAngle: 200,
				  endAngle: -20,
				  min: 0,
				  max: 100,
				  splitNumber: 12,
				  itemStyle: {
					  color: '#FFAB91'
				  },
				  progress: {
					  show: true,
					  width: 30
				  },
	  
				  pointer: {
					  show: false,
				  },
				  axisLine: {
					  lineStyle: {
						  width: 30
					  }
				  },
				  axisTick: {
					  distance: -45,
					  splitNumber: 5,
					  lineStyle: {
						  width: 2,
						  color: '#999'
					  }
				  },
				  splitLine: {
					  distance: -52,
					  length: 14,
					  lineStyle: {
						  width: 3,
						  color: '#999'
					  }
				  },
				  axisLabel: {
					  distance: -20,
					  color: '#FFAB91',
					  fontSize: 20
				  },
				  anchor: {
					  show: false
				  },
				  title: {
					  show: false
				  },
				  detail: {
					  valueAnimation: true,
					  width: '60%',
					  lineHeight: 40,
					  height: '15%',
					  borderRadius: 8,
					  offsetCenter: [0, '-15%'],
					  fontSize: 70,
					  fontWeight: 'bolder',
					  formatter:'${value}',
					  color: 'color'
				  },
				  data: [{
					  value: value?value:0
				  }]
			  }
		  ],
	  };
	  
		chart.setOption(option)
	  }
	}

  
	customElements.define('com-sap-sample-echarts-gauge', SamplePrepared)
  })()