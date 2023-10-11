import React, { useState } from 'react';

const TaApply = () => {
  // Define state variables for input fields
  const [courseId, setCourseId] = useState('');
  const [courseName, setCourseName] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  // const [coursesTaken, setCoursesTaken] = useState([]);
  const [coursesTaken, setCoursesTaken] = useState<string[]>([]);
  const [gpaToDate, setGpaToDate] = useState('');
  const [requiredCourses, setRequiredCourses] = useState<string[]>([]);
  const [requiredSkills, setRequiredSkills] = useState<string[]>([]);
  const [resumeFile, setResumeFile] = useState<File | null>(null); // Allow null or File object
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can perform further actions here, such as sending data to a server

    // Display success message
    setSuccessMessage('Application submitted successfully!');
  };

  return (
    <div>
      <h1>TA Job Application</h1>
      {successMessage && <div>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Course ID:
          <input type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </label>

        <p></p>
        <label>
          Course Name:
          <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </label>

        <p></p>
        <label>
          Student Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <p></p>
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <p></p>

        <label>
          Hours could work per week:
          <input type="text" value={hoursPerWeek}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*\.?\d*$/.test(input)) {
                setHoursPerWeek(input);
              } else {
                setHoursPerWeek('');
              }
            }}
          />
        </label>

        <p></p>
        <label>
          Courses taken:
          <input type="text" value={coursesTaken.join(',')} onChange={(e) => setCoursesTaken(e.target.value.split(','))} />
        </label>
        
        <p></p>
        <label>
          GPA to date:
          <input type="text" value={gpaToDate}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d*\.?\d*$/.test(input)) {
                setGpaToDate(input);
              } else {
                setGpaToDate('');
              }
            }}
          />
        </label>

        <p></p>
        <label>
          Required courses taken:
          <input type="text" value={requiredCourses.join(',')} onChange={(e) => setRequiredCourses(e.target.value.split(','))} />
        </label>

        <p></p>
        <label>
          Required skills:
          <input type="text" value={requiredSkills.join(',')} onChange={(e) => setRequiredSkills(e.target.value.split(','))} />
        </label>


        
      
        <p><input type="file" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
          }else{
            setResumeFile(null); // Set to null if no file is selected
          }
        }}
        /></p>

        <p></p>
        <button type="submit">Submit Resume</button>
      </form>
    </div>
  );
};

export default TaApply;
