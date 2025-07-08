import Anak from "../layout/AnakLayout/Anak";
import AktivitasSantri from "./AktivitasSantri";
import Status from "./Status";

export default function  OrangtuaHome(){
    return(
        <>
        <div className="mx-6 my-4 gap-4 grid">
            <Anak/>
            <Status/>
            <AktivitasSantri/>
        </div>
        </>
    )
}