import { useEffect, useState } from "react";
import { X as CloseIcon, Plus } from "lucide-react";
import {
  useGetEquipmentQuery,
  useUpdateProgramMutation,
} from "../../../features/program/programApi.services";
import { programActionStatus } from "../../../utils/constant";
import EquipmentDetailModal from "../CreateProgram/EquipmentDetailModal";
import { useGetParticularEquipmentQuery, useGetTrackDataQuery } from "../../../features/equipments/equipmentApi.services";

const EquipmentSection = ({ equipmentsData, currentProgram }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vehicle");
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [searchEquipment, setSearchEquipment] = useState("");
  const [selectedItem, setSelectedItem] = useState("")
  const [openEquipmentModal, setOpenEquipmentModal] = useState(false);

  const { data: equipments, isFetching: equipmentFetching } =
    useGetEquipmentQuery(
      {
        filter: activeTab,
      },
      { refetchOnMountOrArgChange: true }
    );

  const { data: equipmentDetails, isLoading: isLoadingEquipmentData } =
  useGetParticularEquipmentQuery(selectedItem?.id, {
    skip: !selectedItem?.id,
  });

  // Get specific equipment track details
  const { data: equipmentTrackDetails } = useGetTrackDataQuery(
    selectedItem?.id,
    {
      skip: equipmentDetails?.equipment_status !== "inuse",
    }
  );

  const [
    updateProgram,
    { isLoading: isProgramUpdating, isSuccess: isProgramUpdated },
  ] = useUpdateProgramMutation();

  const tabs = [
    { id: "vehicle", label: "Vehicles" },
    { id: "machinery", label: "Machinery" },
    { id: "essentials", label: "Essentials" },
  ];

  // Initialize equipmentList and selectedEquipment when equipmentsData changes
  useEffect(() => {
    if (equipmentsData) {
      setEquipmentList(equipmentsData);
      // Clear selected equipment when modal is opened with new data
      setSelectedEquipment([]);
    }
  }, [equipmentsData]);

  // Reset selected equipment when modal is closed
  useEffect(() => {
    if (!isModalOpen) {
      setSelectedEquipment([]);
    }
  }, [isModalOpen]);

  const handleSubmit = async () => {
    try {
      const bodyFormData = new FormData();
      // Combine existing equipment with newly selected equipment
      const allEquipment = [...equipmentList, ...selectedEquipment];
      // Remove duplicates based on id
      const uniqueEquipment = Array.from(
        new Map(allEquipment.map((item) => [item.id, item])).values()
      );
      bodyFormData.append("equipments", JSON.stringify(uniqueEquipment));
      await updateProgram({ program_id: currentProgram?.id, bodyFormData });
    } catch (error) {
      console.error("Error updating equipment:", error);
    }
  };

  useEffect(() => {
    if (isProgramUpdated) {
      setIsModalOpen(false);
      // Update local equipment list with new selections
      const newEquipmentList = [...equipmentList, ...selectedEquipment];
      setEquipmentList(
        Array.from(
          new Map(newEquipmentList.map((item) => [item.id, item])).values()
        )
      );
      setSelectedEquipment([]); // Clear selections after successful update
    }
  }, [isProgramUpdated]);

  // Check if an equipment item exists in equipmentList (already saved)
  const isEquipmentInList = (equipmentId) => {
    return equipmentList.some((item) => item.id === equipmentId);
  };

  // Check if an equipment item is temporarily selected
  const isEquipmentSelected = (equipmentId) => {
    return selectedEquipment.some((item) => item.id === equipmentId);
  };

  const handleEquipmentSelection = (item, checked) => {
    setSelectedItem(item)
    if (checked) {
      setSelectedEquipment((prev) => [...prev, item]);
    } else {
      setSelectedEquipment((prev) =>
        prev.filter((equip) => equip.id !== item.id)
      );
    }
  };


  const handleCloseEquipmentModal = () => {
    setOpenEquipmentModal(false);
  };

  const handleEquipmentClickOpen = (item) => {
    setSelectedItem(item)
    setOpenEquipmentModal(true);
  };


  return (
    <div className="pt-2 pb-6 bg-transparent rounded-lg">
      <p className="text-[14px] font-normal mb-2">Equipment:</p>
      <div className="flex flex-wrap gap-2 items-center">
        {equipmentList.map((item) => (
          <div
            key={item.id}
            className="px-6 py-2 rounded-full border border-red-300 bg-red-50 text-gray-700 text-[12px] cursor-pointer"
            onClick={()=>handleEquipmentClickOpen(item)}
          >
            {item.equipment_name}
          </div>
        ))}
        {/* {!(
          currentProgram?.status === programActionStatus.cancelled ||
          currentProgram?.status === programActionStatus.completed
        ) && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-8 h-8 border border-dashed border-gray-400 rounded flex items-center justify-center"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        )} */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-medium">Add Equipment</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <CloseIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  value={searchEquipment}
                  type="text"
                  placeholder="Search Materials"
                  style={{ backgroundColor: "#FFF8F2" }}
                  className="w-full p-3 border rounded-lg pr-12"
                  onChange={(e) => setSearchEquipment(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-8 py-4 relative ${
                        activeTab === tab.id ? "text-red-400" : "text-gray-600"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment List */}
              <div
                className="p-6 rounded-lg space-y-4 mb-6"
                style={{ backgroundColor: "#FFF8F2" }}
              >
                {equipmentFetching ? (
                  <div>Loading...</div>
                ) : (
                  equipments?.map((item) => {
                    const isInList = isEquipmentInList(item.id);
                    const isSelected = isEquipmentSelected(item.id);

                    return (
                      <div key={item.id} className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          id={`equipment-${item.id}`}
                          className="w-5 h-5 rounded border-gray-300"
                          disabled={isInList} // Only disable if it's in the main list
                          checked={isInList || isSelected}
                          onChange={(e) =>
                            handleEquipmentSelection(item, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={`equipment-${item.id}`}
                          className={isInList ? "text-gray-400" : ""}
                        >
                          {item.equipment_name}
                        </label>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="text-gray-500 text-sm mb-8">
                Note: Additional Equipment tagging will require admin's
                permission
              </p>

              {/* Footer Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-12 py-3 border border-red-500 text-red-500 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={isProgramUpdating ? undefined : handleSubmit}
                  className="px-12 py-3 bg-red-500 text-white rounded disabled:opacity-50"
                  disabled={isProgramUpdating || selectedEquipment.length === 0}
                >
                  {isProgramUpdating ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EquipmentDetailModal
        isOpen={openEquipmentModal}
        handleCloseModal={handleCloseEquipmentModal}
        details={equipmentDetails}
        trackData={equipmentTrackDetails}
        isLoading={isLoadingEquipmentData}
      />
    </div>
  );
};

export default EquipmentSection;
