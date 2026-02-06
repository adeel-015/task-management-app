import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-lg font-display font-semibold text-slate-900"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-semibold text-white shadow-glow">
              TM
            </span>
            Task Manager
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              to="/tasks"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Tasks
            </Link>
            {user && (
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {user.name || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            Menu
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200/70 bg-white/90 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              <Link
                to="/tasks"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tasks
              </Link>
              {user && (
                <div className="flex flex-col gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-slate-200/70 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Built for focused teams.</span>
          <span>&copy; 2026 Task Manager. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
