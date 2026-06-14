import { useScreenSize } from "./hooks/useWindowSize";


function Sidebar() {

    const { width, height } = useScreenSize();

    return (
        <>
            <div className="w-[20%] shadow-md">

                Sidebar Section  <br />

                <h1 className="text-xl font-light bg-yellow-400 w-fit">
					Hye Henry!  <br />
					Width: {width}  <br />
					Height: {height}  <br />
				</h1>

            </div>
        </>
    );
}

export default Sidebar;