import React from "react";
import { useSelector } from "react-redux";
import { NoWeddingDashboard, WeddingDashboard } from "../../components";

const CoupleDashboard = () => {
  const { wedding, loading } = useSelector((state) => state.couple);

  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (!wedding) {
    return <NoWeddingDashboard />;
  }

  return <WeddingDashboard wedding={wedding} />;
};

export default CoupleDashboard;
