import Anak from "../layout/AnakLayout/Anak";
import PelanggaranTerbaru from "./PelanggaranTerbaru";
import Berita from "./Berita";



export default function  OrangtuaHome(){
    // const [show ] = useState(true)
    return(
        <>
        <div className="mx-8 my-4 gap-6 grid">
            <Berita/>
            <Anak />
            <PelanggaranTerbaru />
        </div>
        </>
    )
}