import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    return (
        <div className="font-sans pt-10 pb-52 bg-lime-200">
            <div className="mx-auto max-w-fit border-4 border-green-500 rounded-xl bg-gradient-to-r from-[#8ed622] via-[#fde047] to-[#a3e635]">
                <Header />
                <div className="flex">
                    <div className="w-1/5 flex-none">
                        <Navbar />
                    </div>
                    <div className="w-4/5 flex-shrink">{children}</div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
