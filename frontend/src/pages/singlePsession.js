import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/lLoadingBox';
import Navbar from '../component/NavBar';
import { singlepSessionLoadAction } from '../redux/actions/pSessionAction';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Barcode } from 'react-barcode';

const Spsession = () => {
  const { palette } = useTheme();
  const ref = useRef();

  const dispatch = useDispatch();
  const { session, loading } = useSelector(state => state.singlepSession); //store name
  const { user } = useSelector(state => state.userProfile);
  
  const { id } = useParams();
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    dispatch(singlepSessionLoadAction(id));
  }, [id]);

  const handlePrint = () => {
    setShowPDF(true);
    setTimeout(() => {
      window.print();
      setShowPDF(false);
    }, 100);
  };

  return (
    <>
    
      {/* <Navbar /> */}
      <div className="flex flex-col items-center justify-center h-screen static pl-[70px]">
        <div className="flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row max-h-[400px] fixed ">
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
            <h6 className="block mb-4 font-poppins text-4xl antialiased font-semibold leading-relaxed tracking-normal text-blue-800 uppercase">
              Ticket
            </h6>
            <h4 className="block translate-y-[-28px] font-sans text-lg antialiased font-bold leading-snug tracking-normal text-blue-gray-900">
              {session && session.practiceSessionName}
            </h4>
            <p className="block mb-8 font-sans font-medium text-base antialiased leading-relaxed text-gray-700">
              {session && session.description}
            </p>
            <div className="flex font-poppins font-medium space-x-10 uppercase items-center text-center mt-[10px] ">
              <div className="flex-col text-center ">
                <h1 className="font-semibold">Date</h1>
                <h1>{session && session.date ? new Date(session.date).toLocaleDateString() : ''}</h1>
              </div>

              <div className="flex-col text-center">
                <h1 className="font-semibold">Location</h1>
                <h1>{session && session.location}</h1>
              </div>
              

            </div>
            <a href="#" className="inline-block pt-5">
              <button
                className="bg-indigo-700 flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-100 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-indigo-950 active:bg-gray-900/20"
                type="button"
                onClick={handlePrint}
              >
                {showPDF ? 'Hide' : 'Download Ticket'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
                {/*arrow */}
              </button>
              
            </a>
          </div>
        </div>
        <a className="translate-x-[-350px] bg-indigo-700 mt-10 p-3 rounded-lg translate-y-[230px] fixed" href='/psession'><button type="button" class="font-poppins font-semibold justify-start items-start text-white">Back</button></a>
      </div>
    </>
  );
};

export default Spsession;
