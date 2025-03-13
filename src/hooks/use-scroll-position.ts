import { useEffect, useState } from 'react'

export function useScrollPosition() {
	const [position, setPosition] = useState({
		last: 0,
		current: 0,
	})

	useEffect(() => {
		function updateScroll() {
			setPosition((prev) => ({
				last: prev.current,
				current: document.documentElement.scrollTop,
			}))
		}
		window?.addEventListener('scroll', updateScroll)
		return () => window?.removeEventListener('scroll', updateScroll)
	}, [])

	if (position.current === 0) return 'up'

	return position.last - position.current >= 0 ? 'up' : 'down'
}
