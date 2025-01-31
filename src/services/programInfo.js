import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "./api";

// Get All Programs
export const getAllPrograms = createAsyncThunk(
  "getAllPrograms",
  async (data) => {
    const validateOTP = await api.post("validate-otp", data);
    if (validateOTP.status === 200) {
      return validateOTP;
    }
    return validateOTP;
  }
);
export const getallMyProgram = createAsyncThunk(
  'getallProgram',
  async (query) => {
    let filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([key, value]) =>
          !(key === 'search' && value.trim().length === 0) &&
          !(key === 'status' && value === 'all')
      )
    );
    let queryString = new URLSearchParams(filteredQuery).toString();
    const myMenteeList = await api.get(
      `/programs?${queryString}`
    );
    // page=${data?.page + 1 ?? 1}&limit=${data?.pageSize}
    if (myMenteeList.status === 200 && myMenteeList.data) {
      return myMenteeList.data;
    }
    return myMenteeList;
  }
);
export const getallMenteeProgram = createAsyncThunk(
  'getallMenteeProgram',
  async (query) => {
    let filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([key, value]) =>
          !(key === 'search' && value.trim().length === 0) &&
          !(key === 'status' && value === 'all')
      )
    );
    let queryString = new URLSearchParams(filteredQuery).toString();
    const myMenteeList = await api.get(
      `/programs?${queryString}`
    );
    // page=${data?.page + 1 ?? 1}&limit=${data?.pageSize}
    if (myMenteeList.status === 200 && myMenteeList.data) {
      return myMenteeList.data;
    }
    return myMenteeList;
  }
);
// Get Specific Program
export const getProgramDetails = createAsyncThunk(
  "getProgramDetails",
  async (data) => {
    const validateOTP = await api.post("validate-otp", data);
    if (validateOTP.status === 200) {
      return validateOTP;
    }
    return validateOTP;
  }
);

export const createProgram = createAsyncThunk("createProgram", async (data) => {
  return data;
});

export const createNewPrograms = createAsyncThunk(
  "createNewPrograms",
  async (data) => {
    const { bodyFormData, role } = data
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    const createProgram = await api.post(role ? "program/admin-program" : "programs", bodyFormData, {
      headers: headers
    });
    if (createProgram.status === 201) {
      return createProgram;
    }
    return createProgram;
  }
);

export const editUpdateProgram = createAsyncThunk(
  "editUpdateProgram",
  async (data) => {
    const { bodyFormData: { program_id, ...restOfData }, role } = data
    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    const editUpdateProgramInfo = await api.put(role ? `program/admin-program/${program_id}` : `programs/${program_id}`, restOfData, {
      headers: headers
    });

    if (editUpdateProgramInfo.status === 201 || editUpdateProgramInfo.status === 200) {
      return editUpdateProgramInfo;
    }
    return editUpdateProgramInfo;
  }
);

export const fetchProgram = createAsyncThunk("fetchProgram", async (data) => {
  const fetchProgram = await api.get("programs", data);
  if (fetchProgram.status === 200) {
    return fetchProgram;
  }
  return fetchProgram;
});

export const updateAllPrograms = createAsyncThunk(
  "updatePrograms",
  async (data) => {
    return data;
  }
);

export const createNewProgram = createAsyncThunk(
  "createNewProgram",
  async (data) => {
    return data;
  }
);

export const loadAllPrograms = createAsyncThunk(
  "loadAllPrograms",
  async (data) => {
    return data;
  }
);

export const updateNewPrograms = createAsyncThunk(
  "updateNewPrograms",
  async (data) => {
    return data;
  }
);

export const updateProgramDetails = createAsyncThunk(
  "updateProgramDetails",
  async (data) => {
    return data;
  }
);

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async (data) => {
    const allCategory = await api.get("category", data);
    if (allCategory.status === 200 && allCategory.data) {
      return allCategory.data;
    }
    return allCategory;
  }
);

