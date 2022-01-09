import React from "react";
import HOCs from "../HOCs";
import {uploadLab} from "./adminService";


function AdminPageContainer() {


    return (
        <>
            <form>
                <input
                    onChange={(e) => uploadLab(e.target)}
                    type="file"
                />
            </form>
        </>
    )
}

export default HOCs.withHeader(AdminPageContainer);