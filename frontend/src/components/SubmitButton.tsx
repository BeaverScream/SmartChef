const SubmitButton = ({
    loading, handleSubmit
}: {
    loading: boolean;
    handleSubmit: () => void;
}) => {

    return (
        <div>
            <button
                id="submitBtn"
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                disabled={loading}
                >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-3">Cooking...</span>
                  </div>
                ) : 'Get Recommendation'}
            </button>
        </div>
    )
}

export default SubmitButton