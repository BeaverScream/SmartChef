interface DietOption {
    id: string;
    value: string;
    icon: string;
    color: string;
    label: string
}

const DietaryPreferenceCheckBox = ({
    dietaryPreferences,
    handleCheckboxChange,
    handleSelectAllClick,
    dietOptions,
}: {
    dietaryPreferences: string[];
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectAllClick: () => void;
    dietOptions: DietOption[]
}) => {

    return(
        <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
                Dietary Preference
            </label>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
            {dietOptions.map(option => (
                <label key={option.id} className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-xl shadow-inner border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105">
                  <input
                    type="checkbox"
                    id={option.id}
                    name="diet"
                    value={option.value}
                    className="hidden peer"
                    checked={dietaryPreferences.includes(option.value)}
                    onChange={handleCheckboxChange}
                  />
                  <i className={`fa-solid ${option.icon} text-2xl mb-2 text-gray-500 peer-checked:text-${option.color}-600 transition-colors`}></i>
                  <span className="text-sm font-semibold text-gray-700 select-none">{option.label}</span>
                </label>
              ))}

            <button
                onClick={handleSelectAllClick}
                className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                Select All
            </button>
            </div>
        </div>
    )
}

export default DietaryPreferenceCheckBox;