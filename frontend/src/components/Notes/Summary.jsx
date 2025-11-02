import React from "react";
import FormattedMarkdown from "../../utils/FormattedMarkdown";
const Summary = ({ note }) => {
  return (
    <div className="prose max-w-none">
      <FormattedMarkdown>{note.summary}</FormattedMarkdown>
    </div>

  );
};

export default Summary;
