import React, { useEffect } from "react";
import { MuiCustomModal } from "../../../shared/Modal/MuiCustomModal";
import { useCreateGoalMutation } from "../../../features/goals/goalsApi.services";

const GoalCreationModal = (props) => {
  const [description, setDescription] = React.useState("");
  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const [
    createGoals,
    {
      isLoading: isGoalsCreating,
      isSuccess: isGoalsCreated,
      isError: IsErrorGoalsCreating,
      data,
      reset,
    },
  ] = useCreateGoalMutation();
  const { isOpen, handleCloseModal } = props;
  const handleGoalCreate = () => {
    createGoals({ description, goal_name: "Goal Name" });
  };
  useEffect(() => {
    if (isGoalsCreated || IsErrorGoalsCreating) {
      setShowBackdrop(true);

      // Set timeout to handle cleanup after 3 seconds
      const timer = setTimeout(() => {
        // Reset all states
        setShowBackdrop(false);

        // Only navigate on success cases
        if (isGoalsCreated) {
          handleCloseModal();
          setDescription("");
        }
      }, 3000);
      return () => {
        clearTimeout(timer);
        reset();
      };
    }
  }, [IsErrorGoalsCreating, isGoalsCreated]);

  return (
    <>
      <MuiCustomModal
        hideBackdrop
        dialogTitle={"Create Goal"}
        open={isOpen}
        handleClose={handleCloseModal}
        maxWidth="sm"
        actionButtons={[
          {
            color: "inherit",
            variant: "outlined",
            children: "Cancel",
            disabled: isGoalsCreating,
            onClick: handleCloseModal,
          },
          {
            color: "primary",
            variant: "contained",
            disabled: isGoalsCreating,
            children: isGoalsCreating ? "Creating..." : "Create",
            onClick: handleGoalCreate,
          },
        ]}
      >
        <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2 mt-5">
          Goal Name
        </label>
        <textarea
          rows={"4"}
          className={`block p-2.5 input-bg w-full text-sm text-gray-900 border focus-visible:outline-none focus-visible:border-none h-[182px]`}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </MuiCustomModal>
      <MuiCustomModal
        PaperProps={{
          sx: {
            background: "rgba(249, 249, 249, 1)",
          },
        }}
        open={showBackdrop}
        maxWidth="sm"
        onClose={() => setShowBackdrop(false)}
      >
        <p
          className={`${
            isGoalsCreated ? "to-background-primary-main" : "text-red-500"
          } pb-4 text-center font-normal text-md`}
          role="alert"
        >
          {data?.message}
        </p>
      </MuiCustomModal>
    </>
  );
};

export default GoalCreationModal;
