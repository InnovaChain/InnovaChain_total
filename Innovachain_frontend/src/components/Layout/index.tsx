import { useLocation } from "react-use";
import { BgLeftLightImg, BgRightLightImg } from "../../assets";
import Footer from "./Footer";
import Header from "./Header";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <div className="relative overflow-x-hidden overflow-y-auto">
      {location.pathname === "/" && (
        <div className="absolute z-[-1] inset-0 overflow-hidden">
          <img
            className={clsx("absolute left-0 top-0 z-[-1]")}
            src={BgLeftLightImg}
          />
          <img
            className={clsx("absolute right-0 top-[100px] z-[-1]")}
            src={BgRightLightImg}
          />
        </div>
      )}
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
