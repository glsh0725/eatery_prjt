import TopMenu from '../components/menu/TopMenu';

const DiningLayout = ({ children }) => {
    return (
        <>
            <TopMenu />

            <div>
                <main>
                    <h1>{children}</h1>
                </main>
            </div>
        </>
    );
};

export default DiningLayout;
