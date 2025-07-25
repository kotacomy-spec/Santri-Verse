import { Icon, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardMusyrif = () => {
  return (
    <>
      <div className="bg-background text-foreground">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-bold">Dashboard Musyrif</h1>
              <p className="text-mu text-foreground mt-1">
                Pantau data pelanggaran, kondisi kesehatan, dan perizinan santri
                secara menyeluruh dalam satu tampilan terpadu.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map(() => (
              <Card className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    Santri
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-blue-100`}>
                    <TrendingUp className="h-4 w-4 mr-1" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-slate-900">12</div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center text-sm font-medium text-green-600 `}
                      >
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>12%</span>
                      </div>
                      <span className="text-xs text-slate-500">
                        vs bulan lalu
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">Deskripsi</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMusyrif;
