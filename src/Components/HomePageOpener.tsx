import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import anime from 'animejs';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Typography } from '@mui/material';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';

interface ModelProps {
    modelRef: React.RefObject<THREE.Object3D>;
    visible: boolean;
  }

function Model({ modelRef, visible }: ModelProps) {
    const { scene } = useGLTF('kehilamodel.glb');
    useFrame(() => {
      
    });
    useEffect(() => {
        if (modelRef.current) {
            modelRef.current.visible = visible; 
        }
    }, [visible]);
  
    return (
      <primitive
        object={scene}
        rotation={[1.586, 0, 3.2]}
        position={[0, -0.5, 0]}
        scale={30}
        ref={modelRef}
      />
    );
  }

const HomePageOpener = () => {

    const [showScrollDown, setShowScrollDown] = useState(true);
    const [showModel, setShowModel] = useState(false);

    const gridRef = useRef<HTMLDivElement>(null);
    const textSideRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const heartRef = useRef<SVGSVGElement>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (gridRef.current && textSideRef.current && titleRef.current && descriptionRef.current) {
            const splitTitle = new SplitType(titleRef.current, { types: 'chars' });
            const splitDescription = new SplitType(descriptionRef.current, { types: 'words' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    onEnter: () => {
                        setShowScrollDown(false);
                        setShowModel(true);
                    },
                    onLeaveBack: () => {
                        setShowScrollDown(true);
                        setShowModel(false);
                    },
                }
            });

            tl.from(splitTitle.chars, {
                duration: 1.5,
                opacity: 0,
                scale: 0.5,
                y: 100,
                filter: 'blur(12px)',
                rotationX: 360,
                transformOrigin: '0% 50% -50',
                stagger: 0.2,
                ease: "power2.out",
            });

            tl.from(splitDescription.words, {
                duration: 1.5,
                opacity: 0,
                scale: 0.5,
                y: -60,
                filter: 'blur(8px)',
                rotationX: -360,
                transformOrigin: '0% 50% -50',
                stagger: 0.25,
                ease: "power2.out"
            }, '+=1');

            ScrollTrigger.create({
                trigger: gridRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: [textSideRef.current, heartRef.current],
            });


            const path = heartRef.current?.querySelector('path');

            const svgAnimation = anime({
                targets: path,
                strokeDashoffset: [anime.setDashoffset, 0],
                fill: ['#b78fd8', '#b78fd8'],
                stroke: ['#ffffff', '#ffffff'],
                autoplay: false,
                duration: 5000,
                easing: 'linear'
            });

            ScrollTrigger.create({
                trigger: gridRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: self => {
                    const animeProgress = self.progress * svgAnimation.duration;
                    svgAnimation.seek(animeProgress);
                }
            });

            tl.fromTo(
                modelRef.current ? modelRef.current.rotation : null,
                { z: 3.2 },
                { 
                    z: 9.45, 
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    }
                }
            );
            
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill()); // Clean up ScrollTriggers properly
        };
    }, [modelRef.current]);

    return (
        <div ref={gridRef} style={{ height: '400vh', backgroundColor: '#b78fd8' }}>

            <div
                id='scrollDownText'
                style={{
                    opacity: showScrollDown ? 1 : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography sx={{ fontSize: '2rem' }}>Scroll Down</Typography>
                <KeyboardDoubleArrowDownIcon style={{ fontSize: '2rem', marginLeft: '65px' }} />
            </div>
        
            <div ref={textSideRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            
                <div style={{ width: '100%', height: '150px', display: innerWidth > 1300 ? 'block' : 'none'}}>
                    <Canvas>
                        <ambientLight />
                        <PerspectiveCamera makeDefault position={[0, 0, -5]} />
                        <Model modelRef={modelRef} visible={showModel} />
                        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                    </Canvas>
                </div>
                
                <h1 ref={titleRef} id='homepage-opener-title'>Welcome to Kehila</h1>

                <p ref={descriptionRef} id='homepage-opener-description'>
                Welcome to KEHILA, your central hub for charity and community engagement in Israel. Discover a seamless way to connect, contribute, and create impactful change together.
                </p>

                <svg ref={heartRef} xmlns="http://www.w3.org/2000/svg" style={{paddingTop: '30px'}} width='100px' height='100px' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                
            </div>
        </div>
    );
};

export default HomePageOpener;
