import { createSlice } from "@reduxjs/toolkit";
import {
  createNewProgram,
  createNewPrograms,
  createProgram,
  editUpdateProgram,
  getAllCategories,
  getAllCertificates,
  getAllMentors,
  getAllMaterials,
  getAllMembers,
  getallMenteeProgram,
  getallMyProgram,
  getAllPrograms,
  getAllSkills,
  getProgramDetails,
  getProgramListWithCategory,
  getProgramMentees,
  getProgramNameValidate,
  getProgramsByCategory,
  loadAllPrograms,
  updateAllPrograms,
  updateNewPrograms,
  updateProgramDetails,
  insertProgramNotes,
  getProgramNotes,
  getProgramNotesUserList,
} from "../../services/programInfo";
import { programStatus, userStatus } from "../../utils/constant";

const initialState = {
  allPrograms: [],
  programDetails: {},
  programMentees:[],
  allProgramsList:{},
  createdPrograms: [],
  category: [],
  materials: [],
  certificate: [],
  members: [],
  mentor_assign: [],
  skills: [],
  categoryPrograms: [],
  programListByCategory: [],
  historyNotes: [],
  noteUserList: [],
  loading: false,
  status: "",
  error: "",
};

export const programSlice = createSlice({
  name: "programsInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPrograms.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllPrograms.fulfilled, (state, action) => {
        return {
          ...state,
          allPrograms: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(getAllPrograms.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(getallMyProgram.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getallMyProgram.fulfilled, (state, action) => {
        return {
          ...state,
          allProgramsList: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(getallMyProgram.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(getallMenteeProgram.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getallMenteeProgram.fulfilled, (state, action) => {
        return {
          ...state,
          allProgramsList: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(getallMenteeProgram.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(getProgramDetails.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProgramDetails.fulfilled, (state, action) => {
        return {
          ...state,
          programDetails: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(getProgramDetails.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(getProgramMentees.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProgramMentees.fulfilled, (state, action) => {
        return {
          ...state,
          programMentees: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(getProgramMentees.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(createProgram.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        return {
          ...state,
          programDetails: action.payload,
          status: userStatus.create,
          loading: false,
        };
      })
      .addCase(createProgram.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(createNewPrograms.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createNewPrograms.fulfilled, (state, action) => {
        const responseStatus = action.payload?.status;
        const status =
          (responseStatus === 200 || responseStatus === 400)
            ? programStatus.exist
            : responseStatus === 500
              ? programStatus.error
              : responseStatus === 201
                ? programStatus.create
                : "";

        return {
          ...state,
          status: status,
          loading: false,
        };
      })
      .addCase(createNewPrograms.rejected, (state, action) => {
        const responseStatus = action.payload?.status;
        const status =
          (responseStatus === 200 || responseStatus === 400)
            ? programStatus.exist
            : responseStatus === 500
              ? programStatus.error
              : responseStatus === 201
                ? programStatus.create
                : "";

        return {
          ...state,
          status: status,
          loading: false,
          error: action.error.message,
        };
      });




    builder
      .addCase(editUpdateProgram.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(editUpdateProgram.fulfilled, (state, action) => {
        const responseStatus = action.payload.status;
        const status =
          responseStatus === 200 || responseStatus === 201
            ? programStatus.update
            : responseStatus === 500
              ? programStatus.error
              : "";

        return {
          ...state,
          status: status,
          loading: false,
        };
      })
      .addCase(editUpdateProgram.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });




    builder
      .addCase(loadAllPrograms.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(loadAllPrograms.fulfilled, (state, action) => {
        return {
          ...state,
          allPrograms: action.payload,
          loading: false,
        };
      })
      .addCase(loadAllPrograms.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
    builder
      .addCase(updateAllPrograms.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateAllPrograms.fulfilled, (state, action) => {
        return {
          ...state,
          allPrograms: action.payload,
          status: programStatus.create,
          loading: false,
        };
      })
      .addCase(updateAllPrograms.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(createNewProgram.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createNewProgram.fulfilled, (state, action) => {
        return {
          ...state,
          allPrograms: action.payload,
          status: programStatus.create,
          loading: false,
        };
      })
      .addCase(createNewProgram.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(updateNewPrograms.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateNewPrograms.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          loading: false,
        };
      })
      .addCase(updateNewPrograms.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllCategories.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        return {
          ...state,
          category: action.payload,
          loading: false,
        };
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllMaterials.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllMaterials.fulfilled, (state, action) => {
        return {
          ...state,
          materials: action.payload,
          loading: false,
        };
      })
      .addCase(getAllMaterials.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllCertificates.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllCertificates.fulfilled, (state, action) => {
        return {
          ...state,
          certificate: action.payload,
          loading: false,
        };
      })
      .addCase(getAllCertificates.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getProgramsByCategory.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProgramsByCategory.fulfilled, (state, action) => {
        return {
          ...state,
          categoryPrograms: action.payload,
          status: userStatus.categoryPrograms,
          loading: false,
        };
      })
      .addCase(getProgramsByCategory.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllSkills.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllSkills.fulfilled, (state, action) => {
        return {
          ...state,
          skills: action.payload,
          loading: false,
        };
      })
      .addCase(getAllSkills.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllMembers.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllMembers.fulfilled, (state, action) => {
        return {
          ...state,
          members: action.payload,
          loading: false,
        };
      })
      .addCase(getAllMembers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    builder
      .addCase(getAllMentors.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getAllMentors.fulfilled, (state, action) => {
        return {
          ...state,
          mentor_assign: action.payload?.results,
          loading: false,
        };
      })
      .addCase(getAllMentors.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });

    // builder.addCase(updateLocalProgram)builder
    builder.addCase(getProgramNameValidate.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    })
      .addCase(getProgramNameValidate.fulfilled, (state, action) => {
        return {
          ...state,
          status: action?.payload?.is_available ? programStatus.exist : "",
          loading: false,
        };
      })
      .addCase(getProgramNameValidate.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });


      builder.addCase(getProgramListWithCategory.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
        .addCase(getProgramListWithCategory.fulfilled, (state, action) => {
          return {
            ...state,
            programListByCategory: action.payload,
            loading: false,
          };
        })
        .addCase(getProgramListWithCategory.rejected, (state, action) => {
          return {
            ...state,
            loading: false,
            error: action.error.message,
          };
        });

        builder.addCase(insertProgramNotes.pending, (state) => {
          return {
            ...state,
            loading: true,
          };
        })
          .addCase(insertProgramNotes.fulfilled, (state, action) => {
            return {
              ...state,
              status: 'done',
              loading: false,
            };
          })
          .addCase(insertProgramNotes.rejected, (state, action) => {
            return {
              ...state,
              loading: false,
              error: action.error.message,
            };
          });

          builder.addCase(getProgramNotes.pending, (state) => {
            return {
              ...state,
              loading: true,
            };
          })
            .addCase(getProgramNotes.fulfilled, (state, action) => {
              return {
                ...state,
                status: 'done',
                historyNotes: action?.payload,
                loading: false,
              };
            })
            .addCase(getProgramNotes.rejected, (state, action) => {
              return {
                ...state,
                loading: false,
                error: action.error.message,
              };
            });

            builder.addCase(getProgramNotesUserList.pending, (state) => {
              return {
                ...state,
                loading: true,
              };
            })
              .addCase(getProgramNotesUserList.fulfilled, (state, action) => {
                return {
                  ...state,
                  status: 'done',
                  noteUserList: action?.payload,
                  loading: false,
                };
              })
              .addCase(getProgramNotesUserList.rejected, (state, action) => {
                return {
                  ...state,
                  loading: false,
                  error: action.error.message,
                };
              });
  },

});

export default programSlice.reducer;
