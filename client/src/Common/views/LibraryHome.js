import Navbar from "../components/Navigation/Navbar";
import Login from "../../Admin/Components/registration/Login";
import AllBooksGrid from "../../Admin/Components/ManageBooks/AllBooksGrid";
export default function LibraryHome(props) {
    const cookie = document.cookie.match(/^(.*;)?\s*usertoken\s*=\s*[^;]+(.*)?$/);
    return ( <><Navbar/>
        {cookie ?<AllBooksGrid isLibraryHome="true"></AllBooksGrid>:<Login isLibraryHome="true"></Login>}
        </>)
}