import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Verify() {
  const [isVerified, setIsVerified] = useState(null);
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(searchParams.get("token"));

    if (isVerified == null) {
      return;
    }
    console.log(projects);
    if (projects.length > 0) {
      return navigate(`/form`, { state: { projects } });
    }
    return navigate(`/error`);
  }, [isVerified, navigate, projects, searchParams]);

  useEffect(() => {
    const requestData = {
      token,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(requestData),
    };

    async function verifyToken() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_NOT_SECRET_CODE}/verify`,
          options
        );
        const data = await response.json();
        const verified = data.verified;
        setIsVerified(verified);
        if (verified) {
          setProjects(data.projects);
        }
      } catch {
        setIsVerified(false);
      }
    }

    if (token) {
      verifyToken();
    }
  }, [token]);

  return <p>"Loading..."</p>;
}

export default Verify;
