import { useEffect, useState } from 'react';
import TopMenu from '../components/menu/TopMenu';

const DiningLayout = ({ children }) => {
    const [topNavHeight, setTopNavHeight] = useState(0);

    useEffect(() => {
        const updateTopNavHeight = () => {
            const topNav = document.querySelector('.top_nav');
            if (topNav) {
                setTopNavHeight(topNav.offsetHeight + 20);
            }
        };

        updateTopNavHeight();

        window.addEventListener('resize', updateTopNavHeight);
        return () => {
            window.removeEventListener('resize', updateTopNavHeight);
        };
    }, []);

    return (
        <>
            <TopMenu />

            <div style={{ marginTop: `${topNavHeight}px` }}>
                <main>
                    <h1>{children}</h1>
                </main>
            </div>
        </>
    );
};

export default DiningLayout;