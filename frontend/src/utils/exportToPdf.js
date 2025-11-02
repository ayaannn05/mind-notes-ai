import jsPDF from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

export const exportSessionInPdf = (sessionData, session_name) => {
  const app_name = "MIND NOTES AI";

  try {
    const doc = new jsPDF("p", "mm", "a4");
    const pageHeight = 275; // Safe area for content
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;

    // Enhanced color palette
    const colors = {
      primary: [245, 124, 5],
      primaryLight: [255, 150, 66],
      accent: [255, 236, 217],
      text: [51, 51, 51],
      textLight: [102, 102, 102],
      white: [255, 255, 255],
      success: [46, 125, 50],
      successBg: [232, 245, 233],
      cardBg: [250, 250, 250],
      border: [224, 224, 224],
      codeBg: [40, 44, 52],
      codeText: [171, 178, 191],
      codeKeyword: [198, 120, 221],
      codeString: [152, 195, 121],
      codeFunction: [97, 175, 239],
      codeNumber: [209, 154, 102],
      answerBg: [232, 245, 233],
    };

    let pageNumber = 0;

    // Add page header
    const addPageHeader = () => {
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 12, "F");

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.white);
      doc.text(app_name, margin, 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Page ${pageNumber}`, pageWidth - margin, 8, { align: "right" });
    };

    // Clean text helper
    const cleanText = (text) => {
      if (!text) return "";
      return text
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/^#+\s/, "")
        .replace(/^>\s/, "")
        .replace(/`/g, "")
        .trim();
    };

    // Syntax highlighting for code
    const renderCodeBlock = (code, startY) => {
      let cursorY = startY;

      // Code block background
      const lines = code.split("\n");
      const blockHeight = Math.min(lines.length * 5 + 10, 100);

      doc.setFillColor(...colors.codeBg);
      doc.roundedRect(
        margin,
        cursorY - 5,
        contentWidth,
        blockHeight,
        3,
        3,
        "F"
      );

      // Render code with syntax highlighting
      doc.setFont("courier", "normal");
      doc.setFontSize(9);

      lines.slice(0, 18).forEach((line, index) => {
        // Limit lines to prevent overflow
        if (cursorY > pageHeight) {
          doc.addPage();
          pageNumber++;
          addPageHeader();
          cursorY = 25;
          doc.setFillColor(...colors.codeBg);
          doc.roundedRect(margin, cursorY - 5, contentWidth, 50, 3, 3, "F");
        }

        // Simple syntax highlighting
        if (
          line.includes("function") ||
          line.includes("const") ||
          line.includes("return")
        ) {
          doc.setTextColor(...colors.codeKeyword);
        } else if (line.includes('"') || line.includes("'")) {
          doc.setTextColor(...colors.codeString);
        } else if (line.match(/\d+/)) {
          doc.setTextColor(...colors.codeNumber);
        } else {
          doc.setTextColor(...colors.codeText);
        }

        const trimmedLine = line.substring(0, 90); // Prevent overflow
        doc.text(trimmedLine, margin + 3, cursorY);
        cursorY += 5;
      });

      if (lines.length > 18) {
        doc.setTextColor(...colors.textLight);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.text("... (code truncated for space)", margin + 3, cursorY);
        cursorY += 5;
      }

      return cursorY + 10;
    };

    // Enhanced markdown rendering
    const renderMarkdownToPdf = (doc, text, startY) => {
      const lines = text.split("\n");
      let cursorY = startY;
      let inCodeBlock = false;
      let codeContent = "";

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Handle code blocks
        if (line.trim().startsWith("```")) {
          if (inCodeBlock) {
            cursorY = renderCodeBlock(codeContent, cursorY);
            codeContent = "";
            inCodeBlock = false;
          } else {
            inCodeBlock = true;
          }
          continue;
        }

        if (inCodeBlock) {
          codeContent += line + "\n";
          continue;
        }

        // Check page break
        if (cursorY > pageHeight) {
          doc.addPage();
          pageNumber++;
          addPageHeader();
          cursorY = 25;
        }

        // Skip empty lines
        if (!line.trim()) {
          cursorY += 3;
          continue;
        }

        // Tables
        if (line.includes("|")) {
          if (line.startsWith("|-")) continue;

          const cells = line.split("|").filter((cell) => cell.trim());
          const isHeader = i === 0 || lines[i - 1].includes("|-");

          if (isHeader) {
            doc.autoTable({
              startY: cursorY,
              head: [cells.map((cell) => cleanText(cell))],
              theme: "grid",
              styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: colors.border,
                lineWidth: 0.1,
                overflow: "linebreak",
                cellWidth: "wrap",
              },
              headStyles: {
                fillColor: colors.primary,
                textColor: colors.white,
                fontStyle: "bold",
                fontSize: 9,
              },
              columnStyles: {
                0: { cellWidth: "auto" },
              },
              margin: { left: margin, right: margin },
              tableWidth: "auto",
            });
          } else {
            doc.autoTable({
              startY: cursorY,
              body: [cells.map((cell) => cleanText(cell))],
              theme: "grid",
              styles: {
                fontSize: 9,
                cellPadding: 3,
                lineColor: colors.border,
                lineWidth: 0.1,
                overflow: "linebreak",
              },
              alternateRowStyles: {
                fillColor: colors.accent,
              },
              margin: { left: margin, right: margin },
            });
          }

          cursorY = doc.lastAutoTable.finalY + 5;
          continue;
        }

        // Main heading (##)
        if (line.startsWith("## ")) {
          cursorY += 5;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.setTextColor(...colors.primary);
          const headingText = cleanText(line);
          doc.text(headingText, margin, cursorY, { maxWidth: contentWidth });

          doc.setDrawColor(...colors.primary);
          doc.setLineWidth(0.5);
          doc.line(margin, cursorY + 2, pageWidth - margin, cursorY + 2);
          cursorY += 12;
          continue;
        }

        // Subheading (###)
        if (line.startsWith("### ")) {
          cursorY += 4;
          doc.setFont("helvetica", "bold");
          doc.setFontSize(13);
          doc.setTextColor(...colors.text);
          const subheadingText = cleanText(line);
          doc.text(subheadingText, margin, cursorY, { maxWidth: contentWidth });
          cursorY += 10;
          continue;
        }

        // Bold text
        if (line.includes("**")) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.setTextColor(...colors.text);
          const boldText = cleanText(line);
          const wrappedLines = doc.splitTextToSize(boldText, contentWidth);

          wrappedLines.forEach((wrappedLine) => {
            if (cursorY > pageHeight) {
              doc.addPage();
              pageNumber++;
              addPageHeader();
              cursorY = 25;
            }
            doc.text(wrappedLine, margin, cursorY);
            cursorY += 6.5;
          });
          cursorY += 2;
          continue;
        }

        // Bullet points
        if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(...colors.text);

          const bulletText = cleanText(line);
          const wrappedLines = doc.splitTextToSize(
            `-  ${bulletText}`,
            contentWidth - 10
          );

          wrappedLines.forEach((wrappedLine, index) => {
            if (cursorY > pageHeight) {
              doc.addPage();
              pageNumber++;
              addPageHeader();
              cursorY = 25;
            }
            doc.text(
              wrappedLine,
              index === 0 ? margin + 5 : margin + 8,
              cursorY
            );
            cursorY += 6;
          });
          cursorY += 1;
          continue;
        }

        // Regular paragraph
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...colors.text);
        const wrappedLines = doc.splitTextToSize(cleanText(line), contentWidth);

        wrappedLines.forEach((wrappedLine) => {
          if (cursorY > pageHeight) {
            doc.addPage();
            pageNumber++;
            addPageHeader();
            cursorY = 25;
          }
          doc.text(wrappedLine, margin, cursorY);
          cursorY += 6;
        });
        cursorY += 2;
      }

      return cursorY;
    };

    // ========== TITLE PAGE ==========
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 297, "F");

    doc.setFillColor(...colors.primaryLight);
    doc.circle(180, 30, 40, "F");
    doc.setFillColor(...colors.primary);
    doc.circle(30, 260, 35, "F");

    doc.setTextColor(...colors.white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(32);
    doc.text(app_name, pageWidth / 2, 60, { align: "center" });

    doc.setDrawColor(...colors.white);
    doc.setLineWidth(0.5);
    doc.line(40, 70, 170, 70);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Study Notes", pageWidth / 2, 85, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    const wrappedTitle = doc.splitTextToSize(session_name, 160);
    const titleY = 140;
    wrappedTitle.forEach((line, index) => {
      doc.text(line, pageWidth / 2, titleY + index * 10, { align: "center" });
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(formattedDate, pageWidth / 2, 220, { align: "center" });

    doc.addPage();
    pageNumber = 1;

    // ========== DETAILED NOTES ==========
    if (sessionData.notes) {
      addPageHeader();
      let cursorY = 25;

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...colors.primary);
      doc.text("Detailed Notes", margin, cursorY);
      cursorY += 15;

      cursorY = renderMarkdownToPdf(doc, sessionData.notes, cursorY);
    }

    // Save PDF
    doc.save(`${session_name}_notes.pdf`);
    toast.success("PDF exported successfully! 📄");
  } catch (error) {
    console.error("PDF Export Error:", error);
    toast.error("Failed to export PDF. Please try again.");
  }
};            