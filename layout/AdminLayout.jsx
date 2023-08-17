import Head from "next/head";
import Link from "next/link";
import React from "react";
import AdminNavbar from "../components/Shared/Navbar/AdminNavbar";
import AdminRoute from "../hooks/useAdmin/AdminRoute";

const AdminLayout = ({ children, title }) => {
  return (
    <AdminRoute>
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <AdminNavbar />
        <div className="drawer lg:drawer-open">
          <input id="admin-dash" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex  justify-center">
            {/* Page content here */}
            {children}
          </div>
          <div className="drawer-side">
            <label htmlFor="admin-dash" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link href={"/admin"}>Dashboard</Link>
              </li>
              <li>
                <Link href={"/admin/posts"}>Posts</Link>
              </li>
              <li>
                <Link href={"/admin/category"}>Catetgory</Link>
              </li>
              <li>
                <Link href={"/admin/users"}>Users</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminLayout;
