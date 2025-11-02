import React, { useState } from 'react'
import { createNote } from '../apis/notes'
import toast from 'react-hot-toast'
import { FaTimes, FaYoutube, FaFileAlt, FaFileUpload, FaFileVideo, FaFileWord } from 'react-icons/fa'
import { Card } from 'antd'

const SourceType = {
    YOUTUBE: "youtube", 
    SUBTITLE_FILE: "subtitle_file",
    TEXT: "text",
    PDF: "pdf",
    LOCAL_VIDEO: "local_video",
}

const CreateNoteModal = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('')
  const [sourceType, setSourceType] = useState(null)
  const [sourceData, setSourceData] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setShowAnimation(true)
      
      const formData = new FormData()
      formData.append('title', title)
      formData.append('sourceType', sourceType)
      
      if (sourceType === SourceType.TEXT || sourceType === SourceType.YOUTUBE) {
        formData.append('sourceData', sourceData)
      } else {
        formData.append('file', file)
      }

      // Animate progress bar
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      await createNote(formData)
      setProgress(100)
      toast.success('Note created successfully')
      
      // Add small delay to show 100% completion
      setTimeout(() => {
        onClose()
        window.location.reload()
      }, 500)

    } catch (error) {
      setShowAnimation(false)
      setProgress(0)
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sourceTypes = [
    {
      type: SourceType.YOUTUBE,
      icon: <FaYoutube className="text-4xl text-[#F57C05]" />,
      title: "YouTube",
      description: "Create notes from YouTube video"
    },
    {
      type: SourceType.TEXT,
      icon: <FaFileWord className="text-4xl text-[#F57C05]" />,
      title: "Text", 
      description: "Create notes from text content"
    },
    {
      type: SourceType.PDF,
      icon: <FaFileAlt className="text-4xl text-[#F57C05]" />,
      title: "PDF",
      description: "Create notes from PDF file"
    },
    {
      type: SourceType.LOCAL_VIDEO,
      icon: <FaFileVideo className="text-4xl text-[#F57C05]" />,
      title: "Video/Audio",
      description: "Create notes from video/audio file"
    },
    {
      type: SourceType.SUBTITLE_FILE,
      icon: <FaFileUpload className="text-4xl text-[#F57C05]" />,
      title: "Subtitle",
      description: "Create notes from subtitle file"
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-[95%] max-w-2xl shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F57C05] to-orange-600 bg-clip-text text-transparent">
              Create New Note
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {showAnimation && (
            <div className="mb-6">
              <div className="relative w-full bg-gradient-to-r from-orange-100 to-orange-50 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-[#F57C05] rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="text-3xl animate-bounce inline-block">🧠</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F57C05] to-orange-600 transition-all duration-500 rounded-full"
                    style={{width: `${progress}%`}}
                  />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-800">Creating your smart notes...</p>
                  <p className="text-gray-600">
                    {progress < 30 && "Analyzing your content..."}
                    {progress >= 30 && progress < 60 && "Extracting key information..."}
                    {progress >= 60 && progress < 90 && "Generating comprehensive notes..."}
                    {progress >= 90 && "Almost there! Finalizing your notes..."}
                  </p>
                  <p className="text-[#F57C05] font-medium">{progress}% Complete</p>
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-[#F57C05] animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-[#F57C05] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 rounded-full bg-[#F57C05] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          )}

          {step === 1 ? (
            <>
              <h3 className="text-lg text-gray-600 mb-6 font-medium">Select source type:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sourceTypes.map((source) => (
                  <Card 
                    key={source.type}
                    hoverable
                    className="text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100 hover:border-[#F57C05]"
                    onClick={() => {
                      setSourceType(source.type)
                      setStep(2)
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 p-2">
                      {source.icon}
                      <h3 className="text-lg font-semibold">{source.title}</h3>
                      <p className="text-gray-500 text-sm">{source.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C05] bg-gray-50"
                  placeholder="Enter note title (e.g. History Chapter 1)"
                  required
                />
              </div>

              {(sourceType === SourceType.TEXT || sourceType === SourceType.YOUTUBE) ? (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    {sourceType === SourceType.TEXT ? 'Content or Prompt' : 'YouTube URL'}
                  </label>
                  <textarea
                    value={sourceData}
                    onChange={(e) => setSourceData(e.target.value)}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F57C05] bg-gray-50"
                    rows={sourceType === SourceType.TEXT ? 6 : 1}
                    placeholder={sourceType === SourceType.TEXT ? 
                      "Enter your content or prompt here...\n\nExample content:\nThe American Revolution was a colonial revolt that began in Massachusetts...\n\nExample prompt:\nWrite a detailed explanation about the causes and effects of World War II" : 
                      "Enter YouTube URL (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)"}
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="w-full"
                      accept={sourceType === SourceType.PDF ? '.pdf' : sourceType === SourceType.LOCAL_VIDEO ? 'video/*,audio/*' : '.srt,.vtt'}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 border-2 border-[#F57C05] text-[#F57C05] rounded-xl hover:bg-orange-50 font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#F57C05] to-orange-600 text-white py-3 px-4 rounded-xl hover:opacity-90 transition-all disabled:from-gray-400 disabled:to-gray-500 font-medium shadow-lg shadow-orange-200"
                >
                  {loading ? 'Creating...' : 'Create Note'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateNoteModal