export default function Star({color = "white"}) {
	return (
		<span className={`material-symbols-rounded star text-${color}`}>
			star
		</span>
	)
}
