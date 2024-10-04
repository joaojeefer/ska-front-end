import { LayoutProps } from "./types";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex">
            <main className="flex-1 p-6 bg-gray-100 min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default Layout;
