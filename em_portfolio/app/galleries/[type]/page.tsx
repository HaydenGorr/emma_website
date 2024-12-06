import DisplayPage from "../components/display_page";
import { gallery_type_enum } from "../../interfaces";

export default function Galleries({ params }) {

return (

	<div className="w-full flex flex-col items-center justify-center">
		<DisplayPage gallery_type={params.type || gallery_type_enum.standard }></DisplayPage>
	</div>
);
}
