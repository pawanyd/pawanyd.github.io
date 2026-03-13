// System Architecture Playground - Interactive System Design Tool
// Created by Pawan Kumar - Principal Software Developer

// Global variables
let playground = null;

// Component data configuration
const COMPONENT_TYPES = {
  'web-client': {
    label: 'Web Client',
    icon: 'fas fa-globe',
    color: '#3b82f6',
    capacity: 1000,
    latency: 50,
    cost: 0
  },
  'mobile-app': {
    label: 'Mobile App',
    icon: 'fas fa-mobile-alt',
    color: '#10b981',
    capacity: 800,
    latency: 80,
    cost: 0
  },
  'cdn': {
    label: 'CDN',
    icon: 'fas fa-cloud',
    color: '#f59e0b',
    capacity: 100000,
    latency: 20,
    cost: 200
  },
  'load-balancer': {
    label: 'Load Balancer',
    icon: 'fas fa-balance-scale',
    color: '#8b5cf6',
    capacity: 50000,
    latency: 5,
    cost: 150
  },
  'api-gateway': {
    label: 'API Gateway',
    icon: 'fas fa-door-open',
    color: '#6366f1',
    capacity: 30000,
    latency: 10,
    cost: 100
  },
  'web-server': {
    label: 'Web Server',
    icon: 'fas fa-server',
    color: '#10b981',
    capacity: 5000,
    latency: 30,
    cost: 80
  },
  'app-server': {
    label: 'App Server',
    icon: 'fas fa-cube',
    color: '#3b82f6',
    capacity: 3000,
    latency: 50,
    cost: 120
  },
  'microservice': {
    label: 'Microservice',
    icon: 'fas fa-cubes',
    color: '#8b5cf6',
    capacity: 2000,
    latency: 40,
    cost: 60
  },
  'database': {
    label: 'Database',
    icon: 'fas fa-database',
    color: '#ef4444',
    capacity: 10000,
    latency: 100,
    cost: 300
  },
  'cache': {
    label: 'Redis Cache',
    icon: 'fas fa-memory',
    color: '#f59e0b',
    capacity: 50000,
    latency: 1,
    cost: 80
  },
  'message-queue': {
    label: 'Message Queue',
    icon: 'fas fa-stream',
    color: '#eab308',
    capacity: 20000,
    latency: 15,
    cost: 100
  },
  'search': {
    label: 'Search Engine',
    icon: 'fas fa-search',
    color: '#10b981',
    capacity: 15000,
    latency: 25,
    cost: 200
  },
  'monitoring': {
    label: 'Monitoring',
    icon: 'fas fa-chart-line',
    color: '#3b82f6',
    capacity: 100000,
    latency: 5,
    cost: 50
  },
  'logging': {
    label: 'Logging',
    icon: 'fas fa-file-alt',
    color: '#6b7280',
    capacity: 100000,
    latency: 10,
    cost: 30
  }
};

class SystemPlayground {
  constructor() {
    this.components = new Map();
    this.connections = [];
    this.currentTraffic = 1000;
    this.selectedComponent = null;
    this.draggedComponent = null;
    this.componentCounter = 0;
    
    this.init();
  }
  init() {
    console.log('Initializing System Playground...');
    this.setupEventListeners();
    this.setupDragAndDrop();
    this.updateMetrics();
    this.createArrowMarker();
    console.log('System Playground initialized successfully');
  }
  
