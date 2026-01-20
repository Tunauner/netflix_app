const Footer = () => {
	return (
		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
				<p className='text-sm'>&copy; 2024 Netflix Clone. All rights reserved.</p>
				<div className='flex flex-wrap items-center justify-center gap-4 text-sm'>
					<a href='#' className='hover:underline'>
						Audio and Subtitles
					</a>
					<a href='#' className='hover:underline'>
						Help Center
					</a>
					<a href='#' className='hover:underline'>
						Gift Cards
					</a>
					<a href='#' className='hover:underline'>
						Media Center
					</a>
					<a href='#' className='hover:underline'>
						Investor Relations
					</a>
					<a href='#' className='hover:underline'>
						Jobs
					</a>
					<a href='#' className='hover:underline'>
						Terms of Use
					</a>
					<a href='#' className='hover:underline'>
						Privacy	
					</a>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
