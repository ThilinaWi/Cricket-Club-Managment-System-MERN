import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSinglePsessionAction, pSessionLoadAction } from '../../redux/actions/pSessionAction';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const PSessionDash = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pSessionLoadAction());
    }, []);

    const { success: deleteSuccess } = useSelector(state => state.deletepSession);
    const { loading, sessions } = useSelector(state => state.loadPSessions);
    let data = [];
    data = (sessions !== undefined && sessions.length > 0) ? sessions : [];

    const deletePsessionById = (e, id) => {
        if (window.confirm(`You really want to delete product ID: "${id}" ?`)) {
            dispatch(deleteSinglePsessionAction(id));
            if (deleteSuccess && deleteSuccess === true) {
                dispatch(pSessionLoadAction());
            }
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white pb-3">Practice Session list</h1>
            <div className="pb-2 flex justify-end">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ">
                    <Link to="/admin/createpsessions">+  Create Practice Session</Link>
                </button>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-gray-700 text-white font-poppins font-medium uppercase">
                            <th className="px-4 py-2">Psession ID</th>
                            <th className="px-4 py-2">Practice Session name</th>
                            <th className="px-4 py-2">Available</th>
                            <th className="px-4 py-2">Location</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(session => (
                            <tr key={session._id} className="bg-white border-b dark:border-gray-700 hover:bg-stone-300 dark:hover:bg-gray-200 font-poppins font-medium text-center">
                                <td className="border px-4 py-2">{session._id}</td>
                                <td className="border px-4 py-2">{session.practiceSessionName}</td>
                                <td className="border px-4 py-2">{session.available ? 'Yes' : 'No'}</td>
                                <td className="border px-4 py-2">{session.location}</td>
                                <td className="border px-4 py-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <Link to={`/admin/updatepsessions/${session._id}`}>Edit</Link>
                                    </button>
                                    <button onClick={(e) => deletePsessionById(e, session._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PSessionDash;
