// "use client";
// import React, { useState, useEffect } from "react";
// import { fetchTopics, createTopic, updateTopic, deleteTopic } from "./api/topics";
// import { Pencil, Trash2, X } from "lucide-react";

// const TopicList = () => {
//   const [topics, setTopics] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTopic, setNewTopic] = useState({ topic_id: "", topic_name: "" });

//   useEffect(() => {
//     loadTopics();
//   }, []);

//   const loadTopics = async () => {
//     try {
//       const data = await fetchTopics();
//       setTopics(data);
//     } catch (error) {
//       console.error("Error fetching topics:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTopic({ ...newTopic, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createTopic(newTopic);
//     loadTopics();
//     setNewTopic({ topic_id: "", topic_name: "" });
//     setIsModalOpen(false);
//   };

//   const handleDelete = async (topicId) => {
//     await deleteTopic(topicId);
//     loadTopics();
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h1 className="text-xl font-bold text-indigo-800">Topics</h1>

//         <button onClick={() => setIsModalOpen(true)} className="mt-4 px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">
//           + Add New Topic
//         </button>

//         {/* Topics Table */}
//         <div className="mt-4">
//           <table className="min-w-full border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Topic ID</th>
//                 <th className="border p-2">Topic Name</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topics.map((topic) => (
//                 <tr key={topic.topic_id}>
//                   <td className="border p-2">{topic.topic_id}</td>
//                   <td className="border p-2">{topic.topic_name}</td>
//                   <td className="border p-2 flex gap-2">
//                     <button className="text-blue-500 hover:text-blue-700">
//                       <Pencil size={18} />
//                     </button>
//                     <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(topic.topic_id)}>
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl shadow-lg">
//             <div className="flex justify-between">
//               <h2 className="text-xl">Add New Topic</h2>
//               <button onClick={() => setIsModalOpen(false)}>
//                 <X size={24} />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-black">
//               <input type="text" name="topic_name" placeholder="Topic Name" value={newTopic.topic_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
//               <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                 Save Topic
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TopicList;

"use client";
import React, { useState, useEffect } from "react";
import { fetchTopics, createTopic, updateTopic, deleteTopic } from "./api/topics";
import { Pencil, Trash2, X } from "lucide-react";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ topic_id: "", topic_name: "" });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await fetchTopics();
      setTopics(data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTopic({ ...newTopic, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTopic(newTopic);
    loadTopics();
    setNewTopic({ topic_id: "", topic_name: "" });
    setIsModalOpen(false);
  };

  const handleDelete = async (topicId) => {
    await deleteTopic(topicId);
    loadTopics();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar handleEdit={(action) => console.log(action)} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-indigo-800">Topics</h1>

          <button onClick={() => setIsModalOpen(true)} className="mt-4 px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">
            + Add New Topic
          </button>

          {/* Topics Table */}
          <div className="mt-4">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Topic ID</th>
                  <th className="border p-2">Topic Name</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.topic_id}>
                    <td className="border p-2">{topic.topic_id}</td>
                    <td className="border p-2">{topic.topic_name}</td>
                    <td className="border p-2 flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Pencil size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(topic.topic_id)}>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between">
                <h2 className="text-xl">Add New Topic</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-black">
                <input
                  type="text"
                  name="topic_name"
                  placeholder="Topic Name"
                  value={newTopic.topic_name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Save Topic
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicList;