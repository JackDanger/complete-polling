import { Link, Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      <nav className="fixed z-50 w-full bg-white top-0 flex flex-wrap items-center justify-between px-2 py-3 shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <Link to={"/polls"} className="inline-block pt-1 pb-1 mr-4 text-lg whitespace-no-wrap">
            Polls4Days
          </Link>
        </div>
      </nav>
      <div className="container mx-auto mt-4 pt-12">
        <div className="flex grid-cols-2 flex-wrap">
          <div className="sm:w-4/12 w-1/5 lg:w-2/12 pr-4 text-left">
            <div className="block overflow-y-auto pt-8 pb-4">
              <div className="mb-6">

                <div className="text-blueGray-700 hover:text-blueGray-800 text-xs uppercase font-bold block py-1 px-4 no-underline">
                  Polls
                </div>
                <ul className="block flex-wrap list-none pl-0 mb-0 mt-0">
                  <li>
                    <Link to={"/polls"} className="inline-block py-2 px-4 no-underline">
                      Browse
                    </Link>
                  </li>
                  <li>
                    <Link to={"/polls/new"} className="inline-block py-2 px-4 no-underline">
                      Create your Own
                    </Link>
                  </li>
                </ul>

                <div className="text-blueGray-700 hover:text-blueGray-800 text-xs uppercase font-bold block py-3 px-4 no-underline">
                  Statistics
                </div>
                <ul className="block flex-wrap list-none pl-0 mb-0 mt-0">
                  <li>
                    <Link to={"/not-implemented-i-just-wanted-more-in-the-sidebar-nav"} className="inline-block py-2 px-4 no-underline">
                      View Trends
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sm:w-9/12 w-5/12 px-4 pr-10 lg:pr-4">
            <div className="my-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;