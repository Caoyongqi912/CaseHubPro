import { queryProject } from '@/api/project';

const getProjectId = () => {
  const projectId = localStorage.getItem('projectID');
  if (projectId === undefined || projectId === null) {
    return undefined;
  }
  return parseInt(projectId, 10);
};

export default {
  namespace: 'project',
  state: {
    projects: [],
    projectsMap: {},
    project_id: getProjectId(),
  },
};
