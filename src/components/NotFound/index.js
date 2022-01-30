import React from 'react';
import Lottie from 'react-lottie';

const NotFound = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: require('../../assets/lottie/notFound.json'),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<div className="h-100 w-100 d-flex align-items-center justify-content-center">
			<Lottie
				options={defaultOptions}
				height={400}
				width={560}
				isStopped={false}
				isPaused={false}
			/>
		</div>
	);
};

export default NotFound;
