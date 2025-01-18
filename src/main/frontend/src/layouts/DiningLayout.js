import TopMenu from '../components/menu/TopMenu';

const DiningLayout = ({ children }) => {
    return (
        <>
            <TopMenu />

            <div style={{ marginTop: '160px' }}>
                <main>
                    <h1>{children}</h1>
                </main>
            </div>
        </>
    );
};

export default DiningLayout;