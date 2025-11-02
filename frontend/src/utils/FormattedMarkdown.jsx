import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github.css";

const FormattedMarkdown = ({ children }) => {
    return (
        <ReactMarkdown
            className="prose prose-sm max-w-none whitespace-pre-wrap text-[15px]"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                table: ({ children }) => (
                    <table className="min-w-full border border-[#2C3E50] bg-white rounded shadow-sm mb-2">{children}</table>
                ),
                thead: ({ children }) => (
                    <thead className="bg-[#2C3E50] text-white">{children}</thead>
                ),
                tbody: ({ children }) => (
                    <tbody className="divide-y divide-[#2C3E50]/20">{children}</tbody>
                ),
                tr: ({ children }) => (
                    <tr className="hover:bg-[#2C3E50]/5">{children}</tr>
                ),
                th: ({ children }) => (
                    <th className="p-2 text-left font-semibold">{children}</th>
                ),
                td: ({ children }) => (
                    <td className="p-2">{children}</td>
                ),
                code: ({ children }) => (
                    <code className="bg-[#2C3E50]/10 text-[#2C3E50] rounded px-1">{children}</code>
                ),
                h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-[#2C3E50]">{children}</h1>
                ),
                h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-[#2C3E50] mt-4">{children}</h2>
                ),
                h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-[#2C3E50] mt-3">{children}</h3>
                ),
                p: ({ children }) => (
                    <p className="text-gray-700">{children}</p>
                ),
                ul: ({ children }) => (
                    <ul className="list-disc list-inside ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="list-decimal list-inside ml-4">{children}</ol>
                ),
                strong: ({ children }) => (
                    <strong className="font-bold text-[#2C3E50]">{children}</strong>
                ),
                em: ({ children }) => (
                    <em className="italic text-[#2C3E50]/80">{children}</em>
                ),
            }}
        >
            {children}
        </ReactMarkdown>
    );
};

export default FormattedMarkdown;
