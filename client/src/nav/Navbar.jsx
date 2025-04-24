

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Navbar() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '0',
        published: false,
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:3000/users/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    'Content-Type': 'application/json' 
                }
            });
            console.log(response.data); 
            setFormData({
                title: '',
                description: '',
                status: '0',
                published: false,
                deadline:''
            });
            
            // Close the modal after submission (if needed)
            document.getElementById('my_modal_1').close();
            window.location.reload();
        } catch (error) {
            // Handle error
            console.error('Error creating task:', error);
        }
    };

    const handleLogout = () => {
        // Clear JWT token (assuming it's stored in localStorage)
        localStorage.setItem("token", null);
        
        // Redirect to the home page
        navigate("/");
    };

    return (
        <>

            <div className="navbar bg-base-100 border border-slate-300 fixed z-20">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Kanban Board</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="">
                        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add</button>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex="0" className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create Task</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">


                        <div>
                            <label htmlFor="title" className="block text-sm font-medium">Title:</label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">Description:</label>
                            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full"></textarea>
                        </div>


                        <div>
                            <label htmlFor="status" className="block text-sm font-medium">Status:</label>
                            <select id="status" name="status" value={formData.status} onChange={handleChange} className="select select-bordered w-full">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                    
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium">Deadline:</label>
                            <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className="input input-bordered w-full" />
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleChange} className="checkbox" />
                            <label htmlFor="published" className="ml-2 text-sm">Published</label>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" onClick={() => document.getElementById('my_modal_1').close()} className="btn">Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
