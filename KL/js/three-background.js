// Three.js Background
let scene, camera, renderer, particles;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];

    const color = new THREE.Color();
    const numParticles = 1000;

    for (let i = 0; i < numParticles; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );

        color.setHSL(Math.random(), 0.7, 0.5);
        colors.push(color.r, color.g, color.b);
        sizes.push(20);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 4,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Setup renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('webgl-background'),
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.05;
    mouseY = (event.clientY - windowHalfY) * 0.05;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    const time = Date.now() * 0.0005;
    
    particles.rotation.x = time * 0.2;
    particles.rotation.y = time * 0.1;

    const positions = particles.geometry.attributes.position.array;
    const colors = particles.geometry.attributes.color.array;

    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Add wave effect
        positions[i + 1] = y + Math.sin(time * 2 + x * 0.01) * 3;

        // Update colors
        const colorIndex = i * (3/3);
        colors[colorIndex] = Math.sin(time) * 0.5 + 0.5;
        colors[colorIndex + 1] = Math.cos(time) * 0.5 + 0.5;
        colors[colorIndex + 2] = Math.sin(time + 2) * 0.5 + 0.5;
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialize Skills Globe
class SkillsGlobe {
    constructor() {
        this.container = document.getElementById('skills-globe');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.init();
    }

    init() {
        // Setup
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;

        // Create globe
        const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
        const globeMaterial = new THREE.MeshPhongMaterial({
            color: 0x2563eb,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.globe = new THREE.Mesh(globeGeometry, globeMaterial);
        this.scene.add(this.globe);

        // Add points for skills
        const skills = [
            'Python', 'ML', 'AI', 'Data',
            'SQL', 'Stats', 'Deep Learning', 'Analytics'
        ];

        const pointGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        skills.forEach((skill, index) => {
            const phi = Math.acos(-1 + (2 * index) / skills.length);
            const theta = Math.sqrt(skills.length * Math.PI) * phi;

            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            point.position.setFromSphericalCoords(2, phi, theta);
            this.scene.add(point);
        });

        // Add lights
        const light = new THREE.PointLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // Animation
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.globe) {
            this.globe.rotation.y += 0.005;
            this.globe.rotation.z += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Initialize skills globe when about section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                new SkillsGlobe();
                observer.disconnect();
            }
        });
    });

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});
