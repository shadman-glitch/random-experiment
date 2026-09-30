/**
 * AURA Storefront - Three.js 3D Viewport Engine
 * Developed by Agent 3 (Senior Front-End)
 * Audited & Verified by Flaw Hunter (FLAW-002, FLAW-007 resolved)
 */

class Aura3DEngine {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.modelGroup = null;
    this.materials = {};
    this.parts = {};
    
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.003 };
    this.autoRotate = true;
    this.isExploded = false;
    this.explosionFactor = 0; // 0 (assembled) to 1 (fully exploded)

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 500;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer with antialiasing & physical lighting
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.domElement.id = "hero-3d-canvas";
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 6, 4);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x22d3ee, 2.5);
    rimLight.position.set(-6, -4, -3);
    this.scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xa855f7, 1.2);
    fillLight.position.set(4, -5, 2);
    this.scene.add(fillLight);

    // 5. Build Model
    this.buildHeadphoneModel();

    // 6. Listeners & Events
    this.bindEvents();

    // 7. Render Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  buildHeadphoneModel() {
    this.modelGroup = new THREE.Group();

    // Materials
    this.materials.mainShell = new THREE.MeshStandardMaterial({
      color: 0x121316,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 0.3,
      clearcoatRoughness: 0.1
    });

    this.materials.cushion = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      metalness: 0.1,
      roughness: 0.8
    });

    this.materials.titanium = new THREE.MeshStandardMaterial({
      color: 0x8a929e,
      metalness: 0.95,
      roughness: 0.15
    });

    this.materials.glowRing = new THREE.MeshBasicMaterial({
      color: 0x22d3ee
    });

    this.materials.driverAcoustic = new THREE.MeshStandardMaterial({
      color: 0xffa500,
      metalness: 0.8,
      roughness: 0.3
    });

    // 1. Headband Arch
    const bandCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.6, 0.5, 0),
      new THREE.Vector3(-1.3, 2.4, 0),
      new THREE.Vector3(1.3, 2.4, 0),
      new THREE.Vector3(1.6, 0.5, 0)
    );
    const bandGeo = new THREE.TubeGeometry(bandCurve, 64, 0.12, 16, false);
    const headband = new THREE.Mesh(bandGeo, this.materials.titanium);
    this.modelGroup.add(headband);

    // Headband Cushion Padding
    const padCurve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.1, 1.2, 0),
      new THREE.Vector3(-0.9, 2.2, 0),
      new THREE.Vector3(0.9, 2.2, 0),
      new THREE.Vector3(1.1, 1.2, 0)
    );
    const padGeo = new THREE.TubeGeometry(padCurve, 40, 0.18, 16, false);
    const cushionPad = new THREE.Mesh(padGeo, this.materials.cushion);
    this.modelGroup.add(cushionPad);

    // Left and Right Earcup Assembly
    this.parts.leftAssembly = this.createEarCupAssembly(true);
    this.parts.leftAssembly.position.set(-1.65, 0.2, 0);
    this.modelGroup.add(this.parts.leftAssembly);

    this.parts.rightAssembly = this.createEarCupAssembly(false);
    this.parts.rightAssembly.position.set(1.65, 0.2, 0);
    this.modelGroup.add(this.parts.rightAssembly);

    // Center and tilt slightly for ideal beauty angle
    this.modelGroup.rotation.y = 0.45;
    this.modelGroup.rotation.x = 0.1;
    this.scene.add(this.modelGroup);
  }

  createEarCupAssembly(isLeft) {
    const group = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Gimbal Yoke Pivot
    const yokeGeo = new THREE.TorusGeometry(0.85, 0.06, 12, 32, Math.PI);
    const yoke = new THREE.Mesh(yokeGeo, this.materials.titanium);
    yoke.rotation.z = Math.PI / 2;
    group.add(yoke);

    // Outer Shell
    const shellGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.35, 36);
    const shell = new THREE.Mesh(shellGeo, this.materials.mainShell);
    shell.rotation.z = Math.PI / 2;
    shell.position.x = sign * 0.1;
    group.add(shell);

    // LED Glow Ring
    const ringGeo = new THREE.TorusGeometry(0.72, 0.025, 12, 36);
    const ring = new THREE.Mesh(ringGeo, this.materials.glowRing);
    ring.rotation.y = Math.PI / 2;
    ring.position.x = sign * 0.28;
    group.add(ring);

    // Exploded View Part 1: Acoustic Driver Cone
    const driverGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.15, 24);
    const driver = new THREE.Mesh(driverGeo, this.materials.driverAcoustic);
    driver.rotation.z = Math.PI / 2;
    driver.position.x = sign * 0.4;
    group.add(driver);

    // Exploded View Part 2: Ear Cushion
    const cushionGeo = new THREE.TorusGeometry(0.68, 0.25, 16, 36);
    const cushion = new THREE.Mesh(cushionGeo, this.materials.cushion);
    cushion.rotation.y = Math.PI / 2;
    cushion.position.x = sign * 0.55;
    group.add(cushion);

    // Store references for exploded view animation
    if (isLeft) {
      this.parts.leftDriver = driver;
      this.parts.leftCushion = cushion;
      this.parts.leftShell = shell;
    } else {
      this.parts.rightDriver = driver;
      this.parts.rightCushion = cushion;
      this.parts.rightShell = shell;
    }

    return group;
  }

  setShellColor(hexColor) {
    if (this.materials.mainShell) {
      this.materials.mainShell.color.set(hexColor);
    }
    // Subtle complementary glow on the ring
    if (hexColor === 0x22d3ee) {
      this.materials.glowRing.color.set(0x22d3ee);
    } else if (hexColor === 0xd4af37) {
      this.materials.glowRing.color.set(0xffdf78);
    } else {
      this.materials.glowRing.color.set(0x22d3ee);
    }
  }

  toggleAutoRotate(forceState) {
    this.autoRotate = forceState !== undefined ? forceState : !this.autoRotate;
    return this.autoRotate;
  }

  toggleExplodedView(forceState) {
    this.isExploded = forceState !== undefined ? forceState : !this.isExploded;
    return this.isExploded;
  }

  bindEvents() {
    const el = this.renderer.domElement;

    // Mouse and Touch Interaction
    const onPointerDown = (e) => {
      this.isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!this.isDragging || !this.modelGroup) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - this.previousMousePosition.x;
      const deltaY = clientY - this.previousMousePosition.y;

      this.rotationVelocity.y = deltaX * 0.006;
      this.rotationVelocity.x = deltaY * 0.006;

      this.modelGroup.rotation.y += this.rotationVelocity.y;
      this.modelGroup.rotation.x += this.rotationVelocity.x;

      this.previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Responsive Canvas Resize
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (this.modelGroup) {
      if (this.autoRotate && !this.isDragging) {
        this.modelGroup.rotation.y += 0.005;
      } else if (!this.isDragging) {
        // Inertia damping
        this.modelGroup.rotation.y += this.rotationVelocity.y;
        this.modelGroup.rotation.x += this.rotationVelocity.x;
        this.rotationVelocity.y *= 0.94;
        this.rotationVelocity.x *= 0.94;
      }

      // Smooth Exploded View Interpolation
      const targetFactor = this.isExploded ? 1 : 0;
      this.explosionFactor += (targetFactor - this.explosionFactor) * 0.08;

      if (this.parts.leftDriver && this.parts.rightDriver) {
        // Animate parts outwards along X axis
        const offset = this.explosionFactor * 0.6;
        this.parts.leftDriver.position.x = -0.4 - offset * 0.7;
        this.parts.leftCushion.position.x = -0.55 - offset * 1.4;
        this.parts.rightDriver.position.x = 0.4 + offset * 0.7;
        this.parts.rightCushion.position.x = 0.55 + offset * 1.4;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}
