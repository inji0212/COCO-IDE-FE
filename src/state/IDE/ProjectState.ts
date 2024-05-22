/* eslint-disable prefer-const */
import axios from 'axios';
import { create } from 'zustand';
import useAuthStore from '../AuthStore';

const API_BASE_URL = 'http://43.201.76.117:8080/api';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

interface Project {
  id: string;
  name: string;
  language: string;
  folders: Folder[];
  files: File[];
}

interface Folder {
  id: string;
  name: string;
  files: File[];
  type: string;
  parentId: string;
}

interface File {
  id: string;
  name: string;
  type: string;
  code: string;
  parentId: string;
}
interface ProjectData {
  projectId: string;
  projectName: string;
}
interface FolderData {
  folderId: string;
  folderName: string;
  parentId: string | null;
}

interface FileData {
  fileId: string;
  fileName: string;
  parentId: string | null;
  type: string;
  code: string;
}

interface ProjectStore {
  projects: Project[];
  selectedProjectId: string | null;
  selectedFolderId: string | null;
  selectedFileId: string | null;
  selectedFileName: string | null;
  selectedFileContent: string | null;
  addProject: (project: Project) => void;
  loadProjects: () => Promise<void>;
  selectProject: (projectId: string) => Promise<void>;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, newData: Partial<Project>) => void;
  addFolder: (projectId: string, folder: Folder) => void;
  removeFolder: (projectId: string, folderId: string) => void;
  updateFolder: (projectId: string, folderId: string, newData: Partial<Folder>) => void;
  addFile: (projectId: string, folderId: string, file: File) => void;
  removeFile: (projectId: string, folderId: string, fileId: string) => void;
  updateFile: (projectId: string, folderId: string, fileId: string, newData: Partial<File>) => void;
  selectFile: (fileId: string | null, fileName: string | null, fileContent: string | null) => void;
  deselectFile: () => void;
  fetchFileContent: (projectId: string, folderId: string, fileId: string) => void;
  setFileContent: (content: string) => void;
}

const useProjectStore = create<ProjectStore>(set => ({
  projects: [],
  selectedProjectId: null,
  selectedFolderId: null,
  selectedFileId: null,
  selectedFileName: null,
  selectedFileContent: null,
  addProject: project =>
    set(state => {
      const newState = { projects: [...state.projects, project] };
      console.log('Updated projects list:', newState.projects);
      return newState;
    }),

  removeProject: async projectId => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${projectId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      set(state => ({ projects: state.projects.filter(p => p.id !== projectId) }));
      console.log('프로젝트가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('프로젝트 삭제에 실패했습니다.', error);
    }
  },
  updateProject: (projectId, newData) =>
    set(state => ({
      projects: state.projects.map(p => (p.id === projectId ? { ...p, ...newData } : p)),
    })),
  addFolder: (projectId, folder) =>
    set(state => ({
      projects: state.projects.map(p => (p.id === projectId ? { ...p, folders: [...p.folders, folder] } : p)),
    })),
  removeFolder: (projectId, folderId) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId ? { ...p, folders: p.folders.filter(f => f.id !== folderId) } : p,
      ),
    })),

  updateFolder: (projectId, folderId, newName) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f => (f.id === folderId ? { ...f, ...newName } : f)),
            }
          : p,
      ),
    })),
  loadProjects: async () => {
    const memberId = useAuthStore.getState().memberId;
    console.log(memberId);
    try {
      const response = await axios.get<ProjectData[]>(`${API_BASE_URL}/projects?memberId=${memberId}`, {
        headers: { Authorization: `Basic ${Token}`, withCredentials: true },
      });
      console.log('프로젝트 리스트 요청 성공', response.data);
      const projects = response.data.map(
        (project: ProjectData): Project => ({
          id: project.projectId,
          name: project.projectName,
          language: '',
          folders: [],
          files: [],
        }),
      );
      set({ projects });
    } catch (error) {
      console.error('프로젝트 리스트 요청 실패:', error);
    }
  },
  selectProject: async (projectId: string) => {
    try {
      // 프로젝트 정보 요청
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      const { folders, files } = response.data;

      // 폴더와 파일 정보를 스토어에 추가
      const projectFolders: Folder[] = folders.map((folder: FolderData) => ({
        id: folder.folderId,
        name: folder.folderName,
        files: [],
        parentId: folder.parentId || null,
      }));
      const projectFiles: File[] = files.map((file: FileData) => ({
        id: file.fileId,
        name: file.fileName,
        type: file.type,
        code: file.code,
        parentId: file.parentId || null,
      }));

      // 프로젝트의 폴더와 파일 목록을 업데이트
      set(state => ({
        selectedProjectId: projectId,
        selectedFolderId: projectFolders.length > 0 ? projectFolders[0].id : null,
        projects: state.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              folders: projectFolders,
              files: projectFiles,
            };
          }
          return project;
        }),
      }));
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  },

  addFile: (projectId, folderId, file) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f => (f.id === folderId ? { ...f, files: [...f.files, file] } : f)),
            }
          : p,
      ),
    })),
  removeFile: (projectId, folderId, fileId) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f.id === folderId ? { ...f, files: f.files.filter(fi => fi.id !== fileId) } : f,
              ),
            }
          : p,
      ),
    })),
  updateFile: (projectId, folderId, fileId, newName) =>
    set(state => ({
      projects: state.projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              folders: p.folders.map(f =>
                f.id === folderId
                  ? { ...f, files: f.files.map(fi => (fi.id === fileId ? { ...fi, ...newName } : fi)) }
                  : f,
              ),
            }
          : p,
      ),
    })),
  selectFile: (fileId, fileName, fileContent) =>
    set({
      selectedFileId: fileId,
      selectedFileName: fileName,
      selectedFileContent: fileContent,
    }),
  deselectFile: () =>
    set({
      selectedFileId: null,
      selectedFileName: null,
      selectedFileContent: null,
    }),
  fetchFileContent: async (projectId: string, folderId: string, fileId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}`, {
        headers: { Authorization: `Basic ${Token}` },
      });
      console.log('Response data:', response.data);
      const fileCode = response.data;
      set(state => {
        const file = state.projects.find(project => project.id === projectId)?.files.find(file => file.id === fileId);

        if (file) {
          return {
            selectedFileId: fileId,
            selectedFileName: file.name,
            selectedFileContent: fileCode,
          };
        }

        return {};
      });
      console.log(fileCode);
    } catch (error) {
      console.error('Error fetching file content:', error);
      set({ selectedFileContent: 'Failed to fetch content' });
    }
  },
  setFileContent: (content: string) => set({ selectedFileContent: content }),
}));

export default useProjectStore;
export type { ProjectStore, Project, Folder, File };
