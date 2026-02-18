"use client";

import React from "react";
import Link from "next/link";
import { useMobileMenu } from "@/features/home/hooks";
import { useStoreLogin } from "@/features/auth/store/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";

// Hamburger Icon
const MenuIcon = () => (
  <svg
    className="w-5 h-5 md:w-6 md:h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

// Close Icon
const CloseIcon = () => (
  <svg
    className="w-5 h-5 md:w-6 md:h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

const MainNavbar: React.FC = () => {
  const router = useRouter();
  const { isOpen, toggle, close } = useMobileMenu();
  const { isAuthenticated, signOut } = useStoreLogin(); // Ambil dari store

  // State untuk Menu Dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout
  const handleLogout = async () => {
    handleClose();
    await signOut();
    router.push("/login");
  };
  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-[#333] px-3 md:px-6 lg:px-10 py-2 md:py-3 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 md:gap-3">
          <div className="size-7 md:size-9 lg:size-10 text-[#ee2b8c] dark:text-[#FF00FF] animate-pulse">
            <svg
              className="w-full h-full drop-shadow-[0_0_8px_rgba(238,43,140,0.5)] dark:drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-display font-bold tracking-tighter uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-[#ee2b8c] to-[#d61f7a] dark:from-[#FF00FF] dark:to-[#B026FF] pr-1 pb-1">
            Hype
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <nav className="flex items-center gap-4 lg:gap-8 font-display tracking-wide uppercase text-[10px] lg:text-xs font-bold">
            <Link
              href="/events"
              className="text-[#ee2b8c] dark:text-[#00FFFF] hover:drop-shadow-[0_0_5px_currentColor] transition-all"
            >
              Events
            </Link>
            <Link
              href="/marketplace"
              className="text-gray-600 dark:text-gray-300 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/community"
              className="text-gray-600 dark:text-gray-300 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
            >
              Community
            </Link>
          </nav>

          {isAuthenticated ? (
            <>
              {/* Avatar Button */}
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    alt="User Name"
                    src="/static/images/avatar/1.jpg"
                    sx={{ width: 32, height: 32 }} // Bisa atur size disini
                  />
                </IconButton>
              </Tooltip>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={handleClose}
                  component="a"
                  href="/user-referral"
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                href="/login"
                className="flex min-w-[60px] lg:min-w-[70px] cursor-pointer items-center justify-center rounded-none h-7 md:h-8 lg:h-9 px-2 md:px-3 lg:px-4 bg-transparent border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-[10px] lg:text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] lg:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] lg:dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="flex min-w-[60px] lg:min-w-[70px] cursor-pointer items-center justify-center rounded-none h-7 md:h-8 lg:h-9 px-2 md:px-3 lg:px-4 bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black hover:bg-[#d61f7a] dark:hover:bg-[#00FFFF] transition-colors text-[10px] lg:text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_#d61f7a] lg:shadow-[3px_3px_0px_0px_#d61f7a] dark:shadow-[2px_2px_0px_0px_#B026FF] lg:dark:shadow-[3px_3px_0px_0px_#B026FF]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggle}
          className="md:hidden text-gray-800 dark:text-white p-1.5 hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[49px] z-40 bg-white/95 dark:bg-black/95 backdrop-blur-lg">
          <nav className="flex flex-col items-center justify-center gap-4 py-6 px-4">
            <Link
              href="/events"
              onClick={close}
              className="text-[#ee2b8c] dark:text-[#00FFFF] text-xl font-display font-bold uppercase tracking-wide"
            >
              Events
            </Link>
            <Link
              href="/marketplace"
              onClick={close}
              className="text-gray-800 dark:text-white text-xl font-display font-bold uppercase tracking-wide hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/community"
              onClick={close}
              className="text-gray-800 dark:text-white text-xl font-display font-bold uppercase tracking-wide hover:text-[#ee2b8c] dark:hover:text-[#FF00FF] transition-colors"
            >
              Community
            </Link>

            <div className="flex flex-col gap-2 mt-4 w-full max-w-[200px]">
              <Link
                href="/login"
                onClick={close}
                className="w-full text-center py-2.5 border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white font-bold uppercase tracking-wider text-xs"
              >
                Log In
              </Link>
              <Link
                href="/register"
                onClick={close}
                className="w-full text-center py-2.5 bg-[#ee2b8c] dark:bg-[#FF00FF] text-white dark:text-black font-bold uppercase tracking-wider text-xs shadow-[3px_3px_0px_0px_#d61f7a] dark:shadow-[3px_3px_0px_0px_#B026FF]"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default MainNavbar;
