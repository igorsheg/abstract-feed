import React, { FC } from "react";
import { Project } from "abstract-sdk";

interface ProjectProps {
    project: Project;
}

const SingleProject: FC<ProjectProps> = ({ project }) => {
    return <p>{project.name}</p>;
};

export default SingleProject;
