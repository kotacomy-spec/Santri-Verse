import { BookOpen, Clock, Phone, Star } from "lucide-react";

const statusSementara = [{
    icon:<Clock size={20}/>,
    title:"Kehadiran",
    status:"Hadir",
    variant:"bg-blue-50 text-blue-500",
    variantStatus:"text-green-600"
},
{
    icon:<BookOpen size={20}/>,
    title:"Tahfidz",
    status:"Juz 5",
    variant:"bg-purple-100 text-purple-500",
variantStatus:"text-blue-700"
},
{
    icon:<Star size={20}/>,
    title:"Perilaku",
    status:"Baik",
    variant:"bg-orange-100 text-orange-500",
    variantStatus:"text-green-600"
},
{
    icon:<Phone size={20}/>,
    title:"Kesehatan",
    status:"Sehat",
    variant:"bg-green-50 text-green-500",
    variantStatus:"text-green-600"
}
]

export default function Status(){
    return(
        <>
        <div className="border rounded-xl shadow p-6 mx-4">
            <h1 className="text-xl font-semibold mb-4">Status Hari Ini</h1>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                {statusSementara.map(function(status){
                    return(
                        <div className="flex gap-4">
                            <span className={`p-2 ${status.variant} rounded-full h-fit`}>{status.icon}</span>
                            <div className="flex  flex-col">
                                <p className="text-[0.9rem] text-gray-700">{status.title}</p>
                                <h3 className={`font-medium ${status.variantStatus}`}>{status.status}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}