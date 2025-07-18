import { Bell, BookOpenText, User } from "lucide-react";

export default function OrangtuaHeader() {
  return (
    <>
      <div className="flex h-full justify-between border-b-2 border-gray-200 mx-6 py-3 px-4">
        <div className="flex justify-between gap-2 items-center">
          <span className="bg-green-100 text-green-700 w-fit h-fit p-1.5 rounded-[10px]">
            <div className="rounded-full border-2 border-green-700 p-1.5">
            <BookOpenText size={20} />
            </div>
          </span>
          <div className="flex flex-col justify-center h-fit font-semibold">
            <h1 className="text-lg">Monitoring Santri</h1>
            <p className="text-sm text-gray-500">Mondok</p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <a className=" text-green-700">
            <Bell size={22} />
          </a>
          <a className=" text-green-700">
            <User size={22} />
          </a>
        </div>
      </div>
    </>
  );
}
