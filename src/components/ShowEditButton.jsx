import React, { useState } from 'react';

const ShowEditButton = ({isEditing, setIsEditing, onProfileUpdate}) => {

  const handleShow = () => {
	setIsEditing(true);
  };
  const handleHidden = (e) => {
    setIsEditing(false);
	onProfileUpdate(e);
  };

	return (
		<div className="z-50 absolute right-[80px] top-[370px] h-12 w-12 text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center min-w-[140px] w-1/5 justify-center lg:top-[400px] lg:right-[160px]">
			{!isEditing && 
				<button
					className="bg-transparent hover:bg-blue-700/10 text-white font-bold py-2 px-4
								 rounded-2xl"
					onClick={handleShow}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
					strokeWidth={1.5} 		  stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
					</svg>
				</button>
			}
			
			{isEditing && 
				<button
					className="bg-transparent hover:bg-blue-700/10 text-white font-bold py-2 px-4 rounded-2xl"
					onClick={handleHidden}
				>
					save
				</button>
			}
			
		</div>
	);
};

export default ShowEditButton;