export const getAllMaterials = createAsyncThunk(
  "getAllMaterials",
  async (data) => {
    const allMaterial = await api.get(`materials?category_id=${data}`);
    if (allMaterial.status === 200 && allMaterial.data) {
      return allMaterial.data;
    }
    return allMaterial;
  }
);

export const getAllCertificates = createAsyncThunk(
  "getAllCertificates",
  async (data) => {
    const allCertificates = await api.get(`certificate?category_id=${data}`);
    if (allCertificates.status === 200 && allCertificates.data) {
      return allCertificates.data;
    }
    return allCertificates;
  }
);

export const getAllSkills = createAsyncThunk("getAllSkills", async (data) => {
  const allSkills = await api.get(`skills?category_id=${data}`);
  if (allSkills.status === 200 && allSkills.data) {
    return allSkills.data;
  }
  return allSkills;
});

export const getAllMembers = createAsyncThunk("getAllMembers", async (data) => {
  const allMembers = await api.get(`members?category_id=${data}`);
  if (allMembers.status === 200 && allMembers.data) {
    return allMembers.data;
  }
  return allMembers;
});

export const getAllMentors = createAsyncThunk("getAllMentors", async () => {
  const allMentors = await api.get(`members/member-list?role_name=mentor&page=1&limit=100&status=active`);
  if (allMentors.status === 200 && allMentors.data) {
    return allMentors.data;
  }
  return allMentors;
});

export const getProgramsByCategory = createAsyncThunk(
  "getProgramsByCategory",
  async (categoryId) => {
    const allPrograms = await api.get(
      `program_task_assign/list_program?id=${categoryId}`
    );
    if (allPrograms.status === 200 && allPrograms.data) {
      return allPrograms.data;
    }
    return allPrograms;
  }
);
export const getProgramMentees = createAsyncThunk(
  "getProgramMentees",
  async (programId) => {
    const allProgramsMentees = await api.get(
      `program/participates?program_id=${programId}`
    );
    if (allProgramsMentees.status === 200 && allProgramsMentees.data) {
      return allProgramsMentees.data;
    }
    return allProgramsMentees;
  }
);

export const getProgramNameValidate = createAsyncThunk(
  "getProgramNameValidate",
  async (program_name) => {
    const getProgramNameValidate = await api.get(
      `programs/validate_program_name?program_name=${program_name}`
    );
    if (getProgramNameValidate.status === 200 && getProgramNameValidate.data) {
      return getProgramNameValidate.data;
    }
    return getProgramNameValidate;
  }
);


export const getProgramListWithCategory = createAsyncThunk(
  "getProgramListWithCategory",
  async (category_id) => {
    const getProgramListWithCategory = await api.get(
      `/program/completed-program-list?category_id=${category_id}&type=task`
    );
    if (getProgramListWithCategory.status === 200 && getProgramListWithCategory.data) {
      return getProgramListWithCategory.data;
    }
    return getProgramListWithCategory;
  }
);


export const insertProgramNotes = createAsyncThunk(
  "insertProgramNotes",
  async (data) => {
    const notes = await api.post("program/program-notes/", data);
    if (notes.status === 200) {
      return notes;
    }
    return notes;
  }
);


export const getProgramNotes = createAsyncThunk(
  "getProgramNotes",
  async (data) => {
    const notes = await api.get(`program/program-notes?program_id=${data?.id}${data?.created_by ? `&created_by=${data?.created_by}` : ""}`);
    if (notes.status === 200) {
      return notes?.data;
    }
    return notes;
  }
);

export const getProgramNotesUserList = createAsyncThunk(
  "getProgramNotesUserList",
  async (id) => {
    const notes = await api.get(`program/program-notes/users/${id}/`);
    if (notes.status === 200) {
      const constructedData = notes?.data?.map((e)=>{
        return{
          ...e,
          label: e?.full_name,
          value: e?.id
        }
      })
      return constructedData;
    }
    return notes;
  }
);
