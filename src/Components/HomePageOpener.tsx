import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import anime from 'animejs';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Typography } from '@mui/material';

const HomePageOpener = () => {

    const [showScrollDown, setShowScrollDown] = useState(true);

    const gridRef = useRef<HTMLDivElement>(null);
    const textSideRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const heartRef = useRef<SVGSVGElement>(null);

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
                    onEnter: () => setShowScrollDown(false),
                    onLeaveBack: () => setShowScrollDown(true),
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

        }

        return () => ScrollTrigger.killAll();
    }, []);

    return (
        <div ref={gridRef} style={{ height: '400vh', backgroundColor: '#b78fd8' }}>

            <div
                id='scrollDownText'
                style={{
                    opacity: showScrollDown ? 1 : 0,
                }}
            >
                <Typography sx={{ fontSize: '2rem' }}>Scroll Down</Typography>
                <KeyboardDoubleArrowDownIcon style={{ fontSize: '2rem', marginLeft: '70px' }} />
            </div>

            <div ref={textSideRef} style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <h1 ref={titleRef} style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', textShadow: '0px 4px 6px rgba(0,0,0,0.2)' }}>Welcome to Kehila</h1>

                <p ref={descriptionRef} style={{ maxWidth: '50%', textAlign: 'justify', fontSize: '1.2rem', lineHeight: '1.6', color: '#ffffff', textShadow: '0px 2px 4px rgba(0,0,0,0.1)', margin: '20px 0' }}>
                KEHILA - A web platform designed to create a new centralized hub for all charitable activities.
                Built on AWS, KEHILA will allow its users to engage with one another using our service, offering a solution for a wide variety of charity related operations.
                Users can post and discover different charity related offers or requests within their communities locally, or based on the relevant type of charity.
                With KEHILA, kindness is just a click away, making every act of generosity a step towards a closer, more connected community.
                </p>

                <svg ref={heartRef} xmlns="http://www.w3.org/2000/svg" style={{paddingTop: '30px'}} width='100px' height='100px' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                
            </div>
        </div>
    );
};

export default HomePageOpener;
