import axios from 'axios';

const API_BASE_URL = 'http://43.201.76.117:8080/api';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

export const saveCode = async (projectId, folderId, fileId, sourceCode) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/content`,
      {
        code: sourceCode,
      },
      { headers: { Authorization: `Basic ${Token}` } },
    );
    return response.data;
  } catch (error) {
    console.error('Failed to save code:', error);
    throw error;
  }
};
export const fetchRunCode = async (projectId, folderId, fileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/run`, {
      headers: {
        Authorization: `Basic ${Token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('Success');
    return response.data;
  } catch (error) {
    console.error('Failed to run code:', error);
    throw error;
  }
};
export const createProject = async newProject => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects`,

      newProject,

      { headers: { Authorization: `Basic ${Token}` }, withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    alert('Failed to create project');
    throw error;
  }
};

export const createFolder = async (projectId, folderName, parentId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects/${projectId}/folders`,
      {
        name: folderName,
        parentId: parentId,
      },
      { headers: { Authorization: `Basic ${Token}` }, withCredentials: true },
    );
    console.log('새로운 폴더가 생성되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('폴더 생성 중 오류 발생:', error);
    throw error;
  }
};

export const createFile = async (projectId, folderId, fileName, fileContent) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files`,
      {
        name: fileName,
        content: fileContent,
        parentId: folderId,
      },
      { headers: { Authorization: `Basic ${Token}` }, withCredentials: true },
    );
    console.log('새로운 파일이 생성되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('파일 생성 중 오류 발생:', error);
    throw error;
  }
};
export const deleteFolder = async (projectId, folderId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}`, {
      headers: { Authorization: `Basic ${Token}`, withCredentials: true },
    });
    console.log('폴더가 삭제되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('폴더 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const deleteFile = async (projectId, folderId, fileId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}`, {
      headers: { Authorization: `Basic ${Token}`, withCredentials: true },
    });
    console.log('파일이 삭제되었습니다:', response.data);
    return response.data;
  } catch (error) {
    console.error('파일 삭제 중 오류 발생:', error);
    throw error;
  }
};

export const updateFolderName = async (projectId, folderId, newName) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/name`,
      { newName: newName },
      { headers: { Authorization: `Basic ${Token}`, withCredentials: true } },
    );
    console.log('폴더명 수정 완료', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update folder name:', error);
  }
};

export const updateFileName = async (projectId, folderId, fileId, newName) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/name`,
      { newName: newName },
      { headers: { Authorization: `Basic ${Token}`, withCredentials: true } },
    );
    console.log('파일명 수정 완료', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update file name:', error);
  }
};

export const moveFile = async (projectId, folderId, fileId, targetFolderId) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/projects/${projectId}/folders/${folderId}/files/${fileId}/path`,
      {
        folderId: targetFolderId,
      },
      { headers: { Authorization: `Basic ${Token}`, withCredentials: true } },
    );
    console.log('파일 이동 완료', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to move file:', error);
    throw error;
  }
};
