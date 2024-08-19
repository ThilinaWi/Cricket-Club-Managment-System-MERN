import React from 'react';

const PrintableTicket = ({ session }) => {
  return (
    <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row max-h-[400px] ">
      <div
        className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0"
      >
        <img
          src="https://i.pinimg.com/564x/78/6d/36/786d36eacfd5d552cb804a1810d4824f.jpg"
          alt="card-image"
          className="object-cover w-full h-[100%] object-bottom"
        />
      </div>
      <div className="p-6">
        <h6 className="block mb-4 font-poppins text-2xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
          Ticket
        </h6>
        <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {session && session.practiceSessionName}
        </h4>
        <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          {session && session.description}
        </p>
        <div className="flex font-poppins font-medium space-x-10 uppercase items-center text-center ">
          <div className="flex-col text-center">
            <h1>Date</h1>
            <h1>{session && session.date ? new Date(session.date).toLocaleDateString() : ''}</h1>
          </div>

          <div className="flex-col text-center">
            <h1>Location</h1>
            <h1>{session && session.location}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableTicket;
