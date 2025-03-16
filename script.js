// Function to dynamically add teacher input fields
function addTeacherInputs() {
    const numTeachers = document.getElementById("numTeachers").value;
    const teacherInputs = document.getElementById("teacherInputs");
    teacherInputs.innerHTML = "";

    for (let i = 0; i < numTeachers; i++) {
        teacherInputs.innerHTML += `
            <div class="input-container">
                <label>Teacher ${i + 1} Name: </label>
                <input type="text" id="teacherName${i}" required>
                <label>Subject: </label>
                <input type="text" id="teacherSubject${i}" required>
            </div>
        `;
    }
}

// Event listener to update teacher input fields dynamically
document.getElementById("numTeachers").addEventListener("input", addTeacherInputs);

// Function to generate and display the timetable in the same document
function generateTimetable() {
    const numTeachers = parseInt(document.getElementById("numTeachers").value);
    const numClasses = parseInt(document.getElementById("numClasses").value);
    const numPeriods = parseInt(document.getElementById("numPeriods").value);

    if (isNaN(numTeachers) || isNaN(numClasses) || isNaN(numPeriods)) {
        alert("Please enter all required fields.");
        return;
    }

    const teachers = [];
    for (let i = 0; i < numTeachers; i++) {
        const name = document.getElementById(`teacherName${i}`).value;
        const subject = document.getElementById(`teacherSubject${i}`).value;
        if (!name || !subject) {
            alert("Please enter the name and subject for each teacher.");
            return;
        }
        teachers.push({ name, subject });
    }

    let timetableHTML = `<table><tr><th>Class / Period</th>`;
    for (let p = 1; p <= numPeriods; p++) {
        timetableHTML += `<th>Period ${p}</th>`;
    }
    timetableHTML += `</tr>`;

    for (let c = 0; c < numClasses; c++) {
        timetableHTML += `<tr><td>Class ${c + 1}</td>`;
        for (let p = 0; p < numPeriods; p++) {
            const teacherIndex = (c + p) % numTeachers;
            timetableHTML += `<td>${teachers[teacherIndex].subject} (${teachers[teacherIndex].name})</td>`;
        }
        timetableHTML += `</tr>`;
    }
    timetableHTML += `</table>`;

    document.getElementById("timetableContainer").innerHTML = timetableHTML;
    document.getElementById("timetableSection").style.display = "block";
}

// Function to download the generated timetable as an HTML file
function downloadTimetable() {
    const timetableHTML = document.getElementById("timetableContainer").innerHTML;
    const style = `
        <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #333; padding: 10px; text-align: center; }
            th { background-color: #4CAF50; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
    `;

    const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Generated Timetable</title>
            ${style}
        </head>
        <body>
            <h2>Generated Timetable</h2>
            <div>${timetableHTML}</div>
        </body>
        </html>
    `;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "timetable.html";
    link.click();
}
