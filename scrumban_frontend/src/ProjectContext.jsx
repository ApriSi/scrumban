import React, { useState } from "react";
  
export const ProjectContext = React.createContext();
export const ProjectContextProvider = ({ children }) => {
    const [projectId, setProjectId] = useState();
  
    return (
        <ProjectContext.Provider value={{ projectId, setProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
};