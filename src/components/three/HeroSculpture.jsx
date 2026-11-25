import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery, useReducedMotion } from '../../hooks/useMediaQuery';
import { portfolioConfig } from '../../config/portfolioConfig';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function PortraitMedallion({ imageUrl, isHovered }) {
  const rawTexture = useTexture(imageUrl);

  const croppedTexture = useMemo(() => {
    const tex = rawTexture.clone();
    tex.colorSpace = THREE.SRGBColorSpace;

    // Preserve natural aspect ratio (682x1024 portrait -> square 1:1 medallion crop focused on face)
    const img = rawTexture.image;
    if (img && img.width && img.height) {
      const aspect = img.width / img.height;
      const zoom = 0.86;
      if (aspect < 1) {
        tex.repeat.set(zoom, zoom * aspect);
        tex.offset.set((1 - zoom) / 2, 0.25);
      } else {
        tex.repeat.set(zoom / aspect, zoom);
        tex.offset.set((1 - zoom / aspect) / 2, (1 - zoom) / 2);
      }
    }
    tex.needsUpdate = true;
    return tex;
  }, [rawTexture]);

  useEffect(() => {
    return () => {
      croppedTexture.dispose();
    };
  }, [croppedTexture]);

  return (
    <group>
      {/* Front Portrait Plane */}
      <mesh position={[0, 0, 0.02]}>
        <circleGeometry args={[1.02, 64]} />
        <meshBasicMaterial map={croppedTexture} toneMapped={false} />
      </mesh>

      {/* Solid Dark Titanium Backing Plate */}
      <mesh position={[0, 0, -0.015]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.04, 64]} />
        <meshStandardMaterial color="#101010" metalness={0.92} roughness={0.2} />
      </mesh>

      {/* Precision Bezel Framing the Portrait */}
      <mesh position={[0, 0, 0.01]}>
        <torusGeometry args={[1.04, 0.028, 16, 72]} />
        <meshStandardMaterial
          color={isHovered ? '#B8FF35' : '#d4d4d4'}
          emissive={isHovered ? '#B8FF35' : '#000000'}
          emissiveIntensity={isHovered ? 0.55 : 0}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      {/* Subtle Inner Lime Calibration Ring */}
      <mesh position={[0, 0, 0.03]}>
        <ringGeometry args={[0.97, 0.99, 64]} />
        <meshBasicMaterial
          color="#B8FF35"
          transparent
          opacity={isHovered ? 0.85 : 0.45}
        />
      </mesh>
    </group>
  );
}

