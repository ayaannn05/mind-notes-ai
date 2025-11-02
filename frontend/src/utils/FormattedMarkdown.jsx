import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/atom-one-light.css";

const FormattedMarkdown = ({ children }) => {
    return (
      <div className="max-w-none">
        <ReactMarkdown
          className="prose prose-lg max-w-none"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Headings - cleaner and lighter
            h1: ({ children }) => (
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-8 mt-12 pb-4 border-b border-[#F57C05]/30">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 mt-12">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl lg:text-2xl font-medium text-gray-800 mb-5 mt-10">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg lg:text-xl font-medium text-gray-700 mb-4 mt-8">
                {children}
              </h4>
            ),
            h5: ({ children }) => (
              <h5 className="text-base lg:text-lg font-medium text-gray-700 mb-3 mt-6">
                {children}
              </h5>
            ),
            h6: ({ children }) => (
              <h6 className="text-base font-medium text-gray-600 mb-3 mt-5">
                {children}
              </h6>
            ),

            // Paragraphs - comfortable reading
            p: ({ children }) => (
              <p className="text-gray-600 text-[17px] leading-[1.8] mb-6 font-normal">
                {children}
              </p>
            ),

            // Lists with MUCH better spacing
            ul: ({ children }) => (
              <ul className="space-y-5 mb-8 ml-0 list-none">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="space-y-5 mb-8 ml-8 list-decimal marker:text-[#F57C05] marker:font-normal">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-600 text-[17px] leading-[1.8] pl-8 relative font-normal">
                <span className="absolute left-0 top-[2px] text-[#F57C05] text-lg font-medium">
                  •
                </span>
                <div className="space-y-3">{children}</div>
              </li>
            ),

            // Strong - less bold
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-800">
                {children}
              </strong>
            ),

            // Emphasis
            em: ({ children }) => (
              <em className="italic text-gray-600">{children}</em>
            ),

            // Inline code - subtle and clean
            code: ({ inline, children }) =>
              inline ? (
                <code className="bg-orange-50/60 text-[#F57C05] rounded-md px-2 py-0.5 text-[15px] font-mono font-medium border border-orange-100">
                  {children}
                </code>
              ) : (
                <code className="text-[15px] leading-relaxed font-normal">
                  {children}
                </code>
              ),

            // Code blocks - clean and professional
            pre: ({ children }) => (
              <pre className="bg-gray-50 text-gray-800 rounded-xl p-6 mb-8 overflow-x-auto shadow-sm border border-gray-200">
                {children}
              </pre>
            ),

            // Tables - modern and clean
            table: ({ children }) => (
              <div className="overflow-x-auto mb-10 rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gradient-to-r from-[#F57C05]/90 to-[#ff9642]/90">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="bg-white divide-y divide-gray-100">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr className="hover:bg-orange-50/40 transition-colors duration-150">
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wide">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-[16px] text-gray-600 font-normal">
                {children}
              </td>
            ),

            // Blockquotes - elegant and subtle
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#F57C05]/60 bg-orange-50/40 pl-6 pr-6 py-5 mb-8 italic text-gray-600 rounded-r-lg">
                {children}
              </blockquote>
            ),

            // Links - clean underline style
            a: ({ children, href }) => (
              <a
                href={href}
                className="text-[#F57C05] hover:text-[#ff9642] underline decoration-1 underline-offset-4 font-medium transition-all duration-200 hover:decoration-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),

            // Horizontal rule
            hr: () => <hr className="border-t border-gray-200 my-12" />,
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
    );
};

export default FormattedMarkdown;
