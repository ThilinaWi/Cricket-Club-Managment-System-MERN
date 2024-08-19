import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allCoachAction } from '../redux/actions/coachActions'; 
import NavBar from '../component/NavBar'

const CoachList = () => {
  const dispatch = useDispatch();
  const allCoaches = useSelector(state => state.allCoach);
  const { loading, error, coaches } = allCoaches;

  useEffect(() => {
    dispatch(allCoachAction());
  }, [dispatch]);

  return (
    <>
    <NavBar/>
    <div className="container mx-auto mt-10">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 font-poppins uppercase text-center text-5xl">Coach List</h2>
          {Array.isArray(coaches) && coaches.length > 0 ? (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Age</th>
                  <th className="py-3 px-6 text-left">Gender</th>
                  <th className="py-3 px-6 text-left">Telephone</th>
                  <th className="py-3 px-6 text-left">Level</th>
                  <th className="py-3 px-6 text-left">Age Group</th>
                  <th className="py-3 px-6 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {coaches.map((coach) => (
                  <tr key={coach._id} className="border-b border-gray-200 hover:bg-gray-100 font-poppins">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{coach.name}</td>
                    <td className="py-3 px-6 text-left">{coach.age}</td>
                    <td className="py-3 px-6 text-left">{coach.gender}</td>
                    <td className="py-3 px-6 text-left">{coach.tp}</td>
                    <td className="py-3 px-6 text-left">{coach.level}</td>
                    <td className="py-3 px-6 text-left">{coach.age_group}</td>
                    <td className="py-3 px-6 text-left">{coach.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No coaches data available.</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default CoachList;