function KineticCore({
  mouseRef,
  scrollProgressRef,
  isHovered,
  pulseTrigger,
  isMobile,
  reducedMotion,
  imageUrl,
}) {
  const portraitGroupRef = useRef();
  const orbitalGroupRef = useRef();
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const wireRef = useRef();
  const shockwaveRef = useRef();
  const shockwaveProgress = useRef(1);
  const lastPulseId = useRef(0);

  const nodePositions = useMemo(() => {
    const pts = [];
    const count = isMobile ? 8 : 14;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.98;
      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pts;
  }, [isMobile]);

  useFrame((state, delta) => {
    const step = reducedMotion ? 0 : Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    if (pulseTrigger !== lastPulseId.current) {
      lastPulseId.current = pulseTrigger;
      shockwaveProgress.current = 0;
    }

    const boost = isHovered ? 1.85 : 1.0;

    // Clamped 3D tilt for the portrait core so the face stays clearly visible
    if (portraitGroupRef.current) {
      const targetRotY = mouseRef.current.x * (isHovered ? 0.36 : 0.24);
      const targetRotX = -mouseRef.current.y * (isHovered ? 0.24 : 0.16);
      portraitGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        portraitGroupRef.current.rotation.y,
        targetRotY,
        0.08
      );
      portraitGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        portraitGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
      const targetScale = isHovered ? 1.05 : 1.0;
      portraitGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(portraitGroupRef.current.scale.x, targetScale, 0.08)
      );
    }

    // Independent 3D gyro cage rotating smoothly around the portrait
    if (orbitalGroupRef.current) {
      const targetY =
        mouseRef.current.x * 0.55 +
        scrollProgressRef.current * Math.PI * 0.6 +
        (reducedMotion ? 0 : t * 0.16);
      const targetX = -mouseRef.current.y * 0.35 + scrollProgressRef.current * 0.35;

      orbitalGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        orbitalGroupRef.current.rotation.y,
        targetY,
        0.06
      );
      orbitalGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        orbitalGroupRef.current.rotation.x,
        targetX,
        0.06
      );

      const cageScale = (isHovered ? 1.07 : 1.0) + scrollProgressRef.current * 0.08;
      orbitalGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(orbitalGroupRef.current.scale.x, cageScale, 0.07)
      );
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += step * 0.38 * boost;
      outerRingRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.14;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= step * 0.52 * boost;
      innerRingRef.current.rotation.z = -Math.PI / 4 + Math.cos(t * 0.4) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= step * 0.2 * boost;
    }

    // Expanding shockwave ring on click/tap
    if (shockwaveRef.current) {
      if (shockwaveProgress.current < 1) {
        shockwaveProgress.current = Math.min(shockwaveProgress.current + step * 1.45, 1);
        const p = shockwaveProgress.current;
        const s = 1 + p * 1.35;
        shockwaveRef.current.scale.set(s, s, 1);
        shockwaveRef.current.material.opacity = (1 - p) * 0.85;
        shockwaveRef.current.visible = true;
      } else {
        shockwaveRef.current.visible = false;
      }
    }
  });

  const sceneGroup = (
    <group scale={isMobile ? 0.9 : 1.04}>
      {/* Central Portrait Core */}
      <group ref={portraitGroupRef}>
        {imageUrl ? (
          <Suspense fallback={null}>
            <PortraitMedallion imageUrl={imageUrl} isHovered={isHovered} />
          </Suspense>
        ) : (
          <mesh>
            <icosahedronGeometry args={[1.02, 1]} />
            <meshStandardMaterial color="#161616" metalness={0.92} roughness={0.18} />
          </mesh>
        )}

        {/* Click Shockwave Ring */}
        <mesh ref={shockwaveRef} visible={false} position={[0, 0, 0.04]}>
          <ringGeometry args={[1.04, 1.09, 64]} />
          <meshBasicMaterial color="#B8FF35" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Outer Kinetic Wireframe + Gimbal Rings */}
      <group ref={orbitalGroupRef}>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.46, 1]} />
          <meshBasicMaterial
            color="#B8FF35"
            wireframe
            transparent
            opacity={isHovered ? 0.52 : 0.3}
          />
        </mesh>

        {/* Precision Titanium Outer Gimbal Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.86, 0.024, 16, isMobile ? 56 : 96]} />
          <meshStandardMaterial color="#e5e5e5" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Neon Lime Accent Inner Gimbal */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.62, 0.018, 12, isMobile ? 48 : 84]} />
          <meshStandardMaterial
            color="#B8FF35"
            emissive="#B8FF35"
            emissiveIntensity={isHovered ? 1.45 : 0.85}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Orbital Telemetry Nodes */}
        {nodePositions.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[idx % 3 === 0 ? 0.052 : 0.03, 12, 12]} />
            <meshStandardMaterial
              color={idx % 3 === 0 ? '#B8FF35' : '#ffffff'}
              emissive={idx % 3 === 0 ? '#B8FF35' : '#000000'}
              emissiveIntensity={idx % 3 === 0 ? (isHovered ? 1.6 : 1.1) : 0}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );

  return reducedMotion ? (
    sceneGroup
  ) : (
    <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.4}>
      {sceneGroup}
    </Float>
  );
}

function HeroFallbackVisual({ imageUrl }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-2 border-lime/60 bg-[#111111]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={portfolioConfig.personal.fullName}
            className="h-full w-full object-cover object-[50%_26%]"
          />
        ) : (
          <span className="font-mono text-xs tracking-[0.25em] text-lime">
            {portfolioConfig.personal.fullName}
          </span>
        )}
      </div>
    </div>
  );
}

export default function HeroSculpture({ onInteract }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reducedMotion = useReducedMotion();
  const [webglReady, setWebglReady] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseTrigger, setPulseTrigger] = useState(0);

  const imageUrl = portfolioConfig.personal.profileImage;

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglReady(false);
    } catch {
      setWebglReady(false);
    }
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      const max = Math.max(window.innerHeight, 1);
      scrollProgressRef.current = Math.min(window.scrollY / max, 1.5);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = () => {
    setPulseTrigger((prev) => prev + 1);
    onInteract?.();
  };

  if (!webglReady) return <HeroFallbackVisual imageUrl={imageUrl} />;

  return (
    <WebGLErrorBoundary fallback={<HeroFallbackVisual imageUrl={imageUrl} />}>
      <div
        className="h-full w-full cursor-pointer"
        data-cursor="PULSE"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D portrait core — move pointer to tilt or click to pulse"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.45], fov: 42 }}
          dpr={isMobile ? [1, 1.25] : [1, 1.8]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 5]} intensity={2.2} color="#ffffff" />
          <pointLight
            position={[-4, -3, 3]}
            intensity={isHovered ? 4.2 : 3.0}
            color="#B8FF35"
          />
          <pointLight position={[3, -4, -3]} intensity={1.4} color="#64748b" />

          <Suspense fallback={null}>
            <KineticCore
              mouseRef={mouseRef}
              scrollProgressRef={scrollProgressRef}
              isHovered={isHovered}
              pulseTrigger={pulseTrigger}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
              imageUrl={imageUrl}
            />
            {!reducedMotion && (
              <Sparkles
                count={isMobile ? 16 : 36}
                scale={5.2}
                size={1.5}
                speed={isHovered ? 0.6 : 0.3}
                color="#B8FF35"
                opacity={0.42}
              />
            )}
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
