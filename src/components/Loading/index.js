import React from 'react';
import Lottie from 'react-lottie';

const Loading = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: require('../../assets/lottie/loading.json'),
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<div className="h-100 w-100 d-flex align-items-center justify-content-center">
			<Lottie
				options={defaultOptions}
				height={600}
				width={600}
				isStopped={false}
				isPaused={false}
			/>
		</div>
	);
};

export default Loading;