  setupEventListeners() {
    const trafficSlider = document.getElementById('traffic-slider');
    if (trafficSlider) {
      trafficSlider.addEventListener('input', (e) => {
        this.updateTraffic(e.target.value);
      });
    }
    
    const canvas = document.getElementById('canvas-area');
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        if (e.target === canvas || e.target.id === 'canvas-components') {
          this.deselectAll();
        }
      });
    }
  }
  
  setupDragAndDrop() {
    const componentItems = document.querySelectorAll('.component-item');
    componentItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        this.draggedComponent = {
          type: item.dataset.type,
          element: item
        };
        console.log('Dragging component:', this.draggedComponent.type);
      });
    });
    
    const canvas = document.getElementById('canvas-area');
    if (canvas) {
      canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      });
      
      canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        if (this.draggedComponent) {
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          console.log('Dropping component at:', x, y);
          this.addComponent(this.draggedComponent.type, x, y);
          this.draggedComponent = null;
          this.hideDropZoneMessage();
        }
      });
    }
  }
  
  addComponent(type, x, y) {
    const componentId = 'component-' + (++this.componentCounter);
    const componentData = COMPONENT_TYPES[type] || COMPONENT_TYPES['web-server'];
    
    console.log('Adding component:', type, 'at', x, y);
    
    const element = document.createElement('div');
    element.className = 'canvas-component';
    element.id = componentId;
    element.style.left = Math.max(0, x - 60) + 'px';
    element.style.top = Math.max(0, y - 40) + 'px';
    element.innerHTML = '<div class="component-icon" style="color: ' + componentData.color + '"><i class="' + componentData.icon + '"></i></div><div class="component-label">' + componentData.label + '</div>';
    
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectComponent(componentId);
    });
    
    this.makeComponentDraggable(element);
    
    const canvasComponents = document.getElementById('canvas-components');
    if (canvasComponents) {
      canvasComponents.appendChild(element);
    }
    
    this.components.set(componentId, {
      type: type,
      element: element,
      x: Math.max(0, x - 60),
      y: Math.max(0, y - 40),
      label: componentData.label,
      icon: componentData.icon,
      color: componentData.color,
      capacity: componentData.capacity,
      latency: componentData.latency,
      cost: componentData.cost
    });
    
    this.updateMetrics();
    this.analyzeSystem();
    console.log('Component added successfully:', componentId);
  }
  makeComponentDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    element.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      
      const rect = element.getBoundingClientRect();
      const canvasRect = document.getElementById('canvas-area').getBoundingClientRect();
      initialX = rect.left - canvasRect.left;
      initialY = rect.top - canvasRect.top;
      
      element.style.zIndex = '1000';
      e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newX = Math.max(0, initialX + deltaX);
      const newY = Math.max(0, initialY + deltaY);
      
      element.style.left = newX + 'px';
      element.style.top = newY + 'px';
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        element.style.zIndex = '10';
        
        const componentId = element.id;
        const component = this.components.get(componentId);
        if (component) {
          component.x = parseInt(element.style.left);
          component.y = parseInt(element.style.top);
        }
      }
    });
  }
  
  updateTraffic(value) {
    this.currentTraffic = parseInt(value);
    const display = document.getElementById('traffic-display');
    if (display) {
      display.textContent = this.formatNumber(value);
    }
    this.updateMetrics();
    this.simulateTrafficFlow();
    console.log('Traffic updated to:', this.currentTraffic);
  }
  
  formatNumber(num) {
    const n = parseInt(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }
  
  updateMetrics() {
    const rps = Math.floor(this.currentTraffic / 60);
    const latency = this.calculateAverageLatency();
    const throughput = this.calculateThroughput();
    const cost = this.calculateMonthlyCost();
    
    const elements = {
      'metric-rps': this.formatNumber(rps),
      'metric-latency': latency + 'ms',
      'metric-throughput': this.formatNumber(throughput),
      'metric-cost': '$' + cost
    };
    
    for (const id in elements) {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = elements[id];
      }
    }
  }
  
  calculateAverageLatency() {
    if (this.components.size === 0) return 0;
    
    let totalLatency = 0;
    let componentCount = 0;
    
    this.components.forEach(component => {
      totalLatency += component.latency || 50;
      componentCount++;
    });
    
    return Math.floor(totalLatency / Math.max(componentCount, 1));
  }
  
  calculateThroughput() {
    let maxThroughput = 0;
    
    this.components.forEach(component => {
      if (component.capacity) {
        maxThroughput = Math.max(maxThroughput, component.capacity);
      }
    });
    
    return Math.min(maxThroughput, this.currentTraffic);
  }
  
  calculateMonthlyCost() {
    let totalCost = 0;
    
    this.components.forEach(component => {
      totalCost += component.cost || 0;
    });
    
    return totalCost;
  }
  selectComponent(componentId) {
    this.deselectAll();
    const component = this.components.get(componentId);
    if (component) {
      component.element.classList.add('selected');
      this.selectedComponent = componentId;
    }
  }
  
  deselectAll() {
    this.components.forEach(component => {
      component.element.classList.remove('selected');
    });
    this.selectedComponent = null;
  }
  
  hideDropZoneMessage() {
    const message = document.getElementById('drop-zone-message');
    if (message && this.components.size > 0) {
      message.style.display = 'none';
    }
  }
  
  clearCanvas() {
    console.log('Clearing canvas...');
    this.components.clear();
    this.connections = [];
    
    const canvasComponents = document.getElementById('canvas-components');
    const connectionsSvg = document.getElementById('connections-svg');
    const dropZoneMessage = document.getElementById('drop-zone-message');
    const analysisPanel = document.getElementById('analysis-panel');
    
    if (canvasComponents) canvasComponents.innerHTML = '';
    if (connectionsSvg) connectionsSvg.innerHTML = '';
    if (dropZoneMessage) dropZoneMessage.style.display = 'flex';
    if (analysisPanel) analysisPanel.style.display = 'none';
    
    this.updateMetrics();
    this.createArrowMarker();
    console.log('Canvas cleared');
  }
  
  loadTemplate(templateName) {
    if (!templateName) return;
    
    console.log('Loading template:', templateName);
    this.clearCanvas();
    
    const templates = {
      'ecommerce': {
        components: [
          { type: 'web-client', x: 150, y: 100 },
          { type: 'mobile-app', x: 150, y: 200 },
          { type: 'cdn', x: 300, y: 150 },
          { type: 'load-balancer', x: 450, y: 150 },
          { type: 'web-server', x: 600, y: 100 },
          { type: 'app-server', x: 600, y: 200 },
          { type: 'database', x: 750, y: 100 },
          { type: 'cache', x: 750, y: 200 }
        ]
      },
      'social': {
        components: [
          { type: 'mobile-app', x: 150, y: 150 },
          { type: 'api-gateway', x: 300, y: 150 },
          { type: 'microservice', x: 450, y: 100 },
          { type: 'microservice', x: 450, y: 200 },
          { type: 'message-queue', x: 600, y: 150 },
          { type: 'database', x: 750, y: 100 },
          { type: 'cache', x: 750, y: 200 }
        ]
      },
      'trading': {
        components: [
          { type: 'web-client', x: 150, y: 150 },
          { type: 'load-balancer', x: 300, y: 150 },
          { type: 'app-server', x: 450, y: 100 },
          { type: 'app-server', x: 450, y: 200 },
          { type: 'cache', x: 600, y: 100 },
          { type: 'database', x: 600, y: 200 },
          { type: 'message-queue', x: 750, y: 150 },
          { type: 'monitoring', x: 900, y: 100 }
        ]
      },
      'streaming': {
        components: [
          { type: 'web-client', x: 150, y: 100 },
          { type: 'mobile-app', x: 150, y: 200 },
          { type: 'cdn', x: 300, y: 150 },
          { type: 'load-balancer', x: 450, y: 150 },
          { type: 'microservice', x: 600, y: 100 },
          { type: 'microservice', x: 600, y: 200 },
          { type: 'database', x: 750, y: 150 },
          { type: 'cache', x: 900, y: 150 }
        ]
      }
    };
    
    const template = templates[templateName];
    if (template) {
      const self = this;
      template.components.forEach((comp, index) => {
        setTimeout(() => {
          self.addComponent(comp.type, comp.x, comp.y);
        }, index * 100);
      });
      
      const trafficValues = {
        'ecommerce': 50000,
        'social': 100000,
        'trading': 5000000,
        'streaming': 200000
      };
      
      setTimeout(() => {
        const trafficSlider = document.getElementById('traffic-slider');
        if (trafficSlider) {
          trafficSlider.value = trafficValues[templateName] || 10000;
          self.updateTraffic(trafficSlider.value);
        }
      }, 1000);
    }
  }
  simulateTrafficSpike() {
    const originalTraffic = this.currentTraffic;
    const spikeTraffic = originalTraffic * 5;
    
    const trafficSlider = document.getElementById('traffic-slider');
    if (trafficSlider) {
      trafficSlider.value = spikeTraffic;
      this.updateTraffic(spikeTraffic);
      
      this.highlightBottlenecks();
      
      const self = this;
      setTimeout(() => {
        trafficSlider.value = originalTraffic;
        self.updateTraffic(originalTraffic);
        self.removeBottleneckHighlights();
      }, 3000);
    }
  }
  
  highlightBottlenecks() {
    this.components.forEach(component => {
      if (component.capacity && component.capacity < this.currentTraffic) {
        component.element.classList.add('bottleneck');
      }
    });
  }
  
  removeBottleneckHighlights() {
    this.components.forEach(component => {
      component.element.classList.remove('bottleneck');
    });
  }
  
  analyzeSystem() {
    if (this.components.size < 2) {
      const analysisPanel = document.getElementById('analysis-panel');
      if (analysisPanel) {
        analysisPanel.style.display = 'none';
      }
      return;
    }
    
    const analysis = this.performSystemAnalysis();
    this.displayAnalysis(analysis);
    const analysisPanel = document.getElementById('analysis-panel');
    if (analysisPanel) {
      analysisPanel.style.display = 'block';
    }
  }
  
  performSystemAnalysis() {
    const componentTypes = Array.from(this.components.values()).map(c => c.type);
    const hasLoadBalancer = componentTypes.includes('load-balancer');
    const hasCache = componentTypes.includes('cache');
    const hasDatabase = componentTypes.includes('database');
    const hasCDN = componentTypes.includes('cdn');
    const hasMonitoring = componentTypes.includes('monitoring');
    
    const strengths = [];
    const recommendations = [];
    const bottlenecks = [];
    
    if (hasLoadBalancer) {
      strengths.push('Load balancer ensures high availability and distributes traffic effectively');
    }
    if (hasCache) {
      strengths.push('Caching layer reduces database load and improves response times');
    }
    if (hasCDN) {
      strengths.push('CDN provides global content delivery and reduces latency');
    }
    if (hasMonitoring) {
      strengths.push('Monitoring system enables proactive issue detection');
    }
    
    if (!hasLoadBalancer && this.currentTraffic > 10000) {
      recommendations.push('Add a load balancer to handle high traffic and ensure availability');
    }
    if (!hasCache && hasDatabase) {
      recommendations.push('Implement caching (Redis) to reduce database queries');
    }
    if (!hasCDN && (componentTypes.includes('web-client') || componentTypes.includes('mobile-app'))) {
      recommendations.push('Add CDN for faster static content delivery');
    }
    if (!hasMonitoring) {
      recommendations.push('Implement monitoring for system health and performance tracking');
    }
    
    this.components.forEach(component => {
      if (component.capacity && component.capacity < this.currentTraffic) {
        bottlenecks.push(component.label + ' may become a bottleneck at current traffic levels');
      }
    });
    
    return { strengths: strengths, recommendations: recommendations, bottlenecks: bottlenecks };
  }
  
  displayAnalysis(analysis) {
    const strengthsList = document.getElementById('analysis-strengths');
    const recommendationsList = document.getElementById('analysis-recommendations');
    const bottlenecksList = document.getElementById('analysis-bottlenecks');
    
    if (strengthsList) {
      strengthsList.innerHTML = analysis.strengths.length > 0 
        ? analysis.strengths.map(s => '<li>• ' + s + '</li>').join('')
        : '<li>• Add more components to see system strengths</li>';
    }
    
    if (recommendationsList) {
      recommendationsList.innerHTML = analysis.recommendations.length > 0
        ? analysis.recommendations.map(r => '<li>• ' + r + '</li>').join('')
        : '<li>• Your system architecture looks well-balanced!</li>';
    }
    
    if (bottlenecksList) {
      bottlenecksList.innerHTML = analysis.bottlenecks.length > 0
        ? analysis.bottlenecks.map(b => '<div class="text-red-600">• ' + b + '</div>').join('')
        : '<div class="text-green-600">• No bottlenecks detected at current traffic levels</div>';
    }
  }
  simulateTrafficFlow() {
    const svg = document.getElementById('connections-svg');
    if (!svg) return;
    
    const existingFlows = svg.querySelectorAll('.traffic-flow');
    existingFlows.forEach(flow => flow.remove());
    
    if (this.components.size > 1) {
      const componentsArray = Array.from(this.components.values());
      for (let i = 0; i < componentsArray.length - 1; i++) {
        const from = componentsArray[i];
        const to = componentsArray[i + 1];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x + 60);
        line.setAttribute('y1', from.y + 40);
        line.setAttribute('x2', to.x + 60);
        line.setAttribute('y2', to.y + 40);
        line.classList.add('traffic-flow');
        
        svg.appendChild(line);
      }
    }
  }
  
  createArrowMarker() {
    const svg = document.getElementById('connections-svg');
    if (!svg) return;
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', '#6366f1');
    
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);
  }
  
  startTutorial() {
    const tutorialSteps = [
      "Welcome to the System Architecture Playground!",
      "1. Drag components from the left panel to the canvas",
      "2. Use the traffic slider to simulate different load levels",
      "3. Click 'Traffic Spike' to see bottlenecks highlighted",
      "4. Load templates to see real-world architectures I've built",
      "5. Watch the metrics update as you build your system",
      "Try it now - drag a 'Web Client' to the canvas!"
    ];
    
    alert(tutorialSteps.join('\n\n'));
  }
}

// Initialize playground when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing playground...');
  playground = new SystemPlayground();
  window.playground = playground;
});

// Global functions for HTML onclick handlers
function loadTemplate(templateName) {
  console.log('Global loadTemplate called:', templateName);
  if (playground) {
    playground.loadTemplate(templateName);
  } else {
    console.error('Playground not initialized');
  }
}

function updateTraffic(value) {
  if (playground) {
    playground.updateTraffic(value);
  }
}

function simulateTrafficSpike() {
  if (playground) {
    playground.simulateTrafficSpike();
  }
}

function clearCanvas() {
  if (playground) {
    playground.clearCanvas();
  }
}

function startTutorial() {
  if (playground) {
    playground.startTutorial();
  }
}