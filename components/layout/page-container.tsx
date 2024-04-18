export const PageContainer = ({
	children,
	className,
}: {
	children?: React.ReactNode
	className?: string
}) => {
	return (
		<main className={className}>
			<div className="container">{children}</div>
		</main>
	)
}
