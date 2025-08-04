import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
const CardList = () => {
  return (
    <>
      <Card className="w-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <div className="flex gap-4 items-center">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full justify-center p-3 items-center flex">
              <AlertTriangle className="text-white h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 ">
              Pelanggaran Terbaru
            </h3>
            <Link to={"/keamanan/dashboard"}>Woe</Link>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          {/* <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-gray-900 transition-all duration-500 ease-in-out">
                Testing
              </h3>
              <p className="text-md font-medium text-gray-600">Judul</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-3 flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
          </div> */}
        </CardContent>
      </Card>
    </>
  );
};

export default CardList;
