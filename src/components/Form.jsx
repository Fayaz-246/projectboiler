import { useState } from "react";
import PropTypes from "prop-types";
import { pdf } from "@react-pdf/renderer";

import { teachers } from "../data/teachers";
import ProjectPDF from "./PDF";

function Form() {
  // Practical Records must be marked as "<subject> (Practical)"
  const subjectsList = [
    "English Language",
    "Literature in English",
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Computer Science (Practical)",
  ];

  const getCurrentAcademicYear = () => {
    const currentDate = new Date();
    if (currentDate.getMonth() <= 2) {
      return currentDate.getFullYear();
    } else {
      return currentDate.getFullYear() + 1;
    }
  };

  const [student, setStudent] = useState("");
  const [grade, setGrade] = useState("XI");
  const [project, setProject] = useState("");
  const [subject, setSubject] = useState(subjectsList[0]);
  const [teacher, setTeacher] = useState("");
  const [year, setYear] = useState(`${getCurrentAcademicYear()}`);

  const [projectNameEnabled, setProjectNameEnabled] = useState(true);

  const [formFilled, setFormFilled] = useState(false);
  const checkFormFilled = () => {
    const inputFields = document.querySelectorAll("[required]");
    let isFormFilled = true;
    inputFields.forEach((inputField) => {
      if (inputField.value === "") {
        isFormFilled = false;
      }
    });
    return isFormFilled;
  };

  return (
    <form>
      <h2>Project Details</h2>
      <div className="fields">
        <div className="field">
          <label>Student</label>
          <input
            className="input"
            id="student"
            type="text"
            value={student}
            placeholder="Your name"
            onChange={(event) => {
              setStudent(event.target.value);
              setFormFilled(checkFormFilled());
            }}
            required
          />
        </div>
        <div className="field">
          <label>Class</label>
          <select
            id="grade"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            required
          >
            <option value="XII">XII</option>
            <option value="XI">XI</option>
          </select>
        </div>
        <div className="field">
          <label>Subject</label>
          <select
            id="subject"
            value={subject}
            onChange={(event) => {
              setSubject(event.target.value);
              setProjectNameEnabled(
                !event.target.value.includes(" (Practical)"),
              );
              setFormFilled(checkFormFilled());
            }}
            required
          >
            {subjectsList.map((subjectName) => (
              <option value={subjectName} key={subjectName}>
                {subjectName}
              </option>
            ))}
          </select>
        </div>
        {projectNameEnabled && (
          <div className="field">
            <label>Project</label>
            <input
              className="input"
              id="project"
              type="text"
              value={project}
              placeholder="Your project's name"
              onChange={(event) => {
                setProject(event.target.value);
                setFormFilled(checkFormFilled());
              }}
              required
            />
          </div>
        )}
        <div className="field">
          <label>Teacher</label>
          <select
            id="teacher"
            value={teacher}
            onChange={(event) => {
              setTeacher(event.target.value);
              setFormFilled(checkFormFilled());
            }}
            required
          >
            <option value="" disabled>
              Select a teacher
            </option>
            {teachers.map((teacherInfo) => (
              <option
                value={teacherInfo.name}
                key={`${teacherInfo.name}-${teacherInfo.subject}`}
              >
                {teacherInfo.name} — {teacherInfo.subject}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Year</label>
          <input
            className="input"
            id="year"
            type="number"
            value={year}
            onChange={(event) => {
              setYear(event.target.value);
              setFormFilled(checkFormFilled());
            }}
            required
          />
        </div>
      </div>
      {formFilled && (
        <>
          <DownloadButton
            projectInfo={{
              student,
              project,
              grade,
              subject,
              teacher,
              teacherSubject: teachers.find((t) => t.name === teacher)?.subject,
              year,
            }}
          />
          <p className="verify">
            ⓘ Please verify the details in the PDF carefully
          </p>
        </>
      )}
    </form>
  );
}

function DownloadButton({ projectInfo }) {
  return (
    <button
      className="download"
      type="button"
      onClick={async () => {
        const blob = await pdf(
          <ProjectPDF
            studentName={projectInfo.student}
            grade={projectInfo.grade}
            projectName={projectInfo.project}
            subject={projectInfo.subject}
            teacher={projectInfo.teacher}
            teacherSubject={projectInfo.teacherSubject}
            year={projectInfo.year}
          />,
        ).toBlob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${projectInfo.subject} Project Front Pages`;
        link.style = {
          display: "none",
        };
        document.body.appendChild(link);
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          }),
        );
        document.body.removeChild(link);
      }}
    >
      <img src="/pdf.svg" alt="Download PDF" />
      <p>Download PDF</p>
    </button>
  );
}

DownloadButton.propTypes = {
  projectInfo: PropTypes.shape({
    student: PropTypes.string.isRequired,
    project: PropTypes.string,
    grade: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
    teacherSubject: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default Form;
