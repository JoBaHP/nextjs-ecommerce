import { APP_NAME } from "@/lib/constants";

const Footer = () => {
    const year = new Date().getFullYear();

    return ( <footer className="footer border-t border-gray-200 py-4">
<div className="p-5 flex-center">
    {year} {APP_NAME}.&copy; All rights reserved
</div>
    </footer>);
}
 
export default Footer;