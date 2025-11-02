import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

export const exportSessionInPdf = (sessionData, session_name) => {
  const app_name = "MIND NOTES AI"
  try {
    const doc = new jsPDF("p", "mm", "a4");

    const pageHeight = 280; // A4 page height in mm
    const brandColor = [224, 111, 4]; // #E16F04 orange
    const textColor = [51, 51, 51]; // Dark gray for text
    const accentColor = [255, 236, 217]; // Light orange for accents

    const renderMarkdownToPdf = (
      doc,
      text,
      startY,
      maxWidth = 180,
      lineHeight = 7
    ) => {
      const lines = text.split("\n");
      let cursorY = startY;

      lines.forEach((line) => {
        if (cursorY > pageHeight) {
          doc.addPage();
          // Add header to new page
          doc.setFillColor(...brandColor);
          doc.rect(0, 0, 210, 15, "F");
          cursorY = 25;
        }

        // Handle table formatting
        if (line.includes("|")) {
          if (line.startsWith("|-")) return;

          const cells = line.split("|").filter((cell) => cell.trim());
          const tableData = [cells.map((cell) => cell.trim())];

          doc.autoTable({
            startY: cursorY,
            head: line.includes("Situation") ? [cells.map((cell) => cell.trim())] : null,
            body: !line.includes("Situation") ? tableData : null,
            theme: "grid",
            styles: {
              fontSize: 8, // Decreased font size
              cellPadding: 2, // Decreased padding
            },
            headStyles: {
              fillColor: brandColor,
              textColor: [255, 255, 255],
              fontStyle: "bold",
              fontSize: 8, // Decreased header font size
            },
            columnStyles: {
              0: { cellWidth: 35 }, // Decreased column widths
              1: { cellWidth: 35 },
              2: { cellWidth: 35 },
              3: { cellWidth: 35 },
            },
            alternateRowStyles: {
              fillColor: accentColor,
            },
            margin: { left: 15, right: 15 }, // Added margins
            tableWidth: 'auto', // Auto width to fit content
            rowHeight: 10, // Decreased row height
          });

          cursorY = doc.lastAutoTable.finalY + 3; // Decreased spacing after table
          return;
        }

        if (line.startsWith("## ")) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.setTextColor(...brandColor);
          doc.text(line.replace("## ", ""), 15, cursorY);
          doc.setDrawColor(...brandColor);
          doc.setLineWidth(0.5);
          doc.line(15, cursorY + 1, 195, cursorY + 1);
          cursorY += lineHeight + 4;
        } else if (line.startsWith("**")) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(...brandColor);
          const boldText = line.replace(/\*\*/g, "");
          const wrappedLines = doc.splitTextToSize(boldText, maxWidth);
          wrappedLines.forEach((wrappedLine) => {
            doc.text(wrappedLine, 15, cursorY);
            cursorY += lineHeight;
          });
        } else if (line.startsWith("* ")) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(...textColor);
          const bulletLine = `• ${line.replace("* ", "")}`;
          const wrappedLines = doc.splitTextToSize(bulletLine, maxWidth - 10);
          wrappedLines.forEach((wrappedLine) => {
            doc.text(wrappedLine, 20, cursorY);
            cursorY += lineHeight;
          });
        } else {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(...textColor);
          const wrappedLines = doc.splitTextToSize(line, maxWidth);
          wrappedLines.forEach((wrappedLine) => {
            doc.text(wrappedLine, 15, cursorY);
            cursorY += lineHeight;
          });
        }

        cursorY += 2;
      });

      return cursorY;
    };
    // Modern Title Page
    doc.setFillColor(...brandColor);
    doc.rect(0, 0, 210, 297, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    
    // App name at top
    doc.setFontSize(28);
    doc.text(app_name, 105, 50, { align: "center" });
    
    // Session name centered
    doc.setFontSize(12);
    const wrappedTitle = doc.splitTextToSize(session_name, 170);
    doc.text(wrappedTitle, 105, 150, { align: "center" });
    
    // Additional info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Study Notes", 105, 100, { align: "center" });
    doc.text(new Date().toLocaleDateString(), 105, 110, { align: "center" });
    doc.addPage();

    // Header for content pages
    doc.setFillColor(...brandColor);
    doc.rect(0, 0, 210, 15, "F");
    let cursorY = 30;

    // Notes Section
    if (sessionData.notes) {
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...brandColor);
      doc.text("Detailed Notes", 15, cursorY);
      doc.setLineWidth(0.5);
      doc.setDrawColor(...brandColor);
      doc.line(15, cursorY + 1, 195, cursorY + 1);
      cursorY += 15;
      cursorY = renderMarkdownToPdf(doc, sessionData.notes, cursorY);
    }

    // Summary Section with new page
    if (sessionData.summary) {
      doc.addPage();
      doc.setFillColor(...brandColor);
      doc.rect(0, 0, 210, 15, "F");
      cursorY = 30;
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...brandColor);
      doc.text("Summary", 15, cursorY);
      doc.setLineWidth(0.5);
      doc.line(15, cursorY + 1, 195, cursorY + 1);
      cursorY += 15;
      cursorY = renderMarkdownToPdf(doc, sessionData.summary, cursorY);
    }

    // Quiz Section
    if (sessionData.quiz && sessionData.quiz[0]?.questions?.length > 0) {
      doc.addPage();
      doc.setFillColor(...brandColor);
      doc.rect(0, 0, 210, 15, "F");
      cursorY = 30;
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...brandColor);
      doc.text("Practice Questions", 15, cursorY);
      doc.setLineWidth(0.5);
      doc.line(15, cursorY + 1, 195, cursorY + 1);
      cursorY += 15;

      sessionData.quiz[0].questions.forEach((question, index) => {
        if (cursorY > pageHeight) {
          doc.addPage();
          doc.setFillColor(...brandColor);
          doc.rect(0, 0, 210, 15, "F");
          cursorY = 30;
        }

        // Question text
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...brandColor);
        
        // Calculate height needed for question text
        const wrappedQuestion = doc.splitTextToSize(
          `Q${index + 1}. ${question.question}`,
          175
        );
        const questionHeight = wrappedQuestion.length * 8;

        // Draw background box with calculated height
        doc.setFillColor(...accentColor);
        doc.roundedRect(10, cursorY - 5, 190, questionHeight + 5, 2, 2, "F");
        
        // Render question text
        wrappedQuestion.forEach((line) => {
          doc.text(line, 15, cursorY);
          cursorY += 8;
        });

        // Options
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        
        // Number options starting from 1
        question.options.forEach((option, optIndex) => {
          if (cursorY > pageHeight) {
            doc.addPage();
            doc.setFillColor(...brandColor);
            doc.rect(0, 0, 210, 15, "F");
            cursorY = 30;
          }
          
          const wrappedOption = doc.splitTextToSize(`${optIndex + 1}. ${option}`, 165);
          wrappedOption.forEach((line) => {
            doc.text(line, 20, cursorY);
            cursorY += 7;
          });
        });

        if (cursorY > pageHeight) {
          doc.addPage();
          doc.setFillColor(...brandColor);
          doc.rect(0, 0, 210, 15, "F");
          cursorY = 30;
        }
        
        // Answer box
        doc.setFillColor(240, 249, 240);
        doc.roundedRect(15, cursorY - 5, 180, 20, 2, 2, "F");
        
        doc.setFont("helvetica", "bold");
        doc.setTextColor(46, 125, 50);
        const correctAnswer = doc.splitTextToSize(
          `Answer: ${question.correct_answer}`,
          170
        );
        correctAnswer.forEach((line) => {
          doc.text(line, 20, cursorY);
          cursorY += 7;
        });

        doc.setFont("helvetica", "italic");
        doc.setTextColor(...textColor);
        const explanation = doc.splitTextToSize(
          `${question.explanation}`,
          170
        );
        explanation.forEach((line) => {
          doc.text(line, 20, cursorY);
          cursorY += 7;
        });

        cursorY += 10;
      });
    }

    // Flashcards Section
    if (sessionData.flashcards && sessionData.flashcards[0]?.cards?.length > 0) {
      doc.addPage();
      doc.setFillColor(...brandColor);
      doc.rect(0, 0, 210, 15, "F");
      cursorY = 30;
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...brandColor);
      doc.text("Flashcards", 15, cursorY);
      doc.setLineWidth(0.5);
      doc.line(15, cursorY + 1, 195, cursorY + 1);
      cursorY += 15;

      sessionData.flashcards[0].cards.forEach((card, index) => {
        if (cursorY > pageHeight) {
          doc.addPage();
          doc.setFillColor(...brandColor);
          doc.rect(0, 0, 210, 15, "F");
          cursorY = 30;
        }

        // Card styling
        doc.setFillColor(...accentColor);
        doc.roundedRect(15, cursorY - 5, 180, 30, 3, 3, "F");
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...brandColor);
        const wrappedQuestion = doc.splitTextToSize(
          `Card ${index + 1} - Front: ${card.front.content}`,
          170
        );
        wrappedQuestion.forEach((line) => {
          doc.text(line, 20, cursorY);
          cursorY += 7;
        });

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        const wrappedAnswer = doc.splitTextToSize(
          `Back: ${card.back.content}`,
          170
        );
        wrappedAnswer.forEach((line) => {
          doc.text(line, 20, cursorY);
          cursorY += 7;
        });

        cursorY += 10;
      });
    }

    // Save the PDF
    doc.save(`${session_name}_notes.pdf`);
    toast.success("PDF exported successfully!");
  } catch (error) {
    toast.error("Error exporting to PDF: " + error.message);
  }
};
