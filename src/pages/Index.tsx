
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page
    navigate("/landing");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Carregando...</div>
    </div>
  );
};

export default Index;
