import { AuthButton } from "@/components/AuthButton";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
    const { isAuthenticated, username, userRole } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="bg-[#222831] w-full fixed top-0 z-50 shadow-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo + Title */}
                    <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
                        <img
                            className="h-10"
                            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                            alt="Expense Tracker Logo"
                        />
                        <h1 className="text-white text-xl md:text-2xl font-semibold tracking-wide">
                            Expense Tracker
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {isAuthenticated && (
                            <>
                                <nav className="flex gap-6 text-gray-200 font-medium">
                                    <Link
                                        to="/expenses"
                                        className="hover:text-white transition duration-200"
                                    >
                                        Expenses
                                    </Link>
                                    {userRole === "Admin" && (
                                        <Link
                                            to="/users"
                                            className="hover:text-white transition duration-200"
                                        >
                                            Users
                                        </Link>
                                    )}
                                </nav>
                                <span className="text-gray-300 text-sm lg:text-base">
                                    Welcome, {username}
                                    {userRole === "Admin" && (
                                        <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                                            Admin
                                        </span>
                                    )}
                                </span>
                            </>
                        )}
                        <AuthButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-200 hover:text-white transition"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {menuOpen && isAuthenticated && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
                        <nav className="flex flex-col gap-3 py-4">
                            <Link
                                to="/expenses"
                                className="text-gray-200 hover:text-white transition duration-200 py-2"
                                onClick={closeMenu}
                            >
                                Expenses
                            </Link>
                            {userRole === "Admin" && (
                                <Link
                                    to="/users"
                                    className="text-gray-200 hover:text-white transition duration-200 py-2"
                                    onClick={closeMenu}
                                >
                                    Users
                                </Link>
                            )}
                        </nav>

                        <div className="border-t border-gray-700 pt-4">
                            <div className="text-gray-300 text-sm mb-3">
                                Welcome, {username}
                                {userRole === "Admin" && (
                                    <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                                        Admin
                                    </span>
                                )}
                            </div>
                            <AuthButton />
                        </div>
                    </div>
                )}

                {/* Mobile Auth Button (when not authenticated) */}
                {!isAuthenticated && (
                    <div className="md:hidden mt-4">
                        <AuthButton />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;