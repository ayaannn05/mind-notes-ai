import toast from "react-hot-toast";
import { createProject, getAllProjects, deleteProject } from "../../apis/projectApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Typography, Layout, Space, Modal } from "antd";
import { ProjectOutlined, RightOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const ProjectPage = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [projects, setProjects] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            toast.error("Please enter a project name");
            return;
        }
        try {
            await createProject(projectName);
            toast.success("Project created successfully!");
            setProjectName("");
            const updatedProjects = await getAllProjects();
            setProjects(updatedProjects);
            setIsModalVisible(false);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchProjects();
    }, []);
    
    const fetchProjects = async () => {
        try {
            const response = await getAllProjects();
            setProjects(response);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleProjectClick = (project_id) => {
        navigate(`/project/${project_id}`);
    }

    const deleteProjectHandler = (project_id, event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the Card
        Modal.confirm({
            title: 'Are you sure you want to delete this project?',
            icon: <DeleteOutlined style={{ color: '#ef4444' }} />,
            content: 'This action cannot be undone.',
            onOk: async () => {
                try {
                    await deleteProject(project_id);
                    fetchProjects();
                    toast.success("Project deleted successfully!");
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
        <Layout className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-teal-100">
            <Content className="p-8 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-4 bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90">
                    <Title level={4} className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">
                        <ProjectOutlined className="text-2xl text-teal-600" />
                        SmartEduHub - a notes , quiz and flashcards generator with AI
                    </Title>
                    <Button
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        className="h-12 px-8 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center"
                    >
                        Create Project
                    </Button>
                </div>

                <Space direction="vertical" size="small" className="w-full">
                    {projects.map((project,index) => (
                        <Card
                            key={index}
                            className="w-full cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 rounded-2xl border border-gray-200 b-2 bg-white backdrop-blur-lg bg-opacity-90"
                            onClick={() => handleProjectClick(project.project_id)}
                        >
                            <div className="flex items-center justify-between p-6">
                                <div>
                                    <Title level={3} className="mb-2 text-gray-800 font-bold">
                                        <span className="text-teal-500">#{index + 1}</span> {project.name}
                                    </Title>
                                </div>
                                <div className="flex items-center gap-4">
                                   
                                    <div className="bg-teal-50 p-4 rounded-full">
                                        <RightOutlined className="text-teal-600 text-2xl" />
                                    </div>

                                    <div className="bg-teal-50 p-4 rounded-full cursor-pointer" onClick={(event) => deleteProjectHandler(project.project_id, event)}>
                                        <DeleteOutlined className="text-red-600 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Space>

                <Modal
                    title="Create New Project"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="create" type="primary" onClick={handleCreateProject}>
                            Create
                        </Button>
                    ]}
                >
                    <Input
                        placeholder="Enter project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                    />
                </Modal>
            </Content>
        </Layout>
    )
}

export default ProjectPage