import { jsPDF } from 'jspdf';
import { Result } from '../pages/Result';

export const calculatePercentage = (obtained: number, total: number) => {
    return ((obtained / total) * 100).toFixed(2);
  };

export const downloadPDF = ({result}: {result: Result}) => {
    if (!result) return;

    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      // Header
      doc.setFontSize(24);
      doc.setTextColor(0, 48, 87);
      doc.text("STUDENT RESULT CARD", 105, 15, { align: "center" });

      // Institution details
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Academic Year: ${result.year}`, 20, 25);
      doc.text(`Examination: ${result.month} ${result.year}`, 20, 32);

      // Student details
      doc.setDrawColor(0, 48, 87);
      doc.rect(15, 38, 180, 30);
      doc.setFontSize(11);
      doc.setTextColor(0);
      doc.text([
        `Student Name: ${result.student.name}`,
        `Roll Number: ${result.student.rollNumber}`,
        `Total Marks: ${result.totalMarks}`,
        `Marks Obtained: ${result.obtainedMarks}`,
        `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
        `Final Result: ${result.status}`
      ], 20, 45);

      // Try to use autoTable if available
      try {
        // Subject-wise results table
        const headers = [["Code", "Subject", "Total", "Obtained", "Grade", "Status"]];
        const data = result.details.map(sub => [
          sub.code,
          sub.name,
          sub.totalMarks.toString(),
          sub.obtainedMarks.toString(),
          sub.grade,
          sub.status
        ]);

        // AutoTable approach
        doc.autoTable({
          startY: 72,
          head: headers,
          body: data,
          theme: 'striped',
          headStyles: { fillColor: [0, 48, 87], textColor: 255, fontSize: 10 },
          styles: { fontSize: 9, cellPadding: 2 },
          columnStyles: { 1: { cellWidth: 60 } },
          margin: { left: 15, right: 15 }
        });

        // Get the final Y position from autoTable
        let finalY = (doc as any).lastAutoTable.finalY + 5;
        
        // Summary section after the table
        doc.setFontSize(11);
        doc.setDrawColor(0, 48, 87);
        doc.rect(15, finalY, 180, 25);
        doc.text([
          "Final Summary",
          `Total Marks: ${result.totalMarks}`,
          `Marks Obtained: ${result.obtainedMarks}`,
          `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
          `Overall Grade: ${result.status}`
        ], 20, finalY + 7);
      } catch (autoTableError) {
        console.log("AutoTable failed, using manual table approach");
        
        // Manual table approach - fallback if autoTable is not available
        // Draw table header
        let yPosition = 72;
        doc.setFillColor(0, 48, 87);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        
        // Header cells
        const columns = [
          { x: 15, width: 25, text: "Code" },
          { x: 40, width: 60, text: "Subject" },
          { x: 100, width: 25, text: "Total" },
          { x: 125, width: 25, text: "Obtained" },
          { x: 150, width: 20, text: "Grade" },
          { x: 170, width: 25, text: "Status" }
        ];
        
        // Draw header cells
        doc.rect(15, yPosition, 180, 8, 'F');
        columns.forEach(col => {
          doc.text(col.text, col.x + 2, yPosition + 5.5);
        });
        yPosition += 8;
        
        // Draw data rows
        doc.setTextColor(0);
        doc.setFontSize(9);
        
        result.details.forEach((subject, index) => {
          const rowHeight = 7;
          // Alternate row colors for better readability
          if (index % 2 === 0) {
            doc.setFillColor(240, 240, 240);
            doc.rect(15, yPosition, 180, rowHeight, 'F');
          }
          
          // Draw cell content
          doc.text(subject.code, columns[0].x + 2, yPosition + 5);
          doc.text(subject.name, columns[1].x + 2, yPosition + 5);
          doc.text(subject.totalMarks.toString(), columns[2].x + 2, yPosition + 5);
          doc.text(subject.obtainedMarks.toString(), columns[3].x + 2, yPosition + 5);
          doc.text(subject.grade, columns[4].x + 2, yPosition + 5);
          doc.text(subject.status, columns[5].x + 2, yPosition + 5);
          
          // Draw cell borders
          doc.setDrawColor(200, 200, 200);
          doc.rect(15, yPosition, 180, rowHeight);
          columns.forEach((col, i) => {
            if (i > 0) {
              doc.line(col.x, yPosition, col.x, yPosition + rowHeight);
            }
          });
          
          yPosition += rowHeight;
        });
        
        // Summary section
        yPosition += 5;
        doc.setFontSize(11);
        doc.setDrawColor(0, 48, 87);
        doc.rect(15, yPosition, 180, 25);
        doc.text([
          "Final Summary",
          `Total Marks: ${result.totalMarks}`,
          `Marks Obtained: ${result.obtainedMarks}`,
          `Percentage: ${calculatePercentage(result.obtainedMarks, result.totalMarks)}%`,
          `Overall Grade: ${result.status}`
        ], 20, yPosition + 7);
      }

      // Footer
      doc.setFontSize(8);
      doc.text("This is a computer-generated document", 105, 290, { align: "center" });

      // Save PDF
      doc.save(`Result_${result.student.rollNumber}_${result.month}${result.year}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again later.");
    }
  };