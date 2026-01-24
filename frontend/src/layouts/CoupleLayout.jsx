import React from "react"
import { Outlet } from "react-router-dom"
import { CoupleNavbar } from "../components"


const CoupleLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <CoupleNavbar />

      {/* Page Content */}
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  )
}

export default CoupleLayout
