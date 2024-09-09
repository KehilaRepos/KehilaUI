import { useRef } from 'react';

const AboutUs = () => {

    const gridRef = useRef<HTMLDivElement>(null);
    const textSideRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    return (
        <div ref={gridRef} style={{ height: '100vh', backgroundColor: '#b78fd8', display: 'flex', justifyContent: 'center', }}>
        
            <div ref={textSideRef} style={{ height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '60px' }}>
                
                <h1 ref={titleRef} id='homepage-opener-title'>About Kehila</h1>

                <p ref={descriptionRef} id='homepage-opener-description'>
                  Kehila - A new centralized hub for all charitable activities.
                  Built on AWS, Kehila encourages community members to connect and collaborate, offering a solution for all charity related operations.
                  You can post and discover different charity related offers or requests within your local communities, or based on the type of charity.
                  With Kehila, kindness is just a click away, making every act of generosity a step towards a closer, more connected community.
                </p>
                
            </div>
        </div>
    );
};

export default AboutUs;
