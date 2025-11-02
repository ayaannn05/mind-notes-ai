import { Modal, Button, Input, Select, Spin, Checkbox } from 'antd';

import { useState } from 'react';
import { createSession, getAllSessions } from '../apis/sessionApi';
import toast from 'react-hot-toast';
const { Option } = Select;
const { TextArea } = Input;
const SourceType = {
    subtitle_file: {
        name: "Subtitle File",
        available: true,
        key: "subtitle_file",
        placeholder: "Upload a subtitle file",
        inputType: "upload",
        accept: '.srt',
    },
    youtube: {
        name: "YouTube URL",
        available: true,
        key: "youtube",
        placeholder: "https://www.youtube.com/watch?v=cQT33yu9pY8",
        inputType: "input",
    },
    text: {
        name: "Text",
        available: true,
        key: "text",
        placeholder: "Enter a text",
        inputType: "textarea",
    },
    pdf: {
        name: "PDF",
        available: true,
        key: "pdf",
        placeholder: "Upload a PDF file",
        inputType: "upload",
        accept: '.pdf',
    },
    local: {
        name: "Upload Video or Audio",
        available: true,
        key: "local_video",
        placeholder: "Upload a video or audio file",
        inputType: "upload",
        accept: '.mp4, .mp3',
    },
}

const CreateSession = ({ project_id, setSessions, isModalVisible, setIsModalVisible }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sessionName, setSessionName] = useState("");
    const [source, setSource] = useState(null);
    const [sourceType, setSourceType] = useState(SourceType.subtitle_file);
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [useFileName, setUseFileName] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSource(file);
        if (file && useFileName) {
            setSessionName(file.name.replace(/\.[^/.]+$/, ""));
        }
    };

    const handleCreateSession = async () => {
        if (!sessionName) {
            toast.error("Please enter a session name");
            return;
        }
        if (sourceType.key === SourceType.youtube.key && !url) {
            toast.error(`Please enter a valid ${sourceType.name} URL`);
            return;
        }
        if (sourceType.key === SourceType.subtitle_file.key && !source) {
            toast.error(`Please upload a ${sourceType.name} file`);
            return;
        }
        if (sourceType.key === SourceType.text.key && !text) {
            toast.error(`Please enter a text`);
            return;
        }

        try {
            setIsLoading(true);
            await createSession(project_id, sessionName, source, sourceType.key, url, text);
            setIsModalVisible(false);
            const updatedSessions = await getAllSessions(project_id);
            setSessions(updatedSessions);
            setSessionName("");
            setSource(null);
            setUrl("");
            toast.success('Session created successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Create New Notes"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
                <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                    Cancel
                </Button>,
                <Button
                    key="create"
                    type="primary"
                    onClick={handleCreateSession}
                    className="bg-blue-500 hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2 animate-pulse">
                            <Spin size="small" className="text-white" /> Creating...
                        </span>
                    ) : "Create"}
                </Button>
            ]}
        >
            <div className="space-y-6 mt-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Session Name
                    </label>
                    <Input
                        placeholder="Enter session / notes name"
                        value={sessionName}
                        onChange={(e) => setSessionName(e.target.value)}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        How would you like to create your notes?
                    </label>
                    <Select
                        value={sourceType.name}
                        onChange={(value) => {
                            setSourceType(SourceType[value]);
                            setSource(null);
                            setUrl("");
                            setSessionName("");
                            setUseFileName(true);
                        }}
                        className="w-full"
                    >
                        {Object.keys(SourceType).sort((a, b) => SourceType[b].available - SourceType[a].available).map(key => (
                            <Option key={key} value={key} disabled={!SourceType[key].available}>
                                {SourceType[key].name}
                            </Option>
                        ))}
                    </Select>
                </div>
                {sourceType.inputType === "upload" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {sourceType.name}
                        </label>
                        <input
                            type="file"
                            accept={sourceType.accept}
                            onChange={handleFileChange}
                            className="w-full border p-2 rounded-md"
                        />
                        {source && (sourceType.key === SourceType.subtitle_file.key || sourceType.key === SourceType.local.key) && (
                            <Checkbox
                                checked={useFileName}
                                onChange={(e) => {
                                    setUseFileName(e.target.checked);
                                    if (e.target.checked && source) {
                                        setSessionName(source.name.replace(/\.[^/.]+$/, ""));
                                    }
                                }}
                                className="mt-2"
                            >
                                Use file name as session / notes name
                            </Checkbox>
                        )}
                    </div>
                )}
                {sourceType.inputType === "input" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {sourceType.name} URL
                        </label>
                        <Input
                            placeholder={sourceType.placeholder}
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                            className="w-full"
                        />
                    </div>
                )}
                {sourceType.inputType === "textarea" && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {sourceType.name} Input
                        </label>
                        <TextArea
                            placeholder={`Enter your ${sourceType.name} here`}
                            className="w-full"
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>
        </Modal>
    )
}

export default CreateSession