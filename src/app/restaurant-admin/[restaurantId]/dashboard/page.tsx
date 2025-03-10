"use client";

import { DashboardStats } from "@/components/restaurant-admin/DashboardStats";
import { TopDishesChart } from "@/components/restaurant-admin/RecentOrdersTable";
import { useParams } from "next/navigation";

export default function RestaurantDashboard() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <DashboardStats restaurantId={restaurantId} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TopDishesChart restaurantId={restaurantId} />
        <div>{/* Additional chart or stats could go here */}</div>
      </div>

      {/*      <RecentOrdersTable restaurantId={restaurantId} />
       */}
    </div>
  );
}
