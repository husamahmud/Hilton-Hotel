import Footer from "../Footer/Footer";

export default function Index({children}) {
	return (
		<div>
			{children}
			<Footer />
		</div>
	);
}
