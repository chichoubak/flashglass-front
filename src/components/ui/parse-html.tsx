export function ParseHtml({ html, ...props }: React.ComponentProps<'p'> & { html: string }) {
	return (
		<p
			{...props}
			dangerouslySetInnerHTML={{
				__html: html || '',
			}}
		/>
	)
}
