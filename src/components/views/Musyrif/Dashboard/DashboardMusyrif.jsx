import KpiCard from "./KpiCard";
import ChartDashboard from "./ChartDashboard";
import CardList from "./CardList";

const DashboardMusyrif = () => {
  return (
    <>
      <div className="bg-background text-foreground">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Musyrif </h1>
              <p className="text-mu text-foreground mt-1">
                Pantau data pelanggaran, kondisi kesehatan, dan perizinan santri
                secara menyeluruh dalam satu tampilan terpadu.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KpiCard />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartDashboard />
            </div>
            <div>
              <CardList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMusyrif;
