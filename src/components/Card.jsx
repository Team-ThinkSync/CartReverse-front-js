import React from "react";

export const Card = ({ children, className = "", videoSrc, imageSrc, ...props }) => {
  return (
    <div 
      className={`relative rounded-lg border border-gray-200 shadow-sm overflow-hidden h-full ${className}`}
      {...props}
    >
      
      {videoSrc ? (
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : imageSrc ? (
        <img 
          src={imageSrc} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}

      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-4 flex-grow ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-lg font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
};

