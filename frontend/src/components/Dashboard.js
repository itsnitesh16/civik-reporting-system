import React, { useState, useEffect } from "react";
import axios from "axios";
import './Dashboard.css';

const Dashboard = () => {
  const [reports, setReports] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image,setimage]= useState("");
  const[location,setlocation]=useState("");
  const [departmentId, setSelectedDept] = useState("");
    const[department,setdepartment]=useState([]);
    const [uploading, setUploading] = useState(false);

  
  const API = "http://localhost:5000";
const token = localStorage.getItem("token");

useEffect(() => {
  axios.get(`${API}/reports`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  })
  .then(res => {
   console.log(res);
    setReports(res.data);
  }
)

  .catch(err => console.error(err));
}, []);

const getalldepartments =async () => {
  try{
  const response = await axios.get(
    `${API}/departments`,{
      headers: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
    }
  );
  console.log(response);
  setdepartment(response.data);
}
catch(error){
  console.log(error);
}}

useEffect(()=>{
getalldepartments();
},[]);


const handleinput = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setUploading(true);

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "civik-reporting-system");
  data.append("cloud_name", "dbihbtvyz");

  const res = await fetch("https://api.cloudinary.com/v1_1/dbihbtvyz/image/upload", {
    method: "POST",
    body: data
  });

  const uploaded = await res.json();
  setimage(uploaded.secure_url); // ✅ Save URL properly
  setUploading(false); // Upload finished
};



  const handleSubmit = async (e) => {
    e.preventDefault();
      if(uploading) {
    alert("Image is still uploading, wait a second!");
    return;
  }
      if (!image) {
    alert("Please upload an image before submitting!");
    return;
  }
    try {
      const res = await axios.post(
        `${API}/reportissue`,
        { title, description,image,location,departmentId},
{
      headers: {
      Authorization: `Bearer ${token}`
    },
        withCredentials: true 
    }
  );

      setReports(prev => [res.data.report, ...prev]); 
      setTitle("");
      setDescription("");
      setlocation("");
      setSelectedDept("");

    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report");
    }
  };

  const total = reports.length;
  const resolved = reports.filter(r => r.status === "Resolved").length;
  const pending = total - resolved;

  return (
    <div className="dashboard-container">
      <h1>Citizen Dashboard</h1>

      <div className="summary">
        <div className="summary-card">
          <h3>Total Reports</h3>
          <p>{total}</p>
        </div>
        <div className="summary-card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
        <div className="summary-card">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>

      <div className="report-form">
        <h2>Submit a Report</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Report Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
            <input
            placeholder="location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            required
          />
          <select
  value={departmentId} onChange={(e) => setSelectedDept(e.target.value)}>
  <option value="">-- Choose Department --</option>
  {department.map((dept) => (
    <option key={dept._id} value={dept._id}>
      {dept.name}
    </option>
  ))}
</select>


            <input type="file" id="fileUpload" name="file" onChange={handleinput} />

          
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="reports-list">
        <h2>My Reports</h2>
        {reports.length === 0 ? (
          <p>No reports submitted yet.</p>
        ) : (
          <ul>
            {reports.map((report) => (
              <li key={report._id} className={`report-item`}>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <span>Status: {report.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
