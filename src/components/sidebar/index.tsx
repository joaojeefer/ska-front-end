import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <h2 className="text-xl font-semibold p-4">Dashboard</h2>
            <nav className="mt-10">
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/analytics">Analytics</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link href="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
