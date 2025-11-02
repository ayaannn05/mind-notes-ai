import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllSessions, deleteSession } from '../../apis/sessionApi';
import { Button, Card, Modal } from 'antd';
import { FolderOutlined, PlusOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import CreateSession from '../../components/CreateSession';

const ProjectItems = () => {
    const { project_id } = useParams();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const fetchSessions = async () => {
        try {
            const sessions = await getAllSessions(project_id);
            setSessions(sessions);
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        fetchSessions();
    }, [project_id]);

    const deleteSessionHandler = (session_id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this note?',
            icon: <DeleteOutlined style={{ color: '#ef4444' }} />,
            content: 'This action cannot be undone.',
            onOk: async () => {
                try {
                    await deleteSession(project_id, session_id);
                    fetchSessions();
                    toast.success("Note deleted successfully!");
                } catch (error) {
                    toast.error(error.message);
                }
            },
            okText: 'Yes, delete it!',
            cancelText: 'Cancel',
            okButtonProps: { className: 'bg-red-500 hover:bg-red-600' },
        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100">
            <div className="max-w-7xl mx-auto p-8">
                <div className="flex justify-between items-center mb-8 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90">
                    <Button
                        type="default"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/project')}
                        className="flex items-center justify-center gap-2  px-6 text-teal-600 border-teal-200 hover:text-teal-700 hover:border-teal-300 rounded-xl transition-all duration-300"
                    >
                        Back to Projects
                    </Button>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">Smart Notes</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        className="flex justify-center gap-2  bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Create Note with AI
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.length > 0 ? sessions.map((session, index) => (
                        <Card
                            key={index}
                            hoverable
                            className="bg-white backdrop-blur-lg bg-opacity-90 rounded-2xl border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                        >
                            <div 
                                className="flex items-center space-x-4 cursor-pointer" 
                                onClick={() => navigate(`/session/${session.session_id}`, { state: { session_id: session.session_id, session_name: session.session_name } })}
                            >
                                <div className="bg-teal-50 p-3 rounded-xl">
                                    <FolderOutlined className="text-3xl text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{session.session_name}</h3>
                                    <p className="text-sm text-teal-600">Note #{index + 1}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <Button 
                                    type="text"
                                    className="flex items-center justify-center w-10 h-10 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300" 
                                    onClick={() => deleteSessionHandler(session.session_id)}
                                >
                                    <DeleteOutlined className="text-xl" />
                                </Button>
                            </div>
                        </Card>
                    )) : (
                        <div className="col-span-3 text-center py-20 bg-white rounded-2xl shadow-md">
                            <FolderOutlined className="text-5xl text-teal-300 mb-4" />
                            <p className="text-gray-500 text-lg">No notes found. Create your first note!</p>
                        </div>
                    )}
                </div>
            </div>
            <CreateSession project_id={project_id} setSessions={setSessions} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    )
}

export default ProjectItems