import React, { useState } from 'react';

export interface BookImageLargeProps {
  url: string;
  altText: string;
}

export const BookImageLarge = (props: BookImageLargeProps) => {
  const [imageError, setImageError] = useState(false);

    const { url, altText } = props;

      if (imageError) {
        return (
          <div className="h-full bg-gray-400 flex items-center justify-center aspect-[2/3]">
            <div className="text-center text-white bg-black p-4 rounded" >
              <h3 className="text-sm font-bold">{altText}</h3>

            </div>
          </div>
        );
      } else {
        return (
          <img
            src={url}
            alt={`${altText}`}
            className=" h-full object-contain aspect-[2/3]"
            onError={() => setImageError(true)}
          />
        );
      }
};
